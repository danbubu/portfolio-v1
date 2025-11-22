# Daniel Mawuena | Digital Artisan Portfolio

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> A high-performance, architecturally sound portfolio showcasing full-stack engineering capabilities through modern web technologies.

---

## Architecture

Built on **SvelteKit**—a deliberate engineering choice prioritizing performance, developer experience, and production readiness.

### Why SvelteKit?

- **Superior Performance**: Compile-time optimizations yield smaller bundles and faster runtime execution compared to React/Next.js
- **Native Transitions**: Built-in transition system eliminates the need for external animation libraries for common UI patterns
- **SSR/SSG Hybrid**: Server-side rendering with static generation capabilities for optimal SEO and load times
- **Reactive by Design**: Svelte's reactivity model reduces boilerplate and improves code maintainability

The portfolio embodies an **"Energetic Obsidian"** aesthetic—dark, sophisticated, with strategic use of color and motion. The layout centers around a **Bento Grid** system that adapts responsively while maintaining visual hierarchy.

---

## Tech Stack

### Core Framework
- **SvelteKit** — SSR/SSG framework with file-based routing
- **TypeScript** — Type-safe development with full IDE support
- **Vite** — Lightning-fast build tool and dev server

### Styling & Design
- **Tailwind CSS** — Utility-first CSS framework
- **CSS Variables** — Dynamic theming and design tokens
- **Custom Glassmorphism** — Frosted glass effects with backdrop filters

### Animation & Interaction
- **GSAP (GreenSock)** — Professional-grade animations for complex sequences
- **Svelte Transitions** — Native transition system for component lifecycle
- **ScrollTrigger** — Scroll-based animation orchestration

### Functionality
- **EmailJS** — Serverless contact form integration
- **Lucide Svelte** — Modern, consistent icon system

---

## Features

### Interactive Bento Grid
A responsive, layout-aware grid system leveraging Svelte's native reactivity. Cards dynamically reorganize based on viewport size while maintaining visual coherence. The grid supports dual-mode toggling (Builder/Thinker) with smooth content transitions.

### Cinematic Lighting
- **Global Mouse Tracking**: Real-time spotlight effect following cursor movement
- **Atmospheric Glow**: Aurora-style gradient overlays creating depth
- **Glassmorphic Elements**: Backdrop blur effects for modern UI polish

### Real-time Integration Ready
Architecture designed for live API hooks. Contact forms, project metrics, and dynamic content can be seamlessly integrated without structural changes.

### Performance Optimizations
- Code splitting at route level
- Lazy-loaded animations
- Optimized image delivery
- Minimal JavaScript footprint

---

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/danbubu/portfolio-v1.git
cd portfolio-v1

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the portfolio.

### Environment Variables

Create a `.env` file in the root directory for EmailJS configuration:

```env
PUBLIC_EMAILJS_SERVICE_ID=your_service_id
PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note**: The contact form requires EmailJS credentials. Without them, the form will not function, but the rest of the portfolio remains fully operational.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
portfolio-v1/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable Svelte components
│   │   └── stores/         # Svelte stores for state management
│   └── routes/             # File-based routing
│       ├── +page.svelte    # Main portfolio page
│       ├── +layout.svelte  # Root layout
│       └── api/            # API endpoints
├── static/                 # Static assets
└── public/                 # Public assets
```

---

## License

This portfolio is a personal project. All rights reserved.

---

## Contact

**Daniel Mawuena**  
Full Stack Architect

- Portfolio: [danielmawuena.com](https://danielmawuena.com)
- Email: danielmawuena75@gmail.com
- GitHub: [@danbubu](https://github.com/danbubu)

---

*Built with precision. Designed for impact.*
