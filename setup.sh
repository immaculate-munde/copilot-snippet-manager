#!/bin/bash

echo "🚀 CodeVault AI Setup Script"
echo "=============================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install it first."
    echo "   Ubuntu/Debian: sudo apt-get install postgresql"
    echo "   macOS: brew install postgresql"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your database credentials"
fi

# Create database
echo "📊 Setting up database..."
read -p "Enter PostgreSQL username (default: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -s -p "Enter PostgreSQL password: " DB_PASSWORD
echo ""

export PGPASSWORD=$DB_PASSWORD

# Create database
psql -U $DB_USER -c "CREATE DATABASE codevault;" 2>/dev/null || echo "Database may already exist"

# Run schema
echo "📋 Running database schema..."
psql -U $DB_USER -d codevault -f server/src/models/schema.sql

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd ../client && npm install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  1. Terminal 1: cd server && npm run dev"
echo "  2. Terminal 2: cd client && npm run dev"
echo ""
echo "  Frontend: http://localhost:3000"
echo "  Backend: http://localhost:5000"
