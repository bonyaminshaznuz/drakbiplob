#!/bin/bash
# Setup script for Dr. Akbiplob Portfolio & Appointment System
# This script sets up the development environment

set -e

echo "🚀 Setting up Dr. Akbiplob Portfolio & Appointment System..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Python and Node.js are installed"
echo ""

# Create virtual environment
echo "📦 Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Virtual environment created"
else
    echo "⚠️  Virtual environment already exists"
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📥 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
echo "✅ Python dependencies installed"
echo ""

# Setup environment variables
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from template..."
    cat > .env << EOF
# Django Settings
SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=sqlite:///db.sqlite3

# API Configuration
API_URL=http://localhost:8000

# Email Configuration (Mailjet)
MAILJET_API_KEY=your-mailjet-api-key-here
MAILJET_API_SECRET=your-mailjet-api-secret-here

# Email Settings
ADMIN_EMAIL=your-admin-email@example.com
DEFAULT_FROM_EMAIL=appoinment@drakbiplob.com
EOF
    echo "✅ .env file created"
    echo "⚠️  Please update .env file with your actual credentials"
else
    echo "⚠️  .env file already exists"
fi
echo ""

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py migrate
echo "✅ Database migrations completed"
echo ""

# Install frontend dependencies
echo "📥 Installing frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies already installed"
fi
cd ..
echo ""

echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your actual credentials"
echo "2. Create a superuser: python manage.py createsuperuser"
echo "3. Run backend: python manage.py runserver"
echo "4. Run frontend: cd frontend && npm run dev"
echo ""
echo "Happy coding! 🎉"