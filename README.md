# Parallax Component Integration

This repo contains the requested React component files only.

## Added Files

- `components/ui/parallax-scrolling.tsx`
- `demos/default.tsx`

## Required Project Setup

This folder does not currently contain a full React app scaffold. To use the component, the GitHub repo must already support:

- shadcn project structure
- Tailwind CSS
- TypeScript
- the `@/*` path alias

If the repo does not have those yet, create the project with:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app
npx shadcn@latest init
npm install gsap @studio-freight/lenis
```

The default component path is `components/ui`. This matters because shadcn components and imports such as `@/components/ui/parallax-scrolling` expect reusable UI components to live there.

## Usage

Import the demo into a page:

```tsx
import ParallaxDemo from '@/demos/default';

export default function Page() {
  return <ParallaxDemo />;
}
```
