# UNISEN Design System

## 1. Design Direction

UNISEN uses a friendly, optimistic visual language built around connection, learning, and belonging. The identity combines a puzzle-inspired "U" mark with bright natural colours taken from the riverside park artwork.

The interface should feel:

- Calm and open
- Friendly without looking childish
- Clear and easy to scan
- Bright, but never visually noisy
- Suitable for education, community, and family-facing products

Use generous white space, rounded geometry, soft colour transitions, and illustrated outdoor scenes. Keep the interface simpler than the artwork so content remains easy to read.

## 2. Brand Mark

### Primary wordmark

Use the puzzle-shaped "U" followed by the uppercase word `UNISEN`.

- Keep the inner counter of the "U" fully transparent.
- Preserve the three rounded puzzle tabs on the left, top, and bottom.
- Use a flat colour treatment for normal product UI.
- Avoid glow, bevel, metallic, glass, or strong 3D effects.
- Do not stretch, rotate, outline, or rearrange the mark.

### Icon mark

The icon is formed by the puzzle-shaped "U" surrounded by loosely connected puzzle pieces.

- Use it for app icons, favicons, avatars, and compact brand moments.
- Keep the centre of the "U" transparent.
- Use fewer surrounding pieces at small sizes so the silhouette stays readable.
- Maintain clear space equal to at least half the width of the central "U".

### Minimum sizes

- Wordmark: 120 px wide on screen
- Icon: 32 px square on screen
- Favicon: use a simplified puzzle "U" only

## 3. Colour Theme

The palette combines the yellow from the UNISEN logo with sky blue, river blue, leafy green, and soft floral tones from the landscape artwork.

### Core brand colours

| Token | Hex | Use |
|---|---:|---|
| `brand-yellow` | `#FFDE59` | Logo, primary highlights, selected states |
| `brand-yellow-hover` | `#F4CC3F` | Yellow hover and pressed states |
| `brand-yellow-soft` | `#FFF6CC` | Soft highlight backgrounds |
| `sky-blue` | `#77D0FA` | Main illustration blue, soft branded surfaces |
| `river-blue` | `#51BFF8` | Links, active accents, charts |
| `deep-blue` | `#40689C` | Secondary brand colour, icons |
| `navy` | `#18324B` | Primary text, headings, dark buttons |
| `teal` | `#179DAB` | Secondary accent and success-adjacent states |
| `leaf-green` | `#528F31` | Positive states and nature accents |
| `deep-green` | `#27683B` | Strong green text and icons |

### Supporting colours

| Token | Hex | Use |
|---|---:|---|
| `pale-sky` | `#DBF1FC` | Page sections, cards, empty states |
| `mist-blue` | `#CEEEF3` | Soft borders and tinted surfaces |
| `fresh-green` | `#CEE65D` | Small decorative accents only |
| `warm-sand` | `#E4D2AF` | Warm neutral surfaces and illustration paths |
| `blush` | `#F3B8C8` | Floral accents and optional category tags |
| `lavender` | `#C9B8EE` | Optional category accents |
| `white` | `#FFFFFF` | Main page and card background |
| `off-white` | `#F8FBFC` | Alternate page background |
| `border` | `#D7E5EB` | Borders and dividers |
| `text-muted` | `#607586` | Secondary text |

### Semantic colours

| Token | Hex | Use |
|---|---:|---|
| `success` | `#3F8A4C` | Success messages and completed states |
| `warning` | `#D99A18` | Warning messages |
| `error` | `#C84C4C` | Errors and destructive actions |
| `info` | `#3B8AC1` | Informational messages |

### Colour usage rules

- Use `navy` for most text rather than pure black.
- Use `brand-yellow` as an accent, not as a large page background.
- Place navy text on yellow buttons for reliable contrast.
- Use white text on `navy`, `deep-blue`, `teal`, and `deep-green`.
- Keep large surfaces pale, white, or off-white.
- Avoid placing body text directly over detailed illustrations.
- Do not use more than three accent colours in one component.

## 4. Typography

### Primary font

Use **Figtree** for the product interface and marketing body copy.

Reasons:

- Soft neo-grotesque forms stay warm next to the park illustration and puzzle logo.
- High legibility in dense product UI and statutory process copy.
- Pairs cleanly with a reading-first display serif.
- Broad weight range for hierarchy without thin strokes.

Fallback stack:

```css
font-family: "Figtree", "Nunito Sans", "Avenir Next", Avenir, Inter, Arial, sans-serif;
```

### Display font

