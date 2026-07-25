# UNISEN Design System

## 1. Brand Overview

UNISEN is a friendly, modern brand built around connection, inclusion, collaboration, and bringing separate parts together into one whole.

The visual identity uses:
- A lowercase yellow "u" symbol with puzzle-piece connectors
- A bright cyan-blue primary field
- A family of supporting blues and teals
- Rounded geometric forms
- Bold, simple typography
- Generous white space

The overall tone should feel:
- Welcoming
- Clear
- Optimistic
- Youthful
- Collaborative
- Accessible

---

## 2. Logo

### Primary Wordmark

The primary wordmark places the yellow UNISEN mark on a cyan-blue rectangular background.

Structure:
- Puzzle-shaped lowercase "u" icon on the left
- Uppercase "UNISEN" wordmark on the right
- Icon and wordmark use the same yellow
- Background uses the primary cyan-blue

### Symbol Mark

The standalone symbol is a lowercase "u" formed from puzzle-piece geometry.

The symbol may also appear at the center of a group of puzzle pieces to represent unity and connection.

### Logo Usage

- Keep the logo horizontal when using the full wordmark.
- Keep generous clear space around the logo.
- Use the yellow logo on cyan-blue or dark blue backgrounds.
- Use the cyan-blue or dark blue logo on white backgrounds when a one-color version is required.
- Do not stretch, skew, rotate, outline, or add shadows.
- Do not recolor the logo outside the approved palette.
- Do not place the logo over visually busy imagery.

### Minimum Clear Space

Use the width of one puzzle connector from the "u" symbol as the minimum clear space on every side.

---

## 3. Color Palette

### Core Colors

| Token | Hex | RGB | Suggested Use |
|---|---:|---:|---|
| `brand-primary` | `#74C4D7` | `116, 196, 215` | Main backgrounds, brand panels, large surfaces |
| `brand-yellow` | `#FFDE59` | `255, 222, 89` | Logo, highlights, calls to action, selected states |
| `white` | `#FFFFFF` | `255, 255, 255` | Main page background, negative space |

### Supporting Blues and Teals

| Token | Hex | RGB | Suggested Use |
|---|---:|---:|---|
| `blue-deep` | `#40689C` | `64, 104, 156` | Strong contrast, headings, dark accents |
| `blue-mid` | `#3B8AC1` | `59, 138, 193` | Buttons, links, interactive elements |
| `blue-soft` | `#74A4C6` | `116, 164, 198` | Secondary cards, illustrations |
| `blue-periwinkle` | `#7BA4DB` | `123, 164, 219` | Illustration accents |
| `teal` | `#179DAB` | `23, 157, 171` | Secondary actions, charts, supporting graphics |
| `cyan-pale` | `#CDEFF3` | `205, 239, 243` | Subtle backgrounds, panels, disabled states |

### Recommended Semantic Tokens

```css
:root {
  --color-brand-primary: #74C4D7;
  --color-brand-yellow: #FFDE59;
  --color-brand-deep: #40689C;
  --color-brand-blue: #3B8AC1;
  --color-brand-soft-blue: #74A4C6;
  --color-brand-periwinkle: #7BA4DB;
  --color-brand-teal: #179DAB;
  --color-brand-pale: #CDEFF3;
  --color-white: #FFFFFF;

  --color-text-primary: #244A70;
  --color-text-secondary: #40689C;
  --color-border: #B7E1E9;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #EAF8FA;
  --color-action-primary: #3B8AC1;
  --color-action-accent: #FFDE59;
}
```

### Color Balance

Use white as the dominant page background.

Suggested distribution:
- 60% white
- 25% cyan-blue and pale cyan surfaces
- 10% supporting blues and teals
- 5% yellow accents

Yellow should draw attention rather than cover large content-heavy areas.

---

## 4. Typography

The source artwork uses a heavy geometric sans-serif wordmark. The exact font cannot be confirmed from the images alone.

### Recommended Type Stack

For digital products:

```css
font-family: "Poppins", "Nunito Sans", "Arial", sans-serif;
```

### Headings

- Use Poppins or a similar geometric sans-serif.
- Weight: 700 to 800
- Letter spacing: slightly tight
- Sentence case is preferred for product interfaces.
- Uppercase may be used for short labels or brand applications.

### Body Text

- Use Nunito Sans, Inter, or Arial.
- Weight: 400 to 500
- Use comfortable line height, around 1.5.
- Keep paragraphs short and easy to scan.

### Suggested Scale

| Style | Size | Weight | Line Height |
|---|---:|---:|---:|
| Display | 48px | 800 | 1.05 |
| H1 | 40px | 800 | 1.1 |
| H2 | 32px | 700 | 1.2 |
| H3 | 24px | 700 | 1.25 |
| Body Large | 18px | 400 | 1.5 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 500 | 1.4 |
| Label | 12px | 700 | 1.2 |

---

## 5. Shape Language

UNISEN uses puzzle geometry as its main visual device.

### Core Shape Characteristics

- Rounded tabs and cut-outs
- Soft corners
- Simple flat silhouettes
- Slight rotations for illustration pieces
- Overlapping or interlocking forms
- Minimal detail

### Corner Radius

Use rounded corners across the interface.

| Component | Radius |
|---|---:|
| Small controls | 8px |
| Buttons and inputs | 12px |
| Cards | 16px |
| Feature panels | 24px |
| Pills | 999px |

Avoid sharp, technical-looking corners unless required for data tables.

---

## 6. Spacing

Use an 8px spacing system.

