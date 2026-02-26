#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up Stocko - AI Stock Market Chatbot...\n')

// Check if .env exists
const envPath = path.join(__dirname, '.env')
const envExamplePath = path.join(__dirname, '.env.example')

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath)
    console.log('✅ Created .env file from .env.example')
  } else {
    // Create .env file
    fs.writeFileSync(envPath, 'VITE_OPENAI_API_KEY=your_openai_api_key_here\n')
    console.log('✅ Created .env file')
  }
} else {
  console.log('✅ .env file already exists')
}

// Check if node_modules exists
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('⚠️  Dependencies not installed. Run: npm install')
} else {
  console.log('✅ Dependencies are installed')
}

console.log('\n📋 Next steps:')
console.log('1. Get your OpenAI API key from: https://platform.openai.com/api-keys')
console.log('2. Edit .env file and replace "your_openai_api_key_here" with your actual API key')
console.log('3. Run: npm run dev')
console.log('4. Open: http://localhost:5173')

console.log('\n🎯 Quick commands:')
console.log('• npm install     - Install dependencies')
console.log('• npm run dev     - Start development server')
console.log('• npm run build   - Build for production')
console.log('• npm run preview - Preview production build')

console.log('\n🔐 Security Note:')
console.log('Never commit your .env file with real API keys to version control!')

console.log('\n✨ Stocko is ready! Ask Anything. Ask Stocko.')