Use **Literata** for large marketing headlines and section titles. Literata is a reading-first digital serif — calm authority for EHC / SEND content without cold corporate polish. Do not use it for dense dashboard chrome or long multi-paragraph body blocks in the app shell.

```css
font-family: "Literata", Georgia, "Times New Roman", serif;
```

### Type scale

| Style | Size | Line height | Weight | Use |
|---|---:|---:|---:|---|
| Display | 64 px | 1.05 | 800 | Large desktop hero headings |
| H1 | 48 px | 1.1 | 800 | Main page headings |
| H2 | 36 px | 1.15 | 750 | Section headings |
| H3 | 28 px | 1.2 | 700 | Card groups and subsections |
| H4 | 22 px | 1.3 | 700 | Card headings |
| Body large | 18 px | 1.6 | 400 | Introductory copy |
| Body | 16 px | 1.55 | 400 | Default interface text |
| Body small | 14 px | 1.5 | 400 | Supporting information |
| Label | 13 px | 1.3 | 700 | Form labels and metadata |
| Caption | 12 px | 1.4 | 600 | Captions and compact status text |

### Typography rules

- Use sentence case for headings and buttons.
- Keep hero headings to two or three lines.
- Use uppercase only for the UNISEN wordmark and short metadata labels.
- Keep body text between 55 and 75 characters per line.
- Use weight and spacing before using another colour for hierarchy.
- Avoid very thin font weights.

## 5. Spacing and Layout

Use an 8 px spacing system.

```text
4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128
```

### Page widths

- Maximum content width: `1200px`
- Wide marketing sections: `1440px`
- Reading width: `720px`
- Desktop page padding: `48px` to `80px`
- Tablet page padding: `32px`
- Mobile page padding: `20px`

### Grid

- Desktop: 12 columns, 24 px gutters
- Tablet: 8 columns, 20 px gutters
- Mobile: 4 columns, 16 px gutters

### Section rhythm

- Desktop section padding: `96px 0`
- Tablet section padding: `72px 0`
- Mobile section padding: `56px 0`

## 6. Shape Language

Use rounded, simple geometry inspired by the puzzle pieces.

### Corner radii

| Token | Value | Use |
|---|---:|---|
| `radius-sm` | 8 px | Inputs, small chips |
| `radius-md` | 14 px | Buttons and compact cards |
| `radius-lg` | 20 px | Main cards and panels |
| `radius-xl` | 28 px | Marketing sections and feature blocks |
| `radius-pill` | 999 px | Tags and pill controls |

### Borders

- Default border: `1px solid #D7E5EB` (flat or inset UI only)
- Active border: `2px solid #3B8AC1`
- Avoid heavy dark outlines.
- On **elevated cards**, prefer the hairline from `smooth-shadow-ring-*` over a separate border + shadow pair.
- Soft tinted fills remain fine for non-elevated chips, badges, and quiet surfaces.

### Shadows

