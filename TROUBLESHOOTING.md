# Troubleshooting Guide

## TypeScript Errors for `$app` and `$lib` Paths

If you're seeing red squiggly lines under `$app/forms`, `$lib/stores/projects`, etc., follow these steps:

### Step 1: Verify Dependencies are Installed
```bash
npm install
```

### Step 2: Generate SvelteKit Types
```bash
npx svelte-kit sync
```

### Step 3: Restart TypeScript Server in IDE
- **VS Code/Cursor**: Press `Ctrl+Shift+P` → Type "TypeScript: Restart TS Server" → Enter
- **Or**: Reload the window: `Ctrl+Shift+P` → "Developer: Reload Window"

### Step 4: Verify Files Exist
- Check that `.svelte-kit/tsconfig.json` exists
- Check that `src/lib/stores/projects.ts` exists
- Check that `node_modules/@sveltejs/kit` exists

### Step 5: If Errors Persist
1. Close the IDE completely
2. Delete `.svelte-kit` folder (it will be regenerated)
3. Run `npx svelte-kit sync` again
4. Reopen the IDE
5. Restart TypeScript server

## Dev Server Issues

### If localhost stops working:

1. **Check if server is running:**
   ```bash
   npm run dev
   ```

2. **Check the port:**
   - Default is `http://localhost:5173`
   - If port is in use, Vite will try another port (e.g., 5174)

3. **Clear cache and restart:**
   ```bash
   # Stop the server (Ctrl+C)
   # Delete node_modules/.vite if it exists
   npm run dev
   ```

4. **Check for errors in terminal:**
   - Look for GSAP SSR errors (should be fixed now)
   - Look for module resolution errors
   - Check if port is available

## Common Issues

### GSAP SSR Errors
- **Fixed**: GSAP is now imported dynamically (client-side only)
- If you see GSAP errors, make sure all GSAP imports are inside `onMount()` with dynamic imports

### Path Alias Not Resolving
- SvelteKit automatically handles `$app/*` and `$lib/*` aliases
- Don't add them manually to `tsconfig.json`
- Use `kit.alias` in `svelte.config.js` if needed (already configured)

### Type Errors
- Run `npx svelte-kit sync` after any config changes
- Restart TypeScript server in IDE
- Make sure `strict: true` in tsconfig.json (it's enabled)

## Verification

To verify everything is working:

1. **Check types are generated:**
   ```bash
   ls .svelte-kit/types
   ```

2. **Check path aliases:**
   ```bash
   cat .svelte-kit/tsconfig.json | grep paths
   ```

3. **Test the dev server:**
   ```bash
   npm run dev
   # Should start without errors
   # Should show "Local: http://localhost:5173"
   ```

## Still Having Issues?

1. Delete `node_modules` and `.svelte-kit` folders
2. Run `npm install`
3. Run `npx svelte-kit sync`
4. Restart IDE
5. Restart TypeScript server




