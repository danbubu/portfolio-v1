# 🚀 Sleek & Ingenious Full-Stack Portfolio

A sophisticated, dark-themed portfolio website built with **SvelteKit**, **TypeScript**, **Tailwind CSS**, and **GSAP animations**. This project demonstrates production-grade full-stack development skills with modern web technologies.

## ✨ Features

### 🎨 Design & Aesthetics

- **Dark Mode Default**: Deep, technical, layered dark mode palette (Discord/Cursor-inspired)
- **Abstract Geometric Design**: Clean lines, subtle glow effects, minimalistic aesthetic
- **Responsive Design**: Fully responsive across all devices
- **Professional Typography**: Inter/Fira Sans font families

### 🎭 Wow-Factor Animations

- **Cursor-Following Particle Effect**: Subtle particle trail that follows cursor movement
- **GSAP Scroll Reveal**: Smooth animations as elements enter the viewport
- **Fluid Page Transitions**: Seamless transitions between routes
- **Parallax Effects**: Geometric shapes with parallax scrolling

### 🛠️ Full-Stack Features

#### 1. Contact via API

- Contact form with server-side processing
- SvelteKit server endpoint (`/api/contact/+server.ts`)
- Form validation and error handling
- **Check browser console** for client-side logs
- **Check server console** for endpoint data reception

#### 2. Admin Dashboard

- Protected route at `/admin`
- Project management interface
- SvelteKit Actions for form processing
- Real-time project list updates
- **Check server console** for action logs

### 📄 Content Sections

- **Home/Intro**: Large, abstract geometric title with gradient text
- **About Me**:
  - Builder View (Project Contributions)
  - Thinker View (Problem-Solving Philosophy)
  - Skills & Certifications
- **Projects**:
  - Airdrop Tracker showcase with interactive code snippets
  - 3D-like mockups with nested div layers
  - Technology stack badges
- **Contact**: API-integrated contact form

## 🛠️ Tech Stack

- **Framework**: SvelteKit 2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP 3.12
- **Build Tool**: Vite 5.0
- **Adapter**: @sveltejs/adapter-auto

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

1. Start the dev server: `npm run dev`
2. Open `http://localhost:5173` in your browser
3. Test the features:
   - Move mouse to see cursor particles
   - Scroll to see GSAP animations
   - Submit contact form (check console)
   - Visit `/admin` to add projects (check server console)

## 📁 Project Structure

```
website_portfolio/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Main portfolio page
│   │   ├── +layout.svelte        # Root layout with cursor effect
│   │   ├── admin/
│   │   │   ├── +page.svelte      # Admin dashboard UI
│   │   │   └── +page.server.ts   # Server actions
│   │   └── api/
│   │       └── contact/
│   │           └── +server.ts    # Contact API endpoint
│   ├── lib/
│   │   └── stores/
│   │       └── projects.ts       # Svelte store for projects
│   ├── app.css                   # Global styles & Tailwind
│   └── app.html                  # HTML template
├── static/
│   └── favicon.svg               # Favicon
└── configuration files...
```

## 🎯 Key Technical Demonstrations

### 1. Server Endpoints

The contact form demonstrates SvelteKit server endpoints:

- **File**: `src/routes/api/contact/+server.ts`
- **Method**: POST
- **Features**: Request handling, validation, logging
- **Check**: Server console for received data logs

### 2. Server Actions

The admin dashboard uses SvelteKit Actions:

- **File**: `src/routes/admin/+page.server.ts`
- **Action**: `addProject`
- **Features**: Form processing, validation, state management
- **Check**: Server console for action logs

### 3. State Management

Projects are managed with Svelte stores:

- **File**: `src/lib/stores/projects.ts`
- **Features**: Reactive state, type-safe updates
- **Usage**: Shared across components

### 4. GSAP Animations

Advanced animations with GSAP:

- Scroll-triggered reveals
- Cursor-following effects
- Page transitions
- Parallax effects

## 🎨 Customization

### Update Personal Information

Edit `src/routes/+page.svelte`:

- Hero section title and description
- About Me content (Builder/Thinker views)
- Skills and certifications
- Contact information

### Modify Colors

Edit `tailwind.config.js`:

- `accent` colors (blue, purple, pink, cyan)
- `dark` palette (background colors)

### Add Projects

- Use the Admin Dashboard at `/admin`
- Or edit `src/lib/stores/projects.ts` directly

## 📝 Important Notes

### Console Logging

- **Browser Console**: Check for client-side form submission logs
- **Server Console** (Terminal): Check for:
  - `📧 MOCK SVELTEKIT SERVER ENDPOINT RECEIVED DATA` (Contact form)
  - `🔧 SVELTEKIT ACTION: ADD PROJECT` (Admin dashboard)

### Data Persistence

- Projects are stored in-memory (Svelte store)
- Page refresh will reset to initial state
- For production: Integrate with Firestore/Firebase

### Production Deployment

1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure environment variables if needed
4. Set up Firebase/Firestore for data persistence (optional)

## 🐛 Troubleshooting

### GSAP not working

- Ensure GSAP is installed: `npm install gsap`
- Check browser console for errors
- Verify ScrollTrigger is registered

### Form submission errors

- Check server is running: `npm run dev`
- Verify API endpoint is accessible
- Check server console for errors

### Admin dashboard not saving

- Projects are in-memory (refresh resets)
- Check server console for action logs
- Verify form validation is passing

## 📚 Documentation

- [SvelteKit Docs](https://kit.svelte.dev)
- [GSAP Docs](https://greensock.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

## 🎓 Learning Resources

This project demonstrates:

- Full-stack SvelteKit development
- Server endpoints and actions
- State management with Svelte stores
- Advanced animations with GSAP
- TypeScript best practices
- Tailwind CSS styling
- Form handling and validation
- API integration

## 📄 License

MIT License - Feel free to use this project for your own portfolio!

## 🙏 Credits

Built with:

- SvelteKit
- GSAP
- Tailwind CSS
- TypeScript
- Vite

---

**Ready to showcase your skills!** 🚀

For setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)
