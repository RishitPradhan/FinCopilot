# 🎯 Stocko Features Guide

Complete documentation of all Stocko features and how to use them.

## Table of Contents
1. [Home Screen](#home-screen)
2. [Chat Interface](#chat-interface)
3. [File Upload](#file-upload)
4. [Stock Charts](#stock-charts)
5. [Sentiment Analysis](#sentiment-analysis)
6. [Chat History](#chat-history)
7. [Advanced Features](#advanced-features)

---

## 🏠 Home Screen

First screen when you launch Stocko.

### Components

#### Logo & Tagline
- **Stocko Logo**: SVG hexagonal badge with upward green chart line
- **Tagline**: "Ask Anything. Ask Stocko."
- **Glow Effect**: Green neon glow on chart line

#### Suggestion Cards (2x2 Grid)
Four quick-start options for common queries:

1. **"Identify red flags in my portfolio."**
   - For portfolio analysis and risk identification
   - ✅ Shows warnings and concerns
   - 📊 Highlights risky holdings

2. **"Summarize Q3 PPT of DMART in 7 bullet points."**
   - For document summarization
   - 📄 Works with uploaded presentations
   - ⚡ Quick key takeaways

3. **"Plot the price chart of LENSKART with key events marked."**
   - For stock visualization
   - 📈 Interactive price charts
   - ⚡ Orange event markers

4. **"How is the lending biz of Jio Financial doing in Q3?"**
   - Sector and business analysis
   - 📊 Financial metrics
   - 💡 Industry insights

**Hover Effects**:
- Card border turns green
- Right arrow icon appears
- Cursor changes to pointer
- Subtle glow effect

#### Chat Input Bar
- Dark rounded input box
- Placeholder: "Ask any question to Stocko"
- Press Enter to send
- Shift+Enter for multi-line

#### Top Right: Chat History Button
- Opens slide-in panel
- Shows previous conversations
- Sorted by most recent
- Delete individual conversations or clear all

#### Bottom Right: Stocko Guide Link
- Purple link text
- Leads to help documentation

---

## 💬 Chat Interface

Main interaction screen after starting a conversation.

### Message Layout

#### User Messages
- **Position**: Right-aligned
- **Style**: Purple bubble with gradient background
- **Icon**: User avatar/icon
- **Tail**: Bottom-right corner
- **Timestamp**: Below message

#### Bot Messages (Stocko)
- **Position**: Left-aligned
- **Style**: Green border, darker background
- **Icon**: Stocko chat icon
- **Tail**: Bottom-left corner
- **Timestamp**: Below message

#### Typing Indicator
- Three pulsing dots in sequence
- Shows while Stocko is thinking
- Smooth animation
- Green color matching theme

---

## 📄 Bot Response Structure

When Stocko responds, you get structured information across tabs.

### Answer Tab

#### Main Text
Formatted markdown response with:
- Clear, concise language
- Bold key points
- Bullet lists
- Numbered steps

#### Stock Chart (When Applicable)
Shows when query mentions price, chart, or visualization:

**Features**:
- ✅ Green line showing price over time
- ✅ Dark background matching theme
- ✅ Orange lightning bolt ⚡ for key events
- ✅ Hover tooltip showing price and time
- ✅ X and Y axis labels
- ✅ Smooth animations

**Components**:
- Time range on X-axis
- Price on Y-axis
- Volume/indicators available
- Toggle buttons: "Price" | "PE Ratio"
- Download button for chart

#### Quick Snapshot Table
Appears for stock queries:

| Metric | Value |
|--------|-------|
| Last Price | $280.50 |
| Day Change | +$5.25 |
| Day Change % | +1.91% |
| Day Range | $270 - $285 |
| 52W High | $350.00 |
| 52W Low | $210.00 |

Colors:
- Green text for positive changes
- Red text for negative changes
- Gray for neutral metrics

#### Sentiment Gauge
SVG semicircle meter showing market sentiment:

**Layout**:
```
        Neutral
           |
Bearish -> | <- Bullish
    (red) (orange) (green)
```

**Displays**:
- Needle pointing to current sentiment
- Bearish count (left)
- Neutral count (center)
- Bullish count (right)
- "View detailed analysis" link

#### Key Events Table
Shows market-moving events with timestamps:

| Date | Event | Why it Matters |
|------|-------|---|
| 2024-01-15 | Q3 Results | Positive earnings beat, strong revenue growth |
| 2024-02-01 | CEO Announcement | New product launch expected to drive growth |

**Styling**:
- Alternating row backgrounds
- Hover highlight effect
- Event icon indicators
- Sortable columns (future)

#### Related Questions
5 collapsible items with + icon:

- Expand/collapse on click
- Common follow-up questions
- Chain of thought analysis
- Clickable to get quick answers
- Examples:
  - "What are the key metrics for this stock?"
  - "How does this compare to competitors?"
  - "What are the analyst ratings?"
  - "What is the dividend yield?"
  - "What are the risks to watch?"

### Sources Tab

List of references used for analysis:

**Each source shows**:
- 📎 External link icon
- Title (clickable)
- URL
- Source website domain
- Hover effect reveals icon

**Example sources**:
- NSE India Official
- BSE India Official
- Financial Reports (Moneycontrol)
- Bloomberg (mock)
- Reuters (mock)

---

## 📤 File Upload

Attach documents for analysis (e.g., Q3 reports, presentations).

### How to Upload

1. **Click paperclip icon** in chat input
2. **Select file** from your computer
3. **File preview appears** showing:
   - File name
   - File icon
   - X button to remove
4. **Type your question** about the file
5. **Send message**

### Supported Formats
- ✅ **Images**: PNG, JPG, JPEG
- ✅ **Documents**: PDF, PPTX
- ❌ **Not supported**: DOCX, XLS, TXT (directly - ask Stocko instead)

### File Processing
- Converts file to base64
- Sends to GPT Vision API
- Processes along with text question
- Supports multi-file analysis (chain requests)

### Example Usage
```
1. Upload: "DMART_Q3_Presentation.pptx"
2. Ask: "Summarize this in 7 bullet points"
3. Stocko analyzes and responds

OR

1. Upload: "Stock_Portfolio.pdf"
2. Ask: "Identify red flags in this portfolio"
3. Stocko analyzes and provides warnings
```

---

## 📈 Stock Charts

Interactive visualization of stock prices with events and metrics.

### Chart Components

**Main Chart Area**:
- Line chart showing price over time
- Green line (#00ff88) for price
- Dark background (#0a0a0a)
- Smooth animations on load
- Responsive sizing

**Event Markers**:
- Orange lightning bolt ⚡ symbols
- Positioned at key event times
- Hoverable for event details
- Color-coded by impact

**Axis Information**:
- X-axis: Time (9:30, 10:00, etc.)
- Y-axis: Stock price (₹)
- Grid lines for easy reference
- Labeled ticks

**Interactive Features**:
- 🖱️ Hover for tooltip
- 📊 No pan/zoom (simplified)
- 📥 Download button
- 🔄 Toggle indicators

### Toggles (Future)
```
[ Price ] [ PE Ratio ] [ Volume ]
```

### Download
- Arrow down icon button
- Downloads chart as PNG
- Includes title and legend
- High resolution

---

## 😊 Sentiment Analysis

Visual representation of market sentiment for a stock.

### Gauge Display

**Visual Elements**:
- SVG semicircle meter
- Color-coded zones:
  - 🔴 Red zone = Bearish (left)
  - 🟠 Orange zone = Neutral (center)
  - 🟢 Green zone = Bullish (right)
- Animated needle pointing to current level
- Smooth transitions

### Interpretation

**Bearish** (Left):
- Negative outlook
- Red color (#ff4444)
- Shows pessimistic signals
- Risk of decline

**Neutral** (Center):
- Mixed signals
- Orange color (#ffaa00)
- Balanced risk/reward
- No clear direction

**Bullish** (Right):
- Positive outlook
- Green color (#00ff88)
- Growth potential
- Upside momentum

### Data Display
Below the gauge shows counts:
```
Bearish: 2    Neutral: 5    Bullish: 8
```

### Detailed Analysis Link
"View detailed analysis" link below reveals:
- Bull/bear call breakdown
- Supporting evidence
- Risk factors
- Price targets (estimated)

---

## 🕒 Chat History

Persistent conversation storage and management.

### Slide-in Panel

**Location**: Right side of screen
- Slides in from right edge
- Dark theme matching app
- Semi-transparent overlay closes panel
- Width: 384px (fixed)
- Height: Full screen

### Header
- Title: "Chat History"
- Close button (X icon)
- No back button (direct close)

### Conversation List

Each item shows:
- **Timestamp**: Date and time (e.g., "Feb 26, 2024 10:30 AM")
- **First message**: First few words of user's first query (truncated)
- **Message count**: Number of messages (e.g., "5 messages")
- **Delete button**: Trash icon on hover
- **Hover effect**: Border changes to green

### Using History
1. Click a conversation to load it (future feature)
2. Hover to see delete option
3. Click delete to remove
4. "Clear All" button removes all conversations

### Local Storage
- Stored in browser's localStorage
- Persists across sessions
- Up to browser's storage limit
- Can be exported/imported (future)

---

## ⚙️ Model Selection

Choose which AI model to use for responses.

### Available Models
Located in chat input bar, left side:

1. **GPT-4o** ⭐ (Default)
   - Most advanced
   - Best for complex analysis
   - Slightly slower
   - Higher cost

2. **GPT-4**
   - Strong reasoning
   - Good for finance
   - Moderate speed
   - Medium cost

3. **GPT-3.5-turbo**
   - Fast responses
   - Good for simple queries
   - Lowest cost
   - Adequate for basic analysis

### How to Change
1. Click dropdown in input bar
2. Select desired model
3. Next message uses that model
4. Selection persists for session

---

## 🎮 Advanced Features

### Keyboard Shortcuts
- **Enter**: Send message
- **Shift+Enter**: New line in input
- **Ctrl+K**: Focus search (browser feature)

### New Chat Button
- Middle of input bar
- Starts fresh conversation
- Clears current messages
- Returns to home screen option

### Stocko Guide
- Bottom right link (purple)
- Opens help documentation
- External link to docs site
- Also available in input footer

### Retry Button
- Appears on error messages
- Red background
- Retries last failed query
- Helps recover from API issues

### Scroll to Bottom
- Floating button (bottom right)
- Appears when scrolled up
- Smooth auto-scroll animation
- Only shows when needed

### Typing Indicator
- Three pulsing dots
- Shows response generation
- Removed when response arrives
- Prevents user confusion

---

## 🎨 Visual Polish

### Animations
- **Fade-in**: Messages appear smoothly
- **Slide-up**: Messages slide from bottom
- **Pulse**: Loading indicators
- **Glow**: Border highlights on hover
- **Transitions**: 300ms default duration

### Color States
- **Hover**: Border becomes green, text highlights
- **Focus**: Input gets neon green outline
- **Active**: Purple accent for selected items
- **Disabled**: Gray and reduced opacity

### Accessibility
- Clear contrast ratios
- Focus indicators visible
- Keyboard navigation supported
- Screen reader friendly (semantic HTML)

---

## 🚀 Performance Tips

1. **Start with simple queries** to test setup
2. **Use specific stock symbols** for better charts
3. **Upload documents under 20MB** for faster processing
4. **Monitor API usage** in OpenAI dashboard
5. **Clear old chats** to save storage space
6. **Use GPT-3.5-turbo** for quick questions

---

## ❓ Common Questions

**Q: Can I export conversations?**
A: Currently saved in localStorage only. Manual copy/paste recommended.

**Q: Do you support real-time stock prices?**
A: Mock data in demo. Integrate with Yahoo Finance/Alpha Vantage for real data.

**Q: Can I upload multiple files at once?**
A: Currently single file per message. Upload again for another file.

**Q: What's the API cost?**
A: Depends on OpenAI plan. Check [openai.com/pricing](https://openai.com/pricing)

**Q: Is my data private?**
A: Data sent to OpenAI per their privacy policy. Don't share sensitive info.

**Q: Can I use this commercially?**
A: Check OpenAI API terms and this project's license.

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Chart not showing | Query must mention "chart", "price", or "plot" |
| File upload fails | Check file size < 20MB and format is PNG/JPG/PDF/PPTX |
| Sentiment gauge missing | Stock queries only; generic questions won't show it |
| History empty | Clear browser cache or check localStorage |
| Slow responses | May be API rate limiting or network issue |

---

**Next**: Check [SETUP.md](./SETUP.md) to get started!

*All features available in dark mode with professional fintech aesthetic.* 🚀📈
