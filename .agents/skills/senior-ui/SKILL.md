---
name: senior-ui
description: Premium UI standards — Tailwind CSS 4 ordering, dark theme, glass effects, micro-animations, accessibility.
---

# UI & Styling — Premium, Not Generic

## Tailwind CSS 4 Class Ordering
Always order classes: **Layout → Flex/Grid → Spacing → Sizing → Typography → Colors → Borders → Effects → Transitions → States**

```tsx
// ✅ CORRECT ordering
<div className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-white/90 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-xl" />
```

## Design Standards
- **Colors:** Use the established HSL palette from `global.css`. Never use raw colors like `bg-red-500` for primary UI. Use semantic tokens.
- **Typography:** Use `font-outfit` (headings), `font-manrope` (body), `font-jakarta` (UI labels) as defined in the root layout.
- **Dark Theme:** This is a dark-first app (`bg-[#001C2F]`). All components must look premium on dark backgrounds.
- **Glass Effects:** Use `bg-white/5 backdrop-blur-md border border-white/10` for card surfaces.
- **Micro-animations:** Use Framer Motion for enters/exits, Tailwind `transition-*` for hover states.

## Component Patterns
```tsx
// ✅ CORRECT: Reusable, accessible, well-typed
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({ variant = "primary", size = "md", isLoading, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
```

## Accessibility
- **Every** interactive element must have proper `aria-*` attributes.
- **Every** image must have a descriptive `alt` text.
- **Every** form input must have an associated `<label>`.
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`.
- Support keyboard navigation (focus rings, tab order).
