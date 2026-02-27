# 📂 Stocko Project Structure

Complete breakdown of all files and directories in the Stocko project.

```
stocko/
├── Configuration Files
│   ├── package.json              # NPM dependencies and scripts
│   ├── vite.config.js            # Vite build configuration
│   ├── tailwind.config.js        # Tailwind CSS customization
│   ├── postcss.config.js         # PostCSS plugins (Tailwind, Autoprefixer)
│   └── .gitignore                # Files to ignore in git
│
├── Environment Files
│   ├── .env                      # Local environment variables (API key)
│   └── .env.example              # Template for .env setup
│
├── HTML & Assets
│   └── index.html                # Main HTML entry point
│
├── Documentation
│   ├── README.md                 # Complete project documentation
│   ├── SETUP.md                  # Detailed setup instructions
│   ├── FEATURES.md               # Feature documentation
│   ├── QUICKSTART.md             # 2-minute quick start
│   └── PROJECT_STRUCTURE.md      # This file
│
├── src/
│   ├── main.jsx                  # React DOM entry point
│   ├── App.jsx                   # Main app component (router logic)
│   ├── index.css                 # Global styles & animations
│   │
│   ├── components/
│   │   ├── index.js              # Component exports (barrel file)
│   │   │
│   │   ├── StockoLogo.jsx        # Stocko logo SVG component
│   │   │   └── Features:
│   │   │       - Hexagonal badge
│   │   │       - Green chart line with glow
│   │   │       - Responsive sizing
│   │   │
│   │   ├── HomePage.jsx          # Landing screen component
│   │   │   └── Includes:
│   │   │       - Logo display
│   │   │       - 4 suggestion cards
│   │   │       - Chat input
│   │   │       - Chat History button
│   │   │
│   │   ├── ChatPage.jsx          # Main chat interface
│   │   │   └── Features:
│   │   │       - Message display
│   │   │       - Auto-scroll
│   │   │       - Stream handling
│   │   │       - Error handling
│   │   │       - Chat history integration
│   │   │
│   │   ├── ChatInputBar.jsx      # Input area with controls
│   │   │   └── Includes:
│   │   │       - Model selector dropdown
│   │   │       - New chat button
│   │   │       - Text input (multiline)
│   │   │       - File upload (paperclip)
│   │   │       - Send button
│   │   │
│   │   ├── ChatMessage.jsx       # Message bubble component
│   │   │   └── Props:
│   │   │       - type: 'user' or 'bot'
│   │   │       - content: message text
│   │   │       - timestamp: message time
│   │   │
│   │   ├── BotResponse.jsx       # Formatted response display
│   │   │   └── Features:
│   │   │       - Answer tab
│   │   │       - Sources tab
│   │   │       - Chart rendering
│   │   │       - Sentiment gauge
│   │   │       - Quick snapshot table
│   │   │       - Key events
│   │   │       - Related questions
│   │   │
│   │   ├── StockChart.jsx        # Stock price chart
│   │   │   └── Uses:
│   │   │       - Recharts library
│   │   │       - ComposedChart (line + scatter)
│   │   │       - Event markers
│   │   │       - CustomTooltip
│   │   │
│   │   ├── SentimentGauge.jsx    # Market sentiment meter
│   │   │   └── Features:
│   │   │       - SVG semicircle
│   │   │       - Animated needle
│   │   │       - Color zones (red/orange/green)
│   │   │       - Count display
│   │   │
│   │   ├── ChatHistory.jsx       # History sidebar panel
│   │   │   └── Features:
│   │   │       - Slide-in animation
│   │   │       - Conversation list
│   │   │       - Delete individual items
│   │   │       - Clear all button
│   │   │
│   │   └── TypingIndicator.jsx   # Loading indicator
│   │       └── Shows:
│   │           - 3 pulsing dots
│   │           - Staggered animation
│   │
│   └── services/
│       └── openaiService.js      # OpenAI API integration
│           ├── sendMessageToGPT()
│           │   - Stream responses
│           │   - Handle files
│           │   - Error handling
│           │
│           ├── System Prompt
│           │   - Financial expertise
│           │   - Formatting guidelines
│           │   - Indian stock focus
│           │
│           └── Helper Functions
│               - generateMockChartData()
│               - generateMockSnapshot()
│               - parseResponseForChart()
│
├── FOLDER TREE SUMMARY
│
stocko/.env                           (500 B)
stocko/.env.example                   (80 B)
stocko/.gitignore                     (400 B)
stocko/index.html                     (600 B)
stocko/package.json                   (1.2 KB)
stocko/postcss.config.js              (100 B)
stocko/README.md                      (12 KB)
stocko/SETUP.md                       (8 KB)
stocko/FEATURES.md                    (15 KB)
stocko/QUICKSTART.md                  (1 KB)
stocko/tailwind.config.js             (1 KB)
stocko/vite.config.js                 (300 B)
stocko/src/
├── App.jsx                           (2 KB)
├── index.css                         (3 KB)
├── main.jsx                          (250 B)
├── components/
│   ├── index.js                      (500 B)
│   ├── BotResponse.jsx               (6 KB)
│   ├── ChatHistory.jsx               (3 KB)
│   ├── ChatInputBar.jsx              (5 KB)
│   ├── ChatMessage.jsx               (2 KB)
│   ├── ChatPage.jsx                  (8 KB)
│   ├── HomePage.jsx                  (4 KB)
│   ├── SentimentGauge.jsx            (4 KB)
│   ├── StockChart.jsx                (5 KB)
│   ├── StockoLogo.jsx                (4 KB)
│   └── TypingIndicator.jsx           (1 KB)
└── services/
    └── openaiService.js              (4 KB)

Total Size: ~95 KB (before node_modules)
```

