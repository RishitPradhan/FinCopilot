# FinCopilot - Premium Financial Intelligence

FinCopilot is a state-of-the-art financial dashboard designed to empower investors with AI-driven insights, sentiment analysis, and educational modules.

## Features

- **Dashboard**: High-level overview of portfolio, financial IQ, and market mood.
- **Learn**: Structured finance courses with interactive quizzes.
- **Predict**: Stock prediction playground comparing user calls against AI reasoning.
- **News Intelligence**: Real-time news sentiment analysis and price correlation mapping.
- **Portfolio Analyzer**: Advanced asset tracking and risk exposure visualization.
- **AI Advisor**: Context-aware chat interface for personalized financial strategy.
- **MetaMask Authentication**: Web3 wallet login with cryptographic signature verification.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui, Zustand, Recharts, Framer Motion, ethers.js.
- **Backend**: Node.js/Express, JWT Authentication, ethers.js for wallet verification.
- **AI Engine**: Python FastAPI, Pydantic, Sentiment Analysis models.

## Quick Start

### 1. Prerequisites
- Node.js installed.
- Python 3.x installed.

### 2. Startup
Run the multi-tier startup script in your terminal (PowerShell):
```powershell
./start-fincopilot.ps1
```

### 3. URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **AI Server**: http://localhost:8000

---

## MetaMask Authentication Flow

1. **User clicks "Connect Wallet"** → Frontend requests `eth_requestAccounts`
2. **MetaMask shows connection popup** → User approves wallet connection
3. **Frontend generates a message** → Includes wallet address and timestamp
4. **User signs the message** → No gas fees, just cryptographic proof
5. **Frontend sends to backend**: `POST /auth/metamask` with address, message, and signature
6. **Backend verifies signature** → Uses `ethers.verifyMessage()` to recover the signing address
7. **Backend creates/finds user** → Auto-creates user with wallet address on first login
8. **JWT token issued** → User is authenticated with a secure token

## Project Structure

```text
/fincopilot
  /frontend     - Next.js application
  /backend      - Express API server
  /ai-server    - Python AI services
  /brain        - Documentation & Task tracking
```

---
*FinCopilot: Elevate Your Investment Intelligence*
