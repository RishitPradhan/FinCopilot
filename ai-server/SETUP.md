# 🚀 Stocko Setup Guide

Quick step-by-step instructions to get Stocko running locally.

## Prerequisites
- **Node.js**: v16 or higher
- **npm**: v7 or higher  
- **OpenAI API Key**: Get one from [platform.openai.com](https://platform.openai.com/account/api-keys)

## Installation Steps

### 1. Create and Navigate to Project
```bash
cd c:\Users\KIIT0001\Desktop\codenexus
```

### 2. Install Dependencies
```bash
npm install
```

This installs all required packages:
- `react` - UI framework
- `react-dom` - React DOM rendering
- `openai` - OpenAI API client
- `recharts` - Chart library
- `lucide-react` - Icon library
- `tailwindcss` - CSS framework
- `vite` - Build tool

### 3. Configure Environment Variables

**Option A: Using .env file** (Recommended)
```bash
# Create .env file in project root (already exists)
# Edit .env and add your OpenAI API key:

VITE_OPENAI_API_KEY=sk-your-api-key-here
```

**Option B: Using .env.example**
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your API key
```

⚠️ **Important**: Never commit `.env` to git. It's already in `.gitignore`.

### 4. Start Development Server
```bash
npm run dev
```

**Output will show:**
```
  VITE v5.X.X  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

The app will automatically open in your browser at `http://localhost:5173`

## 🎯 First Test

1. **Homepage loads** - You should see:
   - Stocko logo with "Ask Anything. Ask Stocko." tagline
   - 4 suggestion cards
   - Chat input at bottom

2. **Try a suggestion** - Click any card:
   - "Identify red flags in my portfolio."
   - "Summarize Q3 PPT of DMART in 7 bullet points."
   - etc.

3. **Chat interface opens** - You'll see:
   - Your message on the right (purple bubble)
   - Stocko's response on the left (green bubble)
   - Typing indicator while generating
   - Stock chart, sentiment gauge, related questions

## 📝 Customization

### Change API Model
In `ChatPage.jsx`, modify default model:
```javascript
const [currentModel, setCurrentModel] = useState('gpt-4o') // or 'gpt-4', 'gpt-3.5-turbo'
```

### Adjust Color Scheme
Edit `tailwind.config.js`:
```javascript
colors: {
  'dark-bg': '#0a0a0a',    // Main background
  'neon-green': '#00ff88',  // Primary accent
  'purple-accent': '#7c3aed' // Secondary accent
}
```

### Customize System Prompt
Edit `src/services/openaiService.js`:
```javascript
const SYSTEM_PROMPT = `You are Stocko...` // Modify this text
```

## 🔨 Development Commands

```bash
# Start dev server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code (if configured)
npm run lint
```

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

Output in `dist/` folder:
- Minified HTML, CSS, JS
- Optimized bundle size
- Source maps (optional)

Deploy `dist/` folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Your own server

## ✅ Troubleshooting

### Issue: "API key not found"
**Solution**: Ensure `.env` file has:
```
VITE_OPENAI_API_KEY=sk-your-actual-key
```
No spaces around `=`

### Issue: Port 5173 already in use
**Solution**: Change port in `vite.config.js`:
```javascript
server: {
  port: 5174 // Change to different port
}
```

### Issue: Module not found errors
**Solution**: Reinstall dependencies:
```bash
rm -r node_modules
npm install
```

### Issue: Slow responses
**Solution**: 
- Check internet connection
- Verify OpenAI API status
- Try simpler queries first
- Check API usage quota

### Issue: File upload not working
**Option**: Ensure file is under 20MB and is PNG, JPG, PDF, or PPTX

## 🌐 API Limits

**OpenAI Usage**:
- Model: GPT-4o (default)
- Max tokens: 2000 per response
- Streaming: Enabled (shows typing effect)
- Rate limit: Depends on your plan

**Monitor usage**: [OpenAI Dashboard](https://platform.openai.com/account/billing/overview)

## 🔒 Security Best Practices

1. ✅ Never share your `.env` file
2. ✅ Never commit API keys to git
3. ✅ Use environment variables for sensitive data
4. ✅ Rotate API keys periodically
5. ✅ Consider backend proxy for production
6. ✅ Implement rate limiting
7. ✅ Add user authentication

## 📱 Testing in Different Browsers

```bash
# Development server runs on localhost:5173
# Test in:
- Chrome/Edge (best support)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)
```

## 🚀 Deploy to Production

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
# Follow prompts, add VITE_OPENAI_API_KEY in dashboard
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Manual (AWS, GCP, Azure, etc.)
```bash
npm run build
# Upload `dist/` folder to your server
```

## 📞 Support Resources

- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **OpenAI API**: https://platform.openai.com/docs
- **Recharts**: https://recharts.org

## ✨ Next Steps

After setup works:

1. Explore different stock queries
2. Try uploading documents
3. Test file upload feature
4. Customize colors and prompts
5. Deploy to production
6. Share with friends!

---

**Happy chatting! 🚀📈**

*For issues or questions, refer to README.md or check component documentation.*
