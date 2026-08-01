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

Use **Nunito Sans** for the product interface and marketing pages.

Reasons:

- Rounded forms match the puzzle logo.
- It feels warm and approachable.
- It remains readable in dense product interfaces.
- It supports a wide range of weights.

Fallback stack:

```css
font-family: "Nunito Sans", "Avenir Next", Avenir, Inter, Arial, sans-serif;
```

### Optional display font

Use **Nunito** for large marketing headlines when a softer voice is needed. Do not mix it into dense dashboards or long-form body copy.

```css
font-family: "Nunito", "Nunito Sans", Arial, sans-serif;
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

- Default border: `1px solid #D7E5EB`
- Active border: `2px solid #3B8AC1`
- Avoid heavy dark outlines.
- Use soft tinted fills before adding shadows.

### Shadows

```css
--shadow-sm: 0 2px 8px rgba(24, 50, 75, 0.08);
--shadow-md: 0 10px 30px rgba(24, 50, 75, 0.10);
--shadow-lg: 0 20px 60px rgba(24, 50, 75, 0.14);
```

Use one shadow per surface. Avoid neon glow and strong blurred halos.

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

- Background: white
- Border: `1px solid #D7E5EB`
- Radius: 20 px
- Padding: 24 px
- Shadow: optional `shadow-sm`

### Highlight card

- Background: `#FFF6CC`, `#DBF1FC`, or `#CEEEF3`
- Border: none or a matching low-contrast border
- Use one illustration or icon, not several competing decorations.

### Card rules

- Keep one main purpose per card.
- Place actions at the bottom when cards appear in a grid.
- Keep card heights consistent within the same row.
- Use coloured top strips sparingly.

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

  --font-ui: "Nunito Sans", "Avenir Next", Avenir, Inter, Arial, sans-serif;
  --font-display: "Nunito", "Nunito Sans", Arial, sans-serif;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;

  --shadow-sm: 0 2px 8px rgba(24, 50, 75, 0.08);
  --shadow-md: 0 10px 30px rgba(24, 50, 75, 0.1);
  --shadow-lg: 0 20px 60px rgba(24, 50, 75, 0.14);
}
```

## 18. Design Checklist

Before approving a screen, confirm that:

- The page has one obvious primary action.
- The logo has not been distorted or given unnecessary effects.
- The inner area of the puzzle "U" remains transparent.
- Yellow is used as an accent rather than the main reading surface.
- Most text uses navy or muted blue-grey.
- The layout has enough white space.
- Illustration details do not interfere with headings or controls.
- Components use consistent radii, spacing, and icon styles.
- Focus, hover, loading, empty, error, and disabled states are present.
- Mobile layouts do not depend on desktop image positioning.
