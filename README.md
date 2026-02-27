<<<<<<< HEAD
# FinCopilot - Premium Financial Intelligence

FinCopilot is a state-of-the-art financial dashboard designed to empower investors with AI-driven insights, sentiment analysis, and educational modules.

## Features

- **Dashboard**: High-level overview of portfolio, financial IQ, and market mood.
- **Learn**: Structured finance courses with interactive quizzes.
- **Predict**: Stock prediction playground comparing user calls against AI reasoning.
- **News Intelligence**: Real-time news sentiment analysis and price correlation mapping.
- **Portfolio Analyzer**: Advanced asset tracking and risk exposure visualization.
- **AI Advisor**: Context-aware chat interface for personalized financial strategy.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui, Zustand, Recharts, Framer Motion.
- **Backend**: Node.js/Express, JWT Authentication.
- **AI Engine**: Python FastAPI, Pydantic, Sentiment Analysis models.

## Quick Start

### 1. Prerequisities
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
=======
# MetaMask Authentication for FinCopilot

This repository contains a minimal implementation of MetaMask (Web3) authentication for the FinCopilot application.

## Features

- **MetaMask Wallet Connection**: Users can connect their Ethereum wallets using MetaMask
- **Cryptographic Signature Verification**: Messages are signed client-side and verified server-side using ethers.js
- **JWT Authentication**: Secure JWT tokens issued after wallet verification
- **Auto User Creation**: First-time wallet users are automatically created in the database
- **Multi-Auth Support**: Supports traditional email/password login and MetaMask wallet login

## Architecture

### Frontend (Next.js + TypeScript)
- `src/hooks/useMetaMask.ts` - Custom React hook for MetaMask wallet interaction
- Handles wallet connection, message signing, and backend communication

### Backend (Express.js + Node.js)
- `src/controllers/auth.controller.js` - Authentication controller with MetaMask verification
- `src/models/User.js` - MongoDB User model with wallet address support
- `src/routes/auth.routes.js` - Auth routes for signup, login, and MetaMask authentication

## Installation

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/fincopilot
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Running the Application

### Backend
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm run dev
```
Application runs on `http://localhost:3000`

## MetaMask Authentication Flow

1. **User clicks "Connect Wallet"** → Frontend requests `eth_requestAccounts`
2. **MetaMask shows connection popup** → User approves wallet connection
3. **Frontend generates a message** → Includes wallet address and timestamp
4. **User signs the message** → No gas fees, just cryptographic proof
5. **Frontend sends to backend**: `POST /auth/metamask` with address, message, and signature
6. **Backend verifies signature** → Uses `ethers.verifyMessage()` to recover the signing address
7. **Backend creates/finds user** → Auto-creates user with wallet address on first login
8. **JWT token issued** → User is authenticated with a secure token

## API Endpoints

### POST `/auth/metamask`
Authenticate using MetaMask wallet signature

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f...",
  "message": "Welcome to FinCopilot!...",
  "signature": "0x3045022100..."
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Wallet 0x742d…595f",
    "email": "0x742d35cc6634c0532925a3b844bc9e7595f...@wallet.eth",
    "walletAddress": "0x742d35cc6634c0532925a3b844bc9e7595f...",
    "riskAppetite": "moderate"
  }
}
```

## Security Considerations

- ✅ Message signing happens client-side (private key never leaves the wallet)
- ✅ Backend verifies signatures cryptographically
- ✅ JWT tokens have 7-day expiration
- ✅ Wallet addresses stored as lowercase for consistency
- ✅ Support for wallet-only accounts (no password required)

## Technology Stack

**Frontend:**
- Next.js 14
- TypeScript
- ethers.js v6

**Backend:**
- Express.js
- MongoDB
- jsonwebtoken
- ethers.js v6

## License

MIT
>>>>>>> a3b3f3aff75fdca43ff68b01c3cac0cdbc2da4a8