---

## 📄 File-by-File Description

### Root Configuration Files

#### `package.json`
- **Purpose**: NPM dependencies and scripts
- **Key Scripts**:
  - `npm run dev`: Start development server
  - `npm run build`: Production build
  - `npm run preview`: Preview production build
- **Dependencies**: React, OpenAI, Recharts, Tailwind, etc.
- **Edit When**: Adding packages or changing build scripts

#### `vite.config.js`
- **Purpose**: Vite build tool configuration
- **Settings**: Port 5173, React plugin, auto-open browser
- **Edit When**: Changing dev server port or build behavior

#### `tailwind.config.js`
- **Purpose**: Tailwind CSS customization
- **Custom Colors**: Dark-bg, neon-green, purple-accent
- **Edit When**: Changing color scheme or adding utilities

#### `postcss.config.js`
- **Purpose**: PostCSS processor configuration
- **Plugins**: Tailwind CSS, Autoprefixer
- **Edit When**: Adding CSS processing plugins

#### `.env` (Local only - not in git)
- **Purpose**: Environment variables
- **Contains**: `VITE_OPENAI_API_KEY=your_key_here`
- **Security**: Never commit this file

#### `.env.example`
- **Purpose**: Template for `.env`
- **Use**: `cp .env.example .env` to create local .env
- **Edit When**: Adding new environment variables

#### `.gitignore`
- **Purpose**: Specify files to ignore in git
- **Ignores**: node_modules, .env, build artifacts, IDE files
- **Edit When**: Adding new build outputs or artifacts

### HTML & CSS

#### `index.html`
- **Purpose**: Main HTML page
- **Contains**:
  - Meta tags (viewport, title)
  - Google Fonts link
  - Root div for React
  - Script reference to main.jsx
- **Edit When**: Changing page title or meta tags

#### `src/index.css`
- **Purpose**: Global styles and animations
- **Includes**:
  - Custom scrollbar styling
  - Keyframe animations (slideIn, fadeIn, glow)
  - Base HTML/body styles
  - Color utilities (.glow-green, .glow-purple)
- **Edit When**: Adding global styles or animations

### React Entry

#### `src/main.jsx`
- **Purpose**: React DOM entry point
- **Does**: Renders App component to #root
- **One-time file**: Usually doesn't change

### Main App Component

#### `src/App.jsx`
- **Purpose**: Router and state management
- **Manages**:
  - View switching (home vs chat)
  - Chat history state
  - OpenAI API key loading
  - localStorage persistence
- **Edit When**: Changing app structure or adding pages

### Components

#### `StockoLogo.jsx`
- **Type**: Display component
- **Props**: `size` ('sm', 'md', 'lg')
- **Use**: Branding across app
- **Render**: SVG with hexagon badge and chart line

#### `HomePage.jsx`
- **Type**: Page component
- **States**: None (stateless)
- **Callbacks**: `onSuggestionClick()`, `onChatHistoryClick()`
- **Shows**: Logo, 4 cards, input, history button

#### `ChatPage.jsx`
- **Type**: Page component
- **States**: messages, isLoading, error, currentModel
- **Features**: Message streaming, file handling, auto-scroll
- **Children**: ChatMessage, BotResponse, ChatInputBar, TypingIndicator

#### `ChatInputBar.jsx`
- **Type**: Form component
- **States**: message, model, uploadedFile
- **Props**: `onSendMessage()`, `onNewChat()`, `isLoading`
- **Features**: Model selector, file upload, send button

#### `ChatMessage.jsx`
- **Type**: Display component (memoized for performance)
- **Props**: type, content, timestamp
- **Styles**: Different bubbles for user vs bot

#### `BotResponse.jsx`
- **Type**: Complex display component
- **States**: activeTab, expandedRelated
- **Props**: response, isLoading, onRetry, error
- **Tabs**: Answer (with charts, tables, relatedQ) | Sources

