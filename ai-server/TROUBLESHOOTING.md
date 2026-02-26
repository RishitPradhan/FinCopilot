# 🔧 Stocko Troubleshooting Guide

## Common Issues and Solutions

### 1. "GitHub Copilot subscription ends" Error
This error is related to your IDE/editor, not the Stocko application itself.

**Solutions:**
- This is a VS Code/IDE notification, not a Stocko error
- The chatbot will work fine regardless of Copilot status
- You can dismiss this notification in your IDE settings

### 2. "OpenAI API key not found" Error
**Symptoms:** App shows API key error when trying to chat

**Solutions:**
1. Make sure you have a `.env` file in the project root
2. Add your OpenAI API key to `.env`:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Get your API key from: https://platform.openai.com/api-keys
4. Restart the development server: `npm run dev`

### 3. "Module not found" Errors
**Symptoms:** Import errors, missing dependencies

**Solutions:**
1. Install dependencies: `npm install`
2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### 4. Styling Issues / Missing Animations
**Symptoms:** Components look broken, animations don't work

**Solutions:**
1. Make sure Tailwind CSS is properly configured
2. Restart the dev server: `npm run dev`
3. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

### 5. Chat Not Working / No Response
**Symptoms:** Messages sent but no response from AI

**Solutions:**
1. Check your OpenAI API key is valid and has credits
2. Check browser console for errors (F12)
3. Verify internet connection
4. Try a different model (GPT-3.5 instead of GPT-4o)

### 6. File Upload Not Working
**Symptoms:** Can't upload files or files not processed

**Solutions:**
1. Only PNG, JPG, PDF, PPTX files are supported
2. Check file size (keep under 20MB)
3. Make sure you're using GPT-4o model for vision features

### 7. Port Already in Use
**Symptoms:** "Port 5173 is already in use"

**Solutions:**
1. Kill the process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5173 | xargs kill -9
   ```
2. Or use a different port:
   ```bash
   npm run dev -- --port 3000
   ```

### 8. Build Errors
**Symptoms:** `npm run build` fails

**Solutions:**
1. Fix any TypeScript/ESLint errors first
2. Make sure all imports are correct
3. Check for unused variables/imports
4. Run: `npm run lint` to see issues

## Quick Fixes

### Reset Everything
```bash
# Stop the server (Ctrl+C)
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Check Environment
```bash
# Make sure these work:
node --version  # Should be 16+
npm --version   # Should be 8+
```

### Verify Setup
```bash
# Run the setup script
npm run setup

# Start development
npm run dev
```

## Getting Help

1. **Check the Console:** Open browser DevTools (F12) and look for errors
2. **Check the Terminal:** Look for error messages in your terminal
3. **Verify API Key:** Make sure your OpenAI API key is valid and has credits
4. **Clear Cache:** Try clearing browser cache and restarting

## Environment Variables

Make sure your `.env` file contains:
```
VITE_OPENAI_API_KEY=your_actual_api_key_here
```

**Important:** 
- Never commit `.env` file to version control
- The key must start with `sk-`
- Make sure there are no extra spaces or quotes

## Still Having Issues?

1. Check if the issue is in the browser console (F12)
2. Try running in incognito/private mode
3. Test with a fresh API key
4. Make sure you have sufficient OpenAI credits

---

**Remember:** The "GitHub Copilot subscription ends" message is just an IDE notification and doesn't affect Stocko's functionality!