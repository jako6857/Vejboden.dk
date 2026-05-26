# Vejboden.dk Design Guide

**Version 1.0 | May 2026**

A comprehensive design system for the Vejboden.dk platform - connecting local buyers with roadside produce stands across Denmark.

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Iconography](#iconography)
7. [Imagery Guidelines](#imagery-guidelines)
8. [Interaction States](#interaction-states)
9. [Responsive Behavior](#responsive-behavior)

---

## Brand Overview

### Design Philosophy

**Fresh & Functional** - A clean, Swiss-inspired layout with warm organic colors, combining the trustworthiness of structured grids with the approachability of a farmers market.

### Key Attributes

- **Trustworthy**: Clear information hierarchy, accurate location data
- **Approachable**: Warm colors, friendly interactions
- **Local**: Earthy, organic aesthetic reflecting Danish farmland
- **Modern**: Clean interface, mobile-optimized

---

## Color System

### Primary Colors

| Color Name        | Hex Code  | Usage                                   | RGB                |
| ----------------- | --------- | --------------------------------------- | ------------------ |
| **Harvest Green** | `#4A7C4E` | Primary brand, main CTAs, active states | rgb(74, 124, 78)   |
| **Earth Brown**   | `#8B5A3C` | Secondary actions, hover states         | rgb(139, 90, 60)   |
| **Cream**         | `#FFF8E7` | Page background, warmth                 | rgb(255, 248, 231) |

### Accent Colors

| Color Name        | Hex Code  | Usage                                         | RGB               |
| ----------------- | --------- | --------------------------------------------- | ----------------- |
| **Tomato Red**    | `#D64545` | Destructive actions, errors, important alerts | rgb(214, 69, 69)  |
| **Carrot Orange** | `#F2994A` | Ratings, highlights, success states           | rgb(242, 153, 74) |
| **Sky Blue**      | `#56CCF2` | Links, map elements, info states              | rgb(86, 204, 242) |

### Neutral Colors

| Color Name     | Hex Code  | Usage                            | RGB                |
| -------------- | --------- | -------------------------------- | ------------------ |
| **Charcoal**   | `#2D3436` | Primary text, headings           | rgb(45, 52, 54)    |
| **Stone Gray** | `#636E72` | Secondary text, labels           | rgb(99, 110, 114)  |
| **Light Gray** | `#F5F5F5` | Dividers, disabled states        | rgb(245, 245, 245) |
| **White**      | `#FFFFFF` | Cards, inputs, clean backgrounds | rgb(255, 255, 255) |

### Color Usage Guidelines

**Primary Actions**

- Background: Harvest Green `#4A7C4E`
- Text: White `#FFFFFF`
- Hover: Earth Brown `#8B5A3C`

**Secondary Actions**

- Background: White `#FFFFFF`
- Border: Harvest Green `#4A7C4E`
- Text: Harvest Green `#4A7C4E`
- Hover: Cream background `#FFF8E7`

**Destructive Actions**

- Background: Tomato Red `#D64545`
- Text: White `#FFFFFF`

---

## Typography

### Font Family

**Primary**: Inter (fallback: system-ui, -apple-system, sans-serif)

**Characteristics**:

- Clean, highly readable on mobile devices
- Excellent performance at small sizes (map labels, tags)
- Professional yet approachable

### Type Scale

| Element        | Size            | Weight | Line Height | Usage                  |
| -------------- | --------------- | ------ | ----------- | ---------------------- |
| **Hero**       | 48px (3rem)     | 600    | 1.2         | Landing page headlines |
| **H1**         | 36px (2.25rem)  | 600    | 1.3         | Page titles            |
| **H2**         | 28px (1.75rem)  | 600    | 1.4         | Section headings       |
| **H3**         | 20px (1.25rem)  | 600    | 1.5         | Card titles            |
| **H4**         | 18px (1.125rem) | 500    | 1.5         | Subsections            |
| **Body Large** | 18px (1.125rem) | 400    | 1.6         | Hero descriptions      |
| **Body**       | 16px (1rem)     | 400    | 1.5         | Default text           |
| **Body Small** | 14px (0.875rem) | 400    | 1.5         | Supporting text        |
| **Caption**    | 12px (0.75rem)  | 400    | 1.4         | Labels, tags           |
| **Button**     | 16px (1rem)     | 500    | 1.5         | All buttons            |

### Font Weights

- **Regular**: 400 (body text)
- **Medium**: 500 (buttons, labels)
- **Semi-Bold**: 600 (headings)

### Letter Spacing

- Headings: -0.01em (slightly tighter)
- Body: 0em (default)
- All-caps labels: 0.05em (slightly wider)

---

## Spacing & Layout

### Spacing Scale (8px base)

| Token | Value | Usage                           |
| ----- | ----- | ------------------------------- |
| `xs`  | 4px   | Icon spacing, tight gaps        |
| `sm`  | 8px   | Card padding, small gaps        |
| `md`  | 16px  | Default spacing, component gaps |
| `lg`  | 24px  | Section spacing                 |
| `xl`  | 32px  | Large section spacing           |
| `2xl` | 48px  | Hero sections                   |
| `3xl` | 64px  | Page sections                   |

### Border Radius

| Token  | Value  | Usage                   |
| ------ | ------ | ----------------------- |
| `sm`   | 6px    | Small tags, badges      |
| `md`   | 8px    | Inputs, small buttons   |
| `lg`   | 12px   | Cards, main buttons     |
| `xl`   | 16px   | Large containers        |
| `full` | 9999px | Pills, circular buttons |

### Grid System

**Desktop (≥768px)**

- Max width: 1280px
- Columns: 12
- Gutter: 24px
- Margins: 32px

**Mobile (<768px)**

- Columns: 4
- Gutter: 16px
- Margins: 16px

---

## Components

### 1. Buttons

#### Primary Button

```
Background: Harvest Green (#4A7C4E)
Text: White (#FFFFFF)
Padding: 12px 24px
Border Radius: 12px
Font: 16px, weight 500

Hover:
  Background → Earth Brown (#8B5A3C)

Active:
  Scale: 0.98

Disabled:
  Background: Light Gray (#F5F5F5)
  Text: Stone Gray (#636E72)
```

#### Secondary Button

```
Background: White (#FFFFFF)
Border: 2px solid Harvest Green (#4A7C4E)
Text: Harvest Green (#4A7C4E)
Padding: 12px 24px
Border Radius: 12px

Hover:
  Background → Cream (#FFF8E7)
```

#### Filter Pill (Active)

```
Background: Harvest Green (#4A7C4E)
Text: White (#FFFFFF)
Padding: 8px 16px
Border Radius: 9999px (full)
Icon size: 16px
Gap: 8px
```

#### Filter Pill (Inactive)

```
Background: White (#FFFFFF)
Border: 1px solid rgba(0,0,0,0.2)
Text: Charcoal (#2D3436)
Padding: 8px 16px
Border Radius: 9999px
```

### 2. Cards

#### Stall Card

```
Container:
  Background: White (#FFFFFF)
  Border: 1px solid rgba(0,0,0,0.1)
  Border Radius: 12px
  Shadow: 0 1px 3px rgba(0,0,0,0.1)

  Hover:
    Shadow → 0 4px 12px rgba(0,0,0,0.15)

Image Area:
  Height: 160px
  Background: Gradient (Harvest Green → Earth Brown)

Content Padding: 16px

Header:
  Display: Flex, space-between

Title:
  Font: 20px, weight 600
  Color: Charcoal (#2D3436)

Distance:
  Font: 14px, weight 400
  Color: Stone Gray (#636E72)
  Icon: Map Pin, 12px

Rating:
  Star icon: 16px, fill Carrot Orange (#F2994A)
  Text: 14px
  Reviews: 12px, Stone Gray
```

#### Product Tags

```
Background: Cream (#FFF8E7)
Text: Harvest Green (#4A7C4E)
Font: 12px, weight 400
Padding: 4px 12px
Border Radius: 9999px
Gap between tags: 8px
```

### 3. Header

```
Background: White (#FFFFFF)
Border Bottom: 1px solid rgba(0,0,0,0.1)
Height: 72px
Padding: 16px 32px
Position: Sticky top
Z-index: 50

Logo Container:
  Width: 40px
  Height: 40px
  Background: Harvest Green (#4A7C4E)
  Border Radius: 8px
  Icon: Map Pin, 24px, White

Navigation Links:
  Font: 16px, weight 400
  Color: Charcoal (#2D3436)

  Hover:
    Color → Harvest Green (#4A7C4E)
    Transition: 200ms
```

### 4. Search Input

```
Container:
  Background: White (#FFFFFF)
  Border: 1px solid rgba(0,0,0,0.1)
  Border Radius: 12px
  Shadow: 0 1px 3px rgba(0,0,0,0.05)
  Padding: 8px
  Display: Flex
  Gap: 8px

Input Field:
  Flex: 1
  Padding: 12px 16px
  Font: 16px
  Border: none
  Outline: none

  Placeholder:
    Color: Stone Gray (#636E72)

Search Button:
  Background: Harvest Green (#4A7C4E)
  Padding: 12px 24px
  Border Radius: 8px
  Icon + Text
  Gap: 8px
```

### 5. Rating Display

```
Star Icon:
  Size: 16px
  Fill: Carrot Orange (#F2994A)
  Stroke: Carrot Orange (#F2994A)

Rating Number:
  Font: 14px, weight 500
  Color: Charcoal (#2D3436)

Review Count:
  Font: 12px, weight 400
  Color: Stone Gray (#636E72)
  Format: "(24)"

Layout:
  Display: Flex
  Gap: 4px
  Align: Center
```

### 6. Map Markers (Custom)

```
Marker Pin:
  Height: 40px
  Width: 32px
  Background: Harvest Green (#4A7C4E)
  Border: 3px solid White
  Shadow: 0 2px 8px rgba(0,0,0,0.2)

Marker Icon:
  Apple or Carrot icon
  Size: 18px
  Color: White

Active State:
  Background → Carrot Orange (#F2994A)
  Scale: 1.1
```

---

## Iconography

### Icon Library

**Source**: Lucide React (lucide-react package)

### Common Icons

| Icon Name     | Usage                      | Size    |
| ------------- | -------------------------- | ------- |
| `MapPin`      | Location markers, distance | 16-24px |
| `Apple`       | Fruit category             | 16px    |
| `Carrot`      | Vegetable category         | 16px    |
| `Star`        | Ratings                    | 16px    |
| `User`        | Account, profile           | 20px    |
| `Menu`        | Mobile navigation          | 24px    |
| `Search`      | Search functionality       | 20px    |
| `X`           | Close, remove              | 20px    |
| `ChevronDown` | Dropdowns                  | 16px    |
| `Filter`      | Filter actions             | 20px    |

### Icon Guidelines

- Use **rounded** stroke style
- Stroke width: **2px**
- Color: Inherit from parent or use Harvest Green for primary
- Always include proper spacing (8px minimum from text)

---

## Imagery Guidelines

### Photography Style

**Subject Matter**:

- Fresh produce (close-ups)
- Roadside stalls (authentic, not staged)
- Danish countryside (fields, farms)
- People at markets (candid, diverse)

**Technical Specs**:

- Aspect Ratio: 16:9 for cards, 1:1 for avatars
- Resolution: Minimum 1200px width
- Format: WebP (fallback: JPG)
- File Size: Maximum 150KB per image

**Visual Treatment**:

- Natural lighting (warm, golden hour preferred)
- Slightly desaturated (earthy, not oversaturated)
- Shallow depth of field for produce close-ups
- Authentic, non-stock photography feel

### Placeholder Gradients

When images aren't available, use:

```
background: linear-gradient(135deg, #4A7C4E, #8B5A3C)
```

---

## Interaction States

### Hover States

**Buttons**:

- Primary: Background Harvest Green → Earth Brown
- Secondary: Background White → Cream
- Transition: 200ms ease

**Cards**:

- Shadow: 0 1px 3px → 0 4px 12px rgba(0,0,0,0.15)
- Transition: 300ms ease
- Cursor: pointer

**Links**:

- Color: Charcoal → Harvest Green
- Transition: 150ms ease

### Active States

**Buttons**:

- Transform: scale(0.98)
- Duration: 100ms

**Filter Pills**:

- Active: Filled background (Harvest Green)
- Inactive: Outlined

### Focus States

**All Interactive Elements**:

```
Outline: 2px solid Harvest Green (#4A7C4E)
Outline Offset: 2px
Border Radius: Inherit
```

### Loading States

**Skeleton Screens**:

- Background: Light Gray (#F5F5F5)
- Animation: Shimmer effect
- Duration: 1.5s infinite

**Spinners**:

- Color: Harvest Green (#4A7C4E)
- Size: 24px default
- Stroke Width: 3px

---

## Responsive Behavior

### Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1023px
Desktop: ≥ 1024px
Wide: ≥ 1280px
```

### Touch Targets

**Minimum Size**: 44px × 44px (WCAG AAA)

- All buttons
- Links in mobile navigation
- Map markers
- Filter pills

---

## Accessibility

### Color Contrast

All text meets **WCAG AA** standards

### Focus Indicators

- Always visible
- 2px solid outline
- Never removed with `outline: none`

### Screen Reader Labels

- All icons have `aria-label`
- Form inputs have associated `<label>`
- Map markers have descriptive text

### Keyboard Navigation

- Tab order follows visual hierarchy
- All interactive elements reachable
- Enter/Space activate buttons
- Escape closes modals

---

## Implementation Notes

### CSS Custom Properties

```css
:root {
  /* Colors */
  --harvest-green: #4a7c4e;
  --earth-brown: #8b5a3c;
  --cream: #fff8e7;
  --tomato-red: #d64545;
  --carrot-orange: #f2994a;
  --sky-blue: #56ccf2;
  --charcoal: #2d3436;
  --stone-gray: #636e72;
  --light-gray: #f5f5f5;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

### Animation Timings

```css
--transition-fast: 150ms;
--transition-normal: 200ms;
--transition-slow: 300ms;
--ease: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Examples & Use Cases

### Use Case 1: Stall Card Composition

```
┌─────────────────────────┐
│   [Gradient Image]      │ 160px height
│      🍎 or 🥕           │
├─────────────────────────┤
│ Petersens Gård    ⭐4.5 │ 20px font, semi-bold
│ 📍 1.2 km væk    (24)   │ 14px, gray
│                         │
│ [Æbler] [Pærer]         │ Cream pills, 12px
│ [Jordbær]               │
│                         │
│ [ Se detaljer ]         │ Green button
└─────────────────────────┘
```

### Use Case 2: Mobile Filter Bar

```
Filtrer efter: [🍎 Frugt] [🥕 Grøntsager] [Alle...] →
               ↑ Active    ↑ Inactive
```

### Use Case 3: Hero Search

```
┌───────────────────────────────────────┐
│  Find friske råvarer lokalt           │ 48px heading
│  Opdag vejboder i dit område...       │ 18px subtext
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ 🔍 Søg efter lokation...  [Søg] │ │ Search bar
│  └─────────────────────────────────┘ │
└───────────────────────────────────────┘
```

---