#### `StockChart.jsx`
- **Type**: Visualization component
- **Uses**: Recharts library
- **Props**: stockSymbol, data
- **Features**: Line chart, event markers, tooltip

#### `SentimentGauge.jsx`
- **Type**: Visualization component
- **Props**: sentiment, bearishCount, neutralCount, bullishCount
- **Render**: SVG semicircle with needle

#### `ChatHistory.jsx`
- **Type**: Modal component (slide-in panel)
- **Props**: isOpen, onClose, conversations
- **Features**: Overlay, list, delete buttons, clear all

#### `TypingIndicator.jsx`
- **Type**: Loading indicator component
- **Render**: 3 pulsing dots with staggered animation

### Services

#### `openaiService.js`
- **Purpose**: OpenAI API wrapper
- **Functions**:
  - `sendMessageToGPT(message, file, model)` - Streaming
  - `generateMockChartData(symbol)` - Mock data
  - `generateMockSnapshot()` - Mock metrics
  - `parseResponseForChart(text)` - Chart detection
- **Constants**: SYSTEM_PROMPT for financial expertise

---

## 🔄 Component Data Flow

```
App.jsx (State Management)
├── HomePage (View)
│   ├── onSuggestionClick → ChatPage
│   └── onChatHistoryClick → ChatHistory
│
├── ChatPage (Main Chat)
│   ├── ChatMessage (Display)
│   ├── BotResponse (Display)
│   │   ├── StockChart (Conditional)
│   │   ├── SentimentGauge (Conditional)
│   │   └── Related Questions
│   ├── ChatInputBar (Input)
│   │   ├── File Upload Handler
│   │   └── onSendMessage → openaiService
│   └── TypingIndicator (Loading)
│
└── ChatHistory (Sidebar)
    └── Slide-in Panel (Overlay)
```

---

## 📦 Dependency Graph

```
App
├── HomePage
│   └── StockoLogo
├── ChatPage
│   ├── ChatMessage
│   ├── BotResponse
│   │   ├── StockChart (recharts)
│   │   └── SentimentGauge
│   ├── ChatInputBar
│   └── TypingIndicator
├── ChatHistory
└── Services
    └── openaiService (openai SDK)
```

---

## 🎯 Key Files to Edit

### For Customization

| What | Where |
|------|-------|
| Colors | `tailwind.config.js`, `src/index.css` |
| Chat system prompt | `src/services/openaiService.js` |
| Suggestion cards | `src/components/HomePage.jsx` |
| Model selection | `src/components/ChatInputBar.jsx` |
| Chart styling | `src/components/StockChart.jsx` |
| Animations | `src/index.css` |
| Local storage | `src/App.jsx` |

### For Features

| Feature | File |
|---------|------|
| Add new page | Create component in `src/components/`, import in `App.jsx` |
| Connect real API | Update `src/services/openaiService.js` |
| Store in database | Add backend API, update `App.jsx` |
| Add auth | Create login component, wrap App with AuthContext |

---

## 🚀 Build Output

When you run `npm run build`:

```
dist/
├── index.html               # Minified HTML
├── assets/
│   ├── index-[hash].js     # Bundled & minified JS
│   └── index-[hash].css    # Bundled & minified CSS
└── vite.svg                 # Favicon
```

**Size**: ~150-200 KB (gzipped)

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| Total Components | 10 |
| Services | 1 |
| Config Files | 4 |
| Documentation | 5 files |
| Lines of Code | ~2000 |
| External Dependencies | 6 |
| Dev Dependencies | 6 |
| Colors Used | 5 primary + 5 extended |
| Animations | 5+ keyframes |

---

## 🔒 Security Considerations

### Files to Keep Secret
- `.env` (contains API key)
- `.env.local` (local overrides)

### Public Files
- Everything in `src/`
- `dist/` (build output)
- `README.md` and docs

### Best Practices
1. Never commit `.env` to git
2. Rotate API keys regularly
3. Use backend proxy for production
4. Implement rate limiting
5. Add user authentication
6. Monitor API usage

---

## 🆘 Troubleshooting by File

**Problem**: Port already in use
- Edit: `vite.config.js` → change `port`

**Problem**: Wrong colors
- Edit: `tailwind.config.js` → update colors

**Problem**: Chat responses wrong
- Edit: `src/services/openaiService.js` → update SYSTEM_PROMPT

**Problem**: Missing components
- Check: `src/components/index.js` → ensure exports

**Problem**: Styles not loading
- Check: `src/index.css` and `tailwind.config.js`

---

For more details, see:
- [QUICKSTART.md](./QUICKSTART.md) - 2-minute start
- [SETUP.md](./SETUP.md) - Full setup guide
- [FEATURES.md](./FEATURES.md) - Feature documentation
- [README.md](./README.md) - Complete overview

**Happy coding!** 🚀