```text
4px   - micro spacing
8px   - compact spacing
16px  - standard spacing
24px  - related section spacing
32px  - card and panel spacing
48px  - section spacing
64px  - large section spacing
96px  - major page spacing
```

Layouts should feel open, with large margins and clear separation between sections.

---

## 7. Layout

### General Principles

- Use white space generously.
- Keep content inside a centered maximum-width container.
- Use cyan or pale cyan panels to group related content.
- Use yellow only for focal points.
- Prefer simple two-column layouts on desktop.
- Stack content into one column on mobile.
- Keep illustrations isolated with breathing room.

### Suggested Container Widths

```css
--container-sm: 640px;
--container-md: 960px;
--container-lg: 1200px;
--container-xl: 1440px;
```

---

## 8. Components

### Buttons

#### Primary Button

- Background: `#3B8AC1`
- Text: white
- Border radius: 12px
- Font weight: 700
- Hover: darken toward `#40689C`
- Focus ring: `#74C4D7`

#### Accent Button

- Background: `#FFDE59`
- Text: `#244A70`
- Border radius: 12px
- Use for one main action per screen or section.

#### Secondary Button

- Background: white
- Text: `#3B8AC1`
- Border: 2px solid `#74C4D7`

### Cards

- Background: white or pale cyan
- Border: 1px solid `#B7E1E9`
- Border radius: 16px to 24px
- Use soft shadows sparingly.
- Cards may include a single puzzle-piece accent in one corner.

### Inputs

- Background: white
- Border: 1px solid `#A9D9E3`
- Border radius: 12px
- Focus border: `#3B8AC1`
- Focus ring: pale cyan
- Labels should remain visible above the input.

### Tags and Badges

- Use pill shapes.
- Use pale cyan backgrounds with deep blue text.
- Use yellow for selected or highlighted states.
- Keep labels short.

### Navigation

- Use white or cyan-blue backgrounds.
- Active items may use yellow indicators.
- Keep icons simple and rounded.
- Avoid dense navigation menus.

---

## 9. Illustration Style

Illustrations should use puzzle pieces as the main motif.

### Characteristics

- Flat vector style
- No outlines, or very subtle outlines
- Brand palette only
- Slightly rotated pieces
- Loose but balanced grouping
- White background or pale cyan field
- Yellow "u" symbol as the visual centre when appropriate

### Recommended Illustration Palette

Use:
- `#FFDE59`
- `#74C4D7`
- `#179DAB`
- `#3B8AC1`
- `#40689C`
- `#74A4C6`
- `#7BA4DB`
- `#CDEFF3`

Avoid gradients unless a later brand asset explicitly introduces them.

---

## 10. Icons

- Use rounded line icons or simple filled icons.
- Keep stroke width consistent.
- Prefer blue or teal.
- Use yellow only for active, selected, or featured icons.
- Puzzle tabs and circles may be used as recurring decorative details.

Recommended icon style:
- 2px stroke
- Rounded caps
- Rounded joins
- 20px, 24px, or 32px sizes

---

## 11. Motion

Motion should be soft and purposeful.

Suggested motion:
- Puzzle pieces gently move into place.
- Buttons lift by 1 to 2px on hover.
- Cards fade and move upward by 8px.
- Selected states use a quick scale from 0.98 to 1.
- Duration: 150ms to 300ms.
- Use ease-out for entrances and ease-in-out for state changes.

Avoid excessive bouncing or continuous decorative animation.

---

## 12. Accessibility

- Do not use yellow text on white.
- Use dark blue text on yellow.
- Use white text only on sufficiently dark blue or teal surfaces.
- Do not rely on color alone to communicate status.
- Provide visible keyboard focus states.
- Maintain at least 44px touch targets.
- Test all text and controls against WCAG AA contrast requirements.

The primary cyan-blue is best used as a decorative or large surface color. For body text and important controls, use deeper blues.

---

## 13. Example UI Direction

A typical UNISEN screen should use:
- White page background
- Cyan-blue hero or feature panel
- Deep blue headings
- White cards with rounded corners
- Blue primary buttons
- One yellow call-to-action or highlighted element
- Puzzle-piece illustrations as supporting visuals
- Wide spacing and uncluttered layouts

---

## 14. Design Tokens

```css
:root {
  /* Brand */
  --brand-cyan: #74C4D7;
  --brand-yellow: #FFDE59;
  --brand-teal: #179DAB;
  --brand-blue: #3B8AC1;
  --brand-blue-deep: #40689C;
  --brand-blue-soft: #74A4C6;
  --brand-periwinkle: #7BA4DB;
  --brand-cyan-pale: #CDEFF3;

  /* Surfaces */
  --surface-page: #FFFFFF;
  --surface-card: #FFFFFF;
  --surface-muted: #EAF8FA;
  --surface-brand: #74C4D7;

  /* Text */
  --text-primary: #244A70;
  --text-secondary: #40689C;
  --text-on-brand: #FFFFFF;
  --text-on-accent: #244A70;

  /* Borders */
  --border-default: #B7E1E9;
  --border-focus: #3B8AC1;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;

  /* Motion */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 300ms;
  --ease-standard: ease-in-out;
  --ease-enter: ease-out;
}
```

---

## 15. Source Notes

This design system was extracted from two supplied UNISEN brand images:
1. A horizontal wordmark with a yellow puzzle-shaped "u" and yellow "UNISEN" text on a cyan-blue field.
2. A central yellow puzzle-shaped "u" surrounded by puzzle pieces in blue, teal, cyan, and periwinkle.

Exact font files, spacing specifications, and official accessibility rules were not present in the source images, so the typography, spacing, component, and accessibility sections are practical recommendations based on the visible brand language.
