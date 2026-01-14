@echo off
REM Setup script for Dr. Akbiplob Portfolio & Appointment System (Windows)
REM This script sets up the development environment

echo 🚀 Setting up Dr. Akbiplob Portfolio ^& Appointment System...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Python and Node.js are installed
echo.

REM Create virtual environment
echo 📦 Creating virtual environment...
if not exist "venv" (
    python -m venv venv
    echo ✅ Virtual environment created
) else (
    echo ⚠️  Virtual environment already exists
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Python dependencies
echo 📥 Installing Python dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt
echo ✅ Python dependencies installed
echo.

REM Setup environment variables
if not exist ".env" (
    echo ⚙️  Creating .env file...
    echo # Django Settings > .env
    echo SECRET_KEY=django-insecure-change-this-in-production >> .env
    echo DEBUG=True >> .env
    echo ALLOWED_HOSTS=localhost,127.0.0.1 >> .env
    echo. >> .env
    echo # Database >> .env
    echo DATABASE_URL=sqlite:///db.sqlite3 >> .env
    echo. >> .env
    echo # API Configuration >> .env
    echo API_URL=http://localhost:8000 >> .env
    echo. >> .env
    echo # Email Configuration (Mailjet) >> .env
    echo MAILJET_API_KEY=your-mailjet-api-key-here >> .env
    echo MAILJET_API_SECRET=your-mailjet-api-secret-here >> .env
    echo. >> .env
    echo # Email Settings >> .env
    echo ADMIN_EMAIL=your-admin-email@example.com >> .env
    echo DEFAULT_FROM_EMAIL=appoinment@drakbiplob.com >> .env
    echo ✅ .env file created
    echo ⚠️  Please update .env file with your actual credentials
) else (
    echo ⚠️  .env file already exists
)
echo.

REM Run migrations
echo 🗄️  Running database migrations...
python manage.py migrate
echo ✅ Database migrations completed
echo.

REM Install frontend dependencies
echo 📥 Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    call npm install
    echo ✅ Frontend dependencies installed
) else (
    echo ⚠️  Frontend dependencies already installed
)
cd ..
echo.

echo ✅ Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update .env file with your actual credentials
echo 2. Create a superuser: python manage.py createsuperuser
echo 3. Run backend: python manage.py runserver
echo 4. Run frontend: cd frontend ^&^& npm run dev
echo.
echo Happy coding! 🎉
pause