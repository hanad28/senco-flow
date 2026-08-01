import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalMutation } from "./_generated/server";

const RECIPIENT = "unisenofficial@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value: string, maxLength: number) {
  const clean = value.trim();
  if (!clean || clean.length > maxLength) throw new Error("Invalid enquiry details");
  return clean;
}

async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("Enquiry verification is not configured");
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = (await response.json()) as { success?: boolean };
  if (!result.success) throw new Error("Unable to verify enquiry submission");
}

async function sendEmail(
  apiKey: string,
  idempotencyKey: string,
  body: Record<string, unknown>,
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Unable to send enquiry email");
}

const confirmationHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>@media only screen and (max-width:480px){.email-canvas{border-radius:0!important}.email-header{padding:22px 18px 0!important}.email-tagline{display:none!important}.email-sky{height:110px!important;line-height:110px!important}.email-card-wrap{padding:0 16px!important}.email-card-body{padding:30px 22px 8px!important}.email-title{font-size:25px!important}.email-park-space{height:150px!important;line-height:150px!important}}</style>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;color:#18324b;font-family:'Nunito Sans','Avenir Next',Avenir,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">We’ve received your enquiry and will be in touch soon.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="email-canvas" style="max-width:600px;border-radius:28px;background-color:#dbf1fc;background-image:url('https://unisen.uk/assets/brand/email-park-bg.jpg');background-repeat:no-repeat;background-position:center bottom;background-size:cover;">
            <tr>
              <td class="email-header" style="padding:28px 32px 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="left" style="vertical-align:middle;"><img src="https://unisen.uk/assets/brand/unisen-logo-nav.png" width="120" alt="Unisen" style="display:block;width:120px;height:auto;border:0;"></td>
                    <td align="right" class="email-tagline" style="vertical-align:middle;color:#40689c;font-size:12px;line-height:1.4;font-weight:600;">SEND coordination in one workspace</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td class="email-sky" style="height:170px;line-height:170px;font-size:1px;">&nbsp;</td></tr>
            <tr>
              <td align="center" class="email-card-wrap" style="padding:0 44px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(24,50,75,0.14);">
                  <tr>
                    <td align="center" class="email-card-body" style="padding:40px 36px 12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0">
                        <tr><td align="center" style="width:64px;height:64px;background:#dbf1fc;border-radius:999px;color:#3b8ac1;font-size:30px;line-height:64px;font-weight:700;">&#10003;</td></tr>
                      </table>
                      <h1 class="email-title" style="margin:24px 0 12px;color:#18324b;font-size:30px;line-height:1.15;font-weight:800;">Thanks for getting in touch</h1>
                      <p style="margin:0;color:#18324b;font-size:16px;line-height:1.6;">We’ve received your enquiry. A member of the Unisen team will be in touch soon.</p>
                    </td>
                  </tr>
                  <tr><td style="height:28px;line-height:28px;font-size:1px;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>
            <tr><td class="email-park-space" style="height:230px;line-height:230px;font-size:1px;">&nbsp;</td></tr>
          </table>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
            <tr><td align="center" style="padding:20px 16px 8px;color:#607586;font-size:12px;line-height:1.5;">Unisen · <a href="https://unisen.uk" style="color:#287fb4;text-decoration:underline;">unisen.uk</a></td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const submit = action({
  args: {
    name: v.string(),
    email: v.string(),
    organisationRole: v.string(),
    needs: v.string(),
    turnstileToken: v.string(),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.website) return;
    await verifyTurnstile(args.turnstileToken);

    const name = required(args.name, 100);
    const email = required(args.email, 254).toLowerCase();
    const organisationRole = required(args.organisationRole, 160);
    const needs = required(args.needs, 2_000);
    if (!EMAIL_PATTERN.test(email)) throw new Error("Invalid email address");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("Enquiry notifications are not configured");

    const enquiryId = await ctx.runMutation(internal.enquiries.store, {
      name,
      email,
      organisationRole,
      needs,
    });
    await Promise.all([
      sendEmail(apiKey, `enquiry/${enquiryId}`, {
        from: "Unisen <enquiries@unisen.uk>",
        to: [RECIPIENT],
        reply_to: email,
        subject: `New website enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nOrganisation / role: ${organisationRole}\n\nWhat they need:\n${needs}`,
      }),
      sendEmail(apiKey, `enquiry-confirmation/${enquiryId}`, {
        from: "Unisen <enquiries@unisen.uk>",
        to: [email],
        reply_to: RECIPIENT,
        subject: "We’ve received your enquiry",
        text: "Thanks for getting in touch with Unisen. We’ve received your enquiry and a member of our team will be in touch soon.",
        html: confirmationHtml,
      }),
    ]);
  },
});

export const store = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    organisationRole: v.string(),
    needs: v.string(),
  },
  handler: async (ctx, args) => {
    const recent = await ctx.db
      .query("enquiries")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .order("desc")
      .first();
    if (
      recent &&
      recent._creationTime > Date.now() - 5 * 60 * 1_000 &&
      recent.name === args.name &&
      recent.organisationRole === args.organisationRole &&
      recent.needs === args.needs
    ) {
      return recent._id;
    }
    return await ctx.db.insert("enquiries", { ...args, createdAt: Date.now() });
  },
});

export const cleanupExpired = internalMutation({
  args: {},
  handler: async (ctx) => {
    const expired = await ctx.db
      .query("enquiries")
      .withIndex("by_created_at", (q) => q.lt("createdAt", Date.now() - 30 * 24 * 60 * 60 * 1_000))
      .take(500);
    await Promise.all(expired.map((enquiry) => ctx.db.delete(enquiry._id)));
  },
});
