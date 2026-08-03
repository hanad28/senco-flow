import { FormEvent, type ReactElement, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SITE_KEY = "0x4AAAAAAEDsvZ-Bk0UHjXdS";

export default function EnquiryDialog({ trigger }: { trigger?: ReactElement }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const turnstileContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || submitted) return;
    let active = true;
    let widgetId = "";
    const render = () => {
      if (!active || !turnstileContainer.current || !window.turnstile) return;
      widgetId = window.turnstile.render(turnstileContainer.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: setTurnstileToken,
        "expired-callback": () => setTurnstileToken(""),
      });
    };
    const existing = document.getElementById("unisen-turnstile-script") as HTMLScriptElement | null;
    if (window.turnstile) {
      render();
    } else if (existing) {
      existing.addEventListener("load", render, { once: true });
    } else {
      const script = document.createElement("script");
      script.id = "unisen-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", render, { once: true });
      document.head.appendChild(script);
    }
    return () => {
      active = false;
      existing?.removeEventListener("load", render);
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      setTurnstileToken("");
    };
  }, [open, submitted]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!turnstileToken) {
      setError("Please complete the verification check.");
      return;
    }
    setSubmitting(true);
    setError("");

    const data = new FormData(event.currentTarget);
    try {
      const [{ ConvexHttpClient }, { api }] = await Promise.all([
        import("convex/browser"),
        import("../../../convex/_generated/api"),
      ]);
      const convex = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL);
      await convex.action(api.enquiries.submit, {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        organisationRole: String(data.get("organisationRole") ?? ""),
        needs: String(data.get("needs") ?? ""),
        turnstileToken,
        website: String(data.get("website") ?? ""),
      });
      setSubmitted(true);
    } catch {
      setError("We couldn't send your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setError("");
          setSubmitted(false);
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            type="button"
            size="lg"
            className="cta-glass hero-enquiry-trigger relative h-10 w-auto min-w-0 px-5 text-sm font-bold sm:h-12 sm:min-w-56 sm:px-7 sm:text-base"
          >
            <span className="relative z-[1]">Book a 15-min walkthrough</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        id="register-interest"
        className="max-h-[calc(100vh-2rem)] overflow-y-auto border-0 bg-white p-6 shadow-2xl sm:max-w-[34rem] sm:rounded-[1.25rem] sm:p-8"
      >
        {submitted ? (
          <div className="py-8 text-center" role="status">
            <h2 className="[font-family:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
              Thank you for your interest
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              We’ve received your details and will be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="[font-family:var(--font-heading)] text-2xl text-[var(--text-primary)]">
                Book a 15-min walkthrough
              </DialogTitle>
              <DialogDescription>
                Tell us a little about you and how Unisen could help. Prefer email?{" "}
                <a className="underline" href="mailto:enquiries@unisen.uk">
                  enquiries@unisen.uk
                </a>
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4" onSubmit={submit}>
              <div className="grid gap-2">
                <Label htmlFor="enquiry-name">Name</Label>
                <Input
                  id="enquiry-name"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="enquiry-email">Email</Label>
                <Input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="enquiry-phone">Phone number</Label>
                <Input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="enquiry-organisation-role">Organisation and role</Label>
                <Input
                  id="enquiry-organisation-role"
                  name="organisationRole"
                  autoComplete="organization-title"
                  maxLength={160}
                  placeholder="Enter your organisation and role"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="enquiry-needs">
                  Tell us about your current EHC process and how it could be improved
                </Label>
                <Textarea
                  id="enquiry-needs"
                  name="needs"
                  maxLength={2000}
                  placeholder="Share any challenges or goals you’d like to discuss"
                  rows={5}
                  required
                />
              </div>
              <div className="absolute -left-[10000px]" aria-hidden="true">
                <Label htmlFor="enquiry-website">Website</Label>
                <Input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Please don’t include children’s names, medical details, or other sensitive
                information. The website database record is normally deleted after 30 days. Related
                email correspondence may be kept longer where reasonably necessary to respond. See
                our{" "}
                <a className="underline underline-offset-2" href="/privacy">
                  Website Privacy Notice
                </a>
                .
              </p>
              <div ref={turnstileContainer} className="min-h-[65px]" />
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full">
                {submitting ? "Sending…" : "Send enquiry"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