Elevated surfaces use **[shadow-plugin](https://shadow.floriankiem.com/)** (Florian Kiem smooth shadows), imported in `src/styles.css`. Prefer its stacked shadows over ad-hoc `box-shadow` or Tailwind’s default single-layer `shadow-*` on marketing cards.

Legacy design tokens (app chrome / non-plugin surfaces):

```css
--shadow-sm: 0 2px 8px rgba(24, 50, 75, 0.08);
--shadow-md: 0 10px 30px rgba(24, 50, 75, 0.10);
--shadow-lg: 0 20px 60px rgba(24, 50, 75, 0.14);
```

#### Smooth shadow utilities (preferred on cards)

| Class | Use |
|---|---|
| `smooth-shadow-sm` … `smooth-shadow-2xl` | Elevation only (no edge stroke) |
| `smooth-shadow-ring-sm` … `smooth-shadow-ring-2xl` | Elevation + 1px hairline ring in one stroke |
| `shadow-[#244a70]` | Tint the stacked shadow with Unisen navy |
| `smooth-ring-black/8` | Soften or strengthen the baked-in ring |

Default marketing card treatment:

```html
<div class="rounded-[20px] bg-surface-2 smooth-shadow-ring-md shadow-[#244a70] smooth-ring-black/8">
  …
</div>
```

Home landing `.cursor-card` surfaces bake the same md-scale stack into `--cursor-card-shadow` (see `src/landing/landing-body.css`) so the CSS component API stays stable without scattering utility classes.

#### Elevation rules

- **Never** pair a hard `border-*` / `ring-*` with a shadow on the same elevated surface — that creates a double edge. Use `smooth-shadow-ring-*` instead and drop the border.
- One elevation system per surface: either `smooth-shadow-ring-*` **or** a legacy `--shadow-*` token, not both.
- Rest state: usually `smooth-shadow-ring-md` (or sm for denser grids). Hover / expanded detail: step up one size (`lg` / `xl`).
- Quiet / dashed cards stay flat (`box-shadow: none`) so secondary surfaces do not compete.
- Avoid neon glow, pure black slabs, and strong blurred halos. Tint with `#244a70` / `rgba(24, 50, 75, …)` so shadows stay on-brand.
- Parent sections must allow overflow (`overflow: visible` where shadows can paint outside the card bounds).

## 7. Imagery and Illustration

The main image style is a soft hand-painted anime-inspired landscape with modern clarity.

### Visual characteristics

- Bright natural daylight
- Pale blue skies with soft white clouds
- Clear rivers, green trees, and pastel flowers
- Small human figures rather than close portraits
- Distant modern city elements
- Airy compositions with large quiet areas
- Soft painted texture with clean silhouettes
- Optimistic and peaceful mood

### Hero composition

- Keep the upper-left area clear for text.
- Place detailed scenery in the lower half and right side.
- Keep the horizon low enough for the sky to remain dominant.
- Keep benches, trees, people, and buildings outside text-safe zones.
- Use a soft pale-blue area behind dark navy headings.
- Do not add text, logos, borders, UI, or watermarks inside generated artwork.

### Cropping

- Desktop hero: `16:9` or a wide banner between `3.5:1` and `4:1`
- Standard editorial image: `4:3`
- Social image: `1:1`
- Keep important subjects within the centre-right safe area.

## 8. Buttons

### Primary button

- Background: `#18324B`
- Text: `#FFFFFF`
- Hover: `#244761`
- Height: 48 px
- Horizontal padding: 22 px
- Radius: 14 px
- Font weight: 700

### Brand button

- Background: `#FFDE59`
- Text: `#18324B`
- Hover: `#F4CC3F`
- Use for one main branded action per section.

### Secondary button

- Background: `#FFFFFF`
- Text: `#18324B`
- Border: `1px solid #BFD0D9`
- Hover background: `#F1F7F9`

### Text button

- Text: `#287FB4`
- Hover text: `#1D638E`
- Use an arrow only when the action moves to another page.

### Button rules

- Use clear action labels such as "View programme" or "Create account".
- Do not use yellow text on white.
- Keep icon and label spacing at 8 px.
- Show a visible focus ring.

## 9. Forms

### Input fields

- Height: 48 px
- Background: white
- Border: `1px solid #BFD0D9`
- Radius: 12 px
- Text: navy
- Placeholder: `#8295A3`
- Focus border: `#3B8AC1`
- Focus ring: `0 0 0 4px rgba(59, 138, 193, 0.18)`

### Form behaviour

- Place labels above inputs.
- Show helper or error text below the field.
- Do not rely on colour alone for errors.
- Use checkmarks, warning icons, and clear text labels.

## 10. Cards

### Standard card

- Background: white or `surface-2`
- Edge: `smooth-shadow-ring-md` (no separate border)
- Shadow tint: `shadow-[#244a70]` with `smooth-ring-black/8`
- Radius: 20 px
- Padding: 24 px
- Implementation: Tailwind utilities above, or `.cursor-card` on the home landing (tokenised shadow in CSS)

### Highlight card

- Background: `#FFF6CC`, `#DBF1FC`, or `#CEEEF3`
- Edge: same smooth ring treatment, or no elevation when the fill alone separates the card from the canvas
- Use one illustration or icon, not several competing decorations.

### Card rules

- Keep one main purpose per card.
- Place actions at the bottom when cards appear in a grid.
- Keep card heights consistent within the same row.
- Use coloured top strips sparingly.
- Do not stack a 1px border on top of `smooth-shadow-ring-*`.
- Hover may lift (`translateY`) and step the smooth shadow up one size; keep the motion under ~300ms ease-out.

## 11. Navigation

### Header

- White or translucent white background
- Navy text
- 72 to 80 px desktop height
- Wordmark on the left
- Main links centred or right-aligned
- One primary action on the far right

### Mobile navigation

- Use a simple menu icon.
- Open a full-width white panel.
- Keep touch targets at least 44 px high.
- Keep the wordmark visible when the menu opens.

## 12. Icons

- Use rounded outline icons.
- Stroke width: 1.75 to 2 px.
- Use navy for default icons and river blue for active icons.
- Use filled icons only for selected navigation states or status markers.
- Avoid mixing several icon styles.

## 13. Data Visualisation

Preferred series order:

1. `#3B8AC1`
2. `#179DAB`
3. `#FFDE59`
4. `#528F31`
5. `#7BA4DB`
6. `#F3B8C8`

Use navy labels, pale grid lines, and direct data labels where possible. Do not use colour alone to distinguish important states.

## 14. Motion

Motion should feel light and calm.

- Hover transition: 150 ms
- Standard UI transition: 200 ms
- Panel or modal transition: 250 ms
- Preferred easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- Use small vertical movement of 2 to 6 px.
- Avoid bouncing logos, constant floating objects, and large parallax effects.
- Respect `prefers-reduced-motion`.

## 15. Accessibility

- Meet WCAG AA contrast for text and controls.
- Use navy text on yellow, pale blue, white, and off-white surfaces.
- Do not place yellow body text on white.
- Maintain a visible keyboard focus state.
- Use at least 16 px for normal body text.
- Keep interactive targets at least 44 by 44 px.
- Give informative images useful alternative text.
- Treat decorative landscape illustrations as decorative when they add no content.

## 16. Responsive Behaviour

### Desktop

- Use wide split hero layouts.
- Place text on the left and illustration detail on the right.
- Use three or four card columns where content allows.

### Tablet

- Reduce heading sizes by one step.
- Use two-column cards.
- Keep hero text in the upper-left safe zone.

### Mobile

- Stack hero text above the image or use a separate image crop.
- Do not place text over detailed scenery.
- Use one-column cards.
- Reduce H1 to 36 px and body large to 17 px.
- Keep major actions full width when useful.

## 17. CSS Theme Tokens

```css
:root {
  --color-brand-yellow: #ffde59;
  --color-brand-yellow-hover: #f4cc3f;
  --color-brand-yellow-soft: #fff6cc;

  --color-sky: #77d0fa;
  --color-river: #51bff8;
  --color-blue: #3b8ac1;
  --color-deep-blue: #40689c;
  --color-navy: #18324b;

  --color-teal: #179dab;
  --color-leaf: #528f31;
  --color-deep-green: #27683b;
  --color-fresh-green: #cee65d;

  --color-pale-sky: #dbf1fc;
  --color-mist: #ceeef3;
  --color-sand: #e4d2af;
  --color-blush: #f3b8c8;
  --color-lavender: #c9b8ee;

  --color-white: #ffffff;
  --color-page: #f8fbfc;
  --color-border: #d7e5eb;
  --color-muted: #607586;

  --color-success: #3f8a4c;
  --color-warning: #d99a18;
  --color-error: #c84c4c;
  --color-info: #3b8ac1;

  --font-ui: "Figtree", "Nunito Sans", "Avenir Next", Avenir, Inter, Arial, sans-serif;
  --font-display: "Literata", Georgia, "Times New Roman", serif;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;

  /* Legacy single-layer shadows (app chrome). Marketing cards use shadow-plugin. */
  --shadow-sm: 0 2px 8px rgba(24, 50, 75, 0.08);
  --shadow-md: 0 10px 30px rgba(24, 50, 75, 0.1);
  --shadow-lg: 0 20px 60px rgba(24, 50, 75, 0.14);

  /* Marketing / elevated surfaces — mirror shadow-plugin md + hairline ring */
  --elevation-shadow-md:
    0 17.54px 23.39px 0 color-mix(in srgb, #244a70 4%, transparent),
    0 9.4px 12.5px 0 color-mix(in srgb, #244a70 3%, transparent),
    0 5.25px 7px 0 color-mix(in srgb, #244a70 2%, transparent),
    0 2.79px 3.72px -2px color-mix(in srgb, #244a70 1%, transparent),
    0 1.16px 1.5px 0 color-mix(in srgb, #244a70 1%, transparent),
    0 0 0 1px rgba(0, 0, 0, 0.06);
}
```

Package: `shadow-plugin` (`@import "shadow-plugin"` in `src/styles.css`). Live playground: [shadow.floriankiem.com](https://shadow.floriankiem.com/).

## 18. Content Composition Patterns

These patterns adapt structural lessons from Cursor's public website to UNISEN's warmer, community-focused visual language. Reuse the hierarchy and content logic, not Cursor's branding, assets, copy, or monochrome treatment.

### Composition principles

1. **One dominant idea per section.** Give each full-width band one message, task, or decision. Do not combine unrelated features to fill space.
2. **Show evidence after a claim.** Follow promises with the most relevant proof: a real interface view, programme detail, partner mark, outcome, testimonial, or clear process explanation.
3. **Match density to intent.** Marketing pages may be wide and visual; articles should use the `720px` reading width; directories should prioritise repeated cards or rows; product screens should prioritise the active task.
4. **Create deliberate hierarchy.** Mix large feature moments with quieter supporting sections. Do not give every card, heading, or action equal visual weight.
5. **End with a useful continuation.** Marketing pages end with one CTA, articles with related content, multi-step flows with the next step, and directories with another relevant category or filtered result.

### Approved page structures

#### Marketing homepage

1. Statement hero with one primary CTA and optional secondary action
2. Partner or trust evidence
3. Two to four product or service feature bands
4. Outcome, testimonial, or community evidence
5. Supporting programme or resource cards
6. Final CTA

Use the landscape artwork as the main visual stage. Avoid a generic hero followed immediately by three identical feature cards.

#### Programme or service landing page

1. Focused hero naming the audience and outcome
2. Key facts or eligibility summary
3. Alternating explanation-and-media sections
4. Process, timeline, or benefit cards
5. Questions and answers where genuine uncertainty exists
6. One clear application, referral, or contact CTA

#### Directory or listing page

Use a clear title, compact filters when needed, and either:

- A uniform card grid for programmes, resources, people, or organisations
- Category shelves when users browse several distinct content groups
- Compact rows when comparison and scanning matter more than imagery

Keep card heights consistent within a uniform row. Unequal bento layouts are reserved for curated highlights where size communicates priority.

#### Detail page

Lead with identity and the primary action, then show key metadata, description, requirements, process, supporting resources, and related items. Do not bury eligibility, status, location, dates, or contact information inside long prose.

#### Article or guidance page

Use a narrow reading column with title, summary, clear H2/H3 hierarchy, lists, and inline media. Add a table of contents only when the page has enough sections to justify one. End with related guidance or the next useful action.

#### Form-led page

On desktop, a form may sit beside a short proposition, reassurance, or eligibility summary. Keep the form itself linear, place labels above fields, and avoid unrelated promotional content between fields.

### Reusable section patterns

- **Statement hero:** eyebrow, concise headline, supporting copy, and one or two actions
- **Split hero:** proposition or reassurance beside a form, illustration, or product view
- **Trust strip:** a restrained row of partner marks, accreditations, or outcome signals
- **Alternating feature row:** explanation paired with one meaningful interface or illustration
- **Bento highlight grid:** intentionally unequal cards for a small set of prioritised capabilities
- **Uniform card grid:** equal cards for comparable programmes, resources, or people
- **Category shelf:** titled group of related cards within a larger directory
- **Metric band:** a small number of clearly sourced outcomes with plain-language labels
- **Testimonial block:** quote, name, role or relationship, and optional outcome
- **Process steps:** ordered stages with concise labels and visible current or next state
- **FAQ accordion:** real recurring questions, not hidden marketing copy
- **Rich-text reader:** narrow prose with anchored headings and accessible media
- **Related-content row:** two to four relevant next items after an article or detail page
- **Final CTA band:** one short action statement immediately before the footer

### Pattern constraints

- Do not copy Cursor's visual identity, dark neutral palette, product screenshots, illustrations, or wording.
- Apply UNISEN's navy text, pale surfaces, yellow accent, rounded geometry, and calm outdoor imagery to every adopted structure.
- Use bento grids only when card size reflects content priority; otherwise use a regular grid.
- Use logos, testimonials, statistics, and partner claims only when they are real and approved.
- Prefer real product views and programme information over decorative mock interfaces.
- On mobile, preserve the content order: claim first, evidence second, continuation last.

## 19. Design Checklist

Before approving a screen, confirm that:

- The page has one obvious primary action.
- Each major section communicates one dominant idea.
- Important claims are followed by relevant, approved evidence.
- The page ends with a useful next step rather than a dead end.
- The logo has not been distorted or given unnecessary effects.
- The inner area of the puzzle "U" remains transparent.
- Yellow is used as an accent rather than the main reading surface.
- Most text uses navy or muted blue-grey.
- The layout has enough white space.
- Illustration details do not interfere with headings or controls.
- Components use consistent radii, spacing, and icon styles.
- Elevated cards use `smooth-shadow-ring-*` (or the shared `--cursor-card-shadow` token), not border + shadow doubles.
- Repeated cards are uniform unless size intentionally communicates priority.
- Focus, hover, loading, empty, error, and disabled states are present.
- Mobile layouts do not depend on desktop image positioning.
