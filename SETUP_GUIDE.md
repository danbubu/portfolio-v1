# Setup Guide - Sleek & Ingenious Portfolio

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation Steps

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## Project Structure

```
website_portfolio/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Main portfolio page
│   │   ├── +layout.svelte        # Root layout with cursor effect
│   │   ├── admin/
│   │   │   ├── +page.svelte      # Admin dashboard
│   │   │   └── +page.server.ts   # Server actions
│   │   └── api/
│   │       └── contact/
│   │           └── +server.ts    # Contact API endpoint
│   ├── lib/
│   │   └── stores/
│   │       └── projects.ts       # Project store
│   ├── app.css                   # Global styles
│   └── app.html                  # HTML template
├── static/
│   └── favicon.svg               # Favicon
└── package.json
```

## Key Features to Test

### 1. Cursor-Following Particle Effect

- Move your mouse around the page to see the particle trail effect
- Implemented in `+layout.svelte`

### 2. GSAP Scroll Reveal Animations

- Scroll through the page to see elements animate into view
- Sections fade in with smooth transitions

### 3. Contact Form API

- Fill out the contact form and submit
- **Check your browser console** to see the client-side log
- **Check your server console** (terminal) to see the server endpoint receiving data
- Look for: `📧 MOCK SVELTEKIT SERVER ENDPOINT RECEIVED DATA`

### 4. Admin Dashboard

- Navigate to `/admin` or click "Admin Dashboard" button
- Fill out the form to add a new project
- **Check your server console** to see the SvelteKit Action logs
- Look for: `🔧 SVELTEKIT ACTION: ADD PROJECT`
- The project will be added to the store and displayed in the list

## Building for Production

```bash
npm run build
npm run preview
```

## Customization

### Update Personal Information

- Edit `src/routes/+page.svelte` to update:
  - Name and title in the Hero section
  - About Me content
  - Skills and certifications
  - Contact information

### Change Colors

- Edit `tailwind.config.js` to modify the color palette
- Colors are defined in the `accent` and `dark` sections

### Add More Projects

- Use the Admin Dashboard to add projects dynamically
- Or edit `src/lib/stores/projects.ts` to add projects directly

## Technical Highlights

### Full-Stack Capabilities Demonstrated

1. **Server Endpoints**: Contact form submits to `/api/contact/+server.ts`
2. **Server Actions**: Admin form uses SvelteKit Actions in `+page.server.ts`
3. **State Management**: Projects stored in Svelte stores
4. **Animations**: GSAP for scroll reveals and transitions
5. **Type Safety**: TypeScript throughout the project

### Production-Ready Features

- Form validation (client and server-side)
- Error handling
- Loading states
- Responsive design
- SEO-friendly structure
- Performance optimized

## Troubleshooting

### GSAP ScrollTrigger not working

- Ensure GSAP is installed: `npm install gsap`
- Check browser console for errors

### Form submission not working

- Check server console for errors
- Ensure you're running `npm run dev` (not just opening HTML file)
- Verify the API endpoint is accessible

### Admin dashboard not saving projects

- Projects are stored in-memory (Svelte store)
- Refresh will reset to initial state
- In production, integrate with Firestore/Firebase for persistence

## Next Steps

1. Integrate with Firebase/Firestore for data persistence
2. Add authentication for the admin dashboard
3. Deploy to Vercel, Netlify, or your preferred hosting
4. Add more interactive features
5. Optimize images and assets
6. Add analytics

## Support

For issues or questions, check:

- SvelteKit documentation: https://kit.svelte.dev
- GSAP documentation: https://greensock.com/docs
- Tailwind CSS documentation: https://tailwindcss.com/docs

