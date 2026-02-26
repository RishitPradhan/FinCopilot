# 📊 Stocko - AI Stock Market Chatbot

A full-stack AI-powered stock market chatbot web application built with React, Vite, Tailwind CSS, and OpenAI GPT-4o. Designed with a professional fintech aesthetic and dark mode theme.

![Version](https://img.shields.io/badge/version-0.0.1-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.0-blue)

## 🎯 Features

### Core Features
- ✨ **AI-Powered Chat** - GPT-4o integration for real-time stock market insights
- 📈 **Stock Charts** - Interactive price charts with key event markers using Recharts
- 📊 **Sentiment Analysis** - Visual gauge showing market sentiment (Bearish/Neutral/Bullish)
- 💼 **File Upload** - Support for PNG, JPG, PDF, PPTX uploads (Vision API compatible)
- 💬 **Chat History** - Persistent conversation history in sidebar
- 🎨 **Dark Mode UI** - Professional fintech design with neon green accents
- ⚡ **Streaming Responses** - Real-time typing effect for GPT responses
- 🔄 **Error Handling** - Graceful error state with retry functionality

### Components
- **Stocko Logo** - Custom SVG logo with hexagonal badge and glowing chart line
- **Stock Chart Component** - Line chart with events, sentiment gauge
- **Sentiment Gauge** - SVG semicircle meter with needle indicator
- **Chat Interface** - Message bubbles with timestamps
- **File Upload** - Drag-drop support with file preview
- **Quick Snapshot** - Stock metrics table (price, change, range, etc.)
- **Key Events** - Time-bound market events with impact analysis
- **Related Questions** - Collapsible related query suggestions

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone or create the project**
```bash
cd stocko
npm install
```

2. **Install dependencies**
```bash
npm install
npm install openai recharts lucide-react
```

3. **Setup environment variables**
```bash
# Copy .env.example to .env
cp .env.example .env

# Add your OpenAI API key
VITE_OPENAI_API_KEY=your_api_key_here
```

4. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
stocko/
├── src/
│   ├── components/
│   │   ├── StockoLogo.jsx           # Logo SVG component
│   │   ├── HomePage.jsx             # Home screen with suggestions
│   │   ├── ChatPage.jsx             # Main chat interface
│   │   ├── ChatInputBar.jsx         # Input with file upload
│   │   ├── BotResponse.jsx          # Structured response display
│   │   ├── ChatMessage.jsx          # Message bubble component
│   │   ├── StockChart.jsx           # Stock price chart
│   │   ├── SentimentGauge.jsx       # Sentiment visualization
│   │   ├── ChatHistory.jsx          # History sidebar panel
│   │   ├── TypingIndicator.jsx      # Loading dots animation
│   │   └── index.js                 # Component exports
│   ├── services/
│   │   └── openaiService.js         # OpenAI API integration
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles & animations
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── .env                             # Environment variables (local)
├── .env.example                     # Example env file
└── README.md                        # This file
```

## 🎨 Design System

### Color Palette
- **Background**: `#0a0a0a` (Dark Black)
- **Primary Accent**: `#00ff88` (Neon Green)
- **Secondary Accent**: `#7c3aed` (Purple)
- **Surface**: `#1a1a1a` (Dark Gray)
- **Text**: `#ffffff` (White)
- **Muted Text**: `#666666` (Medium Gray)

### Typography
- Font Family: Poppins (Google Fonts)
- Headings: Bold (700px)
- Body: Regular (400px)
- Accents: Semibold (600px)

### Components
- **Buttons**: Rounded corners with hover states
- **Inputs**: Dark background with green focus border
- **Cards**: Border accent on hover with glow effect
- **Messages**: Bubble style with diagonal tail
- **Charts**: Dark background with green lines

## 💻 API Integration

### OpenAI API
```javascript
// Environment variable
VITE_OPENAI_API_KEY=your_key_here

// Models supported
- gpt-4o (default)
- gpt-4
- gpt-3.5-turbo

// System Prompt
Custom system prompt for financial analysis expertise
```

### File Upload Support
- **Image Formats**: PNG, JPG/JPEG
- **Document Formats**: PDF, PPTX
- **Max Size**: Browser default
- **Encoding**: Base64 URI for GPT Vision API

## 🔧 Key Features Implementation

### Streaming Responses
```javascript
// Streams GPT responses with typing effect
const stream = await openaiService.sendMessageToGPT(message)
for await (const chunk of stream) {
  // Update UI with chunk
}
```

### File Upload Processing
```javascript
// Convert file to base64
const reader = new FileReader()
reader.readAsDataURL(file)
// Send to GPT Vision API
```

### Chart Generation
```javascript
// Mock data with real timestamps
const data = generateMockChartData(symbol)
// Render with Recharts
<StockChart symbol={symbol} data={data} />
```

### Chat History Persistence
```javascript
// Stored in localStorage
localStorage.setItem('stocko_chat_history', JSON.stringify(conversations))
```

## 🌐 Usage Examples

### Ask a Stock Question
"Identify red flags in my portfolio"
→ Stocko analyzes and returns insights

### Request a Chart
"Plot the price chart of LENSKART with key events marked"
→ Shows interactive chart with event markers

### Upload Analysis
Upload a Q3 presentation → Stocko summarizes it

### Get Sentiment
"How is the lending business of Jio Financial?"
→ Shows sentiment gauge with analysis

## ⚙️ Configuration

### Tailwind CSS
Configured with custom colors extension in `tailwind.config.js`

### Vite
- Port: 5173
- Auto-open on dev start
- React Fast Refresh enabled

### PostCSS
- Tailwind CSS processing
- Autoprefixer for browser compatibility

## 🐛 Error Handling

- **API Errors**: Graceful fallback with retry button
- **File Upload**: Validation for allowed formats
- **Network Issues**: Timeout handling with user feedback
- **Empty Messages**: Input validation before sending

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security Notes

- OpenAI API key stored in `.env` (local only)
- Never commit `.env` file
- Browser-based: API calls directly from frontend
- Consider backend proxy for production

## 🚀 Performance Optimizations

- Code splitting with Vite
- Image optimization
- CSS minification (production build)
- Lazy loading of components
- Debounced chat input

## 📊 Testing

```bash
# Run development server
npm run dev

# Build and preview production
npm run build
npm run preview

# Lint code (if configured)
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 💬 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review component prop specifications

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [OpenAI API](https://platform.openai.com/docs)
- [Recharts](https://recharts.org)

## 🔄 Future Enhancements

- [ ] Real market data integration
- [ ] User authentication
- [ ] Portfolio tracking
- [ ] Alert notifications
- [ ] Advanced charting (candlestick, OHLC)
- [ ] Export functionality (PDF, CSV)
- [ ] Voice input/output
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

---

**Built with ❤️ using React, Vite, and AI**

*Ask Anything. Ask Stocko.* 📈
