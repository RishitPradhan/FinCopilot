# ⚡ Stocko Quick Start (2 Minutes)

The absolute fastest way to run Stocko.

## 1️⃣ Get Your API Key (1 minute)

1. Go to: https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)
4. **Save it** - you'll need it next

## 2️⃣ Install & Configure (1 minute)

```bash
# Navigate to project
cd c:\Users\KIIT0001\Desktop\codenexus

# Install packages
npm install

# Open .env file and add your key:
VITE_OPENAI_API_KEY=sk-your-key-here
```

That's it!

## 3️⃣ Run It

```bash
npm run dev
```

**Browser opens automatically to** → `http://localhost:5173`

## 4️⃣ Try It

Click any suggestion card or type a question:
- "Identify red flags in my portfolio"
- "Plot LENSKART price chart"
- "What's trending in fintech?"

## ✅ You're Done!

Chatting with Stocko now! 🚀

---

## 🆘 Quick Fixes

**Port already in use?**
```bash
npm run dev -- --port 5174
```

**Module errors?**
```bash
npm install
npm run dev
```

**API key error?**
- Check `.env` file has your key
- No spaces around the `=`
- Key starts with `sk-`

---

## 📖 Full Guides

- **Features**: See [FEATURES.md](./FEATURES.md)
- **Detailed Setup**: See [SETUP.md](./SETUP.md)
- **Project Info**: See [README.md](./README.md)

---

**That's all! Happy analyzing!** 📈
