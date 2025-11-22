# Tech Stack SVG Icons

Download these SVG files from https://svgl.app/ and place them in this directory.

## Required Files:

### Download from svgl.app:

1. **react.svg** - Search "React" → Download SVG
2. **typescript.svg** - Search "TypeScript" → Download SVG
3. **nodejs.svg** - Search "Node.js" → Download SVG
4. **svelte.svg** - Search "Svelte" → Download SVG
5. **firebase.svg** - Search "Firebase" → Download SVG
6. **supabase.svg** - Search "Supabase" → Download SVG
7. **postgresql.svg** - Search "PostgreSQL" → Download SVG
8. **tailwindcss.svg** - Search "Tailwind CSS" → Download SVG
9. **aws.svg** - Search "AWS" → Download SVG
10. **gsap.svg** - Search "GSAP" → Download SVG

## How to Download:

1. Go to https://svgl.app/
2. Search for the technology name
3. Click the download icon (⬇️) or right-click → Save
4. Save with the exact filename listed above
5. Place all files in this directory: `static/images/tech/`

## After Downloading:

Update the image paths in `src/routes/+page.svelte` from:
```
https://api.svgl.app/react.svg
```

To:
```
/images/tech/react.svg
```

## Final Structure:

```
static/
└── images/
    └── tech/
        ├── react.svg
        ├── typescript.svg
        ├── nodejs.svg
        ├── svelte.svg
        ├── firebase.svg
        ├── supabase.svg
        ├── postgresql.svg
        ├── tailwindcss.svg
        ├── aws.svg
        └── gsap.svg
```

## Note:
The current implementation uses direct URLs from svgl.app API which works fine for development, but downloading locally is better for production (faster, more reliable, no external dependencies).

