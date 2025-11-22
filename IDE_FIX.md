# IDE Fix for TypeScript Errors

## Quick Fix Steps

### 1. Restart Svelte Server
Since you see "Svelte: restart server" option:
1. Press `Ctrl+Shift+P`
2. Select **"Svelte: restart server"**
3. Wait 10-15 seconds for it to restart
4. Check if red lines disappear

### 2. If That Doesn't Work - Reload Window
1. Press `Ctrl+Shift+P`
2. Type: **"Developer: Reload Window"**
3. Press Enter
4. This will reload the entire IDE

### 3. Verify TypeScript is Working
After restarting, check:
- Open the admin page file
- Hover over `$app/forms` - should show type info
- Hover over `$lib/stores/projects` - should resolve
- Red squiggly lines should be gone

## Why "Svelte: restart server" Works

The Svelte extension manages TypeScript for Svelte files. When you restart the Svelte server, it also restarts the TypeScript language server that handles:
- Type checking
- Path alias resolution (`$app/*`, `$lib/*`)
- Import resolution

## If Errors Still Persist

### Check VS Code Extensions
Make sure you have:
- **Svelte for VS Code** (svelte.svelte-vscode)
- **TypeScript and JavaScript Language Features** (built-in)

### Check Bottom Status Bar
Look at the bottom-right of VS Code:
- Should show "TypeScript" or "Svelte"
- Click on it to see available commands
- Should show TypeScript version

### Last Resort - Full Reset
1. Close VS Code completely
2. Delete `.svelte-kit` folder
3. Run: `npx svelte-kit sync`
4. Reopen VS Code
5. Run "Svelte: restart server"

## Verification

After restarting, verify everything works:
1. ✅ No red lines under imports
2. ✅ Hover over imports shows type info
3. ✅ Autocomplete works
4. ✅ Dev server runs without errors

## Notes

- The `.vscode/settings.json` file has been created to help TypeScript work better with Svelte
- These settings tell VS Code to use the workspace TypeScript version
- This ensures compatibility with SvelteKit's type system



