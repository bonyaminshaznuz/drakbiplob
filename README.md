# Dr. Akbiplob Portfolio & Appointment System

A full-stack web application built with Django REST Framework (backend) and React (frontend) for Dr. Akbiplob's portfolio website with an integrated appointment booking system.

## 🚀 Features

- **Portfolio Website**: Showcase of Dr. Akbiplob's professional portfolio
- **Appointment Booking System**: Patient appointment management with OTP verification
- **Admin Panel**: Django admin interface for managing content and appointments
- **Email Notifications**: Automated email notifications via Mailjet
- **Responsive Design**: Modern, mobile-friendly UI built with React and Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Django 5.0+**: Web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Database (production)
- **SQLite**: Database (development)
- **Gunicorn**: WSGI HTTP Server
- **WhiteNoise**: Static file serving
- **Mailjet**: Email service

### Frontend
- **React 19**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Routing
- **Tailwind CSS**: Styling
- **Font Awesome**: Icons

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL (optional, for production)
- pip and npm package managers

## 🔧 Installation & Setup

### Quick Setup (Automated)

**For Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

**For Windows:**
```bash
setup.bat
```

The setup script will:
- Create a virtual environment
- Install all Python dependencies
- Create a `.env` file template
- Run database migrations
- Install frontend dependencies

### Manual Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd drakbiplob.com
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables template
# Copy env.example.txt to .env and edit with your settings
copy env.example.txt .env  # Windows
cp env.example.txt .env    # Linux/macOS

# Edit .env file with your settings
# Required variables:
# - SECRET_KEY
# - DEBUG
# - DATABASE_URL (optional, defaults to SQLite)
# - MAILJET_API_KEY
# - MAILJET_API_SECRET
# - ALLOWED_HOSTS
# - API_URL

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file for frontend (if needed)
# VITE_API_URL=http://localhost:8000
```

### 4. Environment Variables

Create a `.env` file in the root directory by copying `env.example.txt`:

**Windows:**
```bash
copy env.example.txt .env
```

**Linux/macOS:**
```bash
cp env.example.txt .env
```

Then edit `.env` with your actual values:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=sqlite:///db.sqlite3
# For PostgreSQL: postgresql://user:password@localhost:5432/dbname

# API
API_URL=http://localhost:8000

# Email (Mailjet)
MAILJET_API_KEY=your-mailjet-api-key
MAILJET_API_SECRET=your-mailjet-api-secret

# Email Settings
ADMIN_EMAIL=your-admin-email@example.com
```

## 🏃 Running the Application

### Development Mode

**Backend (Terminal 1):**
```bash
python manage.py runserver
```
Backend will run on `http://localhost:8000`

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173` (or similar Vite default port)

### Production Mode

**Backend:**
```bash
# Collect static files
python manage.py collectstatic --noinput

# Run with Gunicorn
gunicorn backend.wsgi:application
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the dist/ folder with your preferred web server
```

## 📁 Project Structure

```
drakbiplob.com/
├── backend/              # Django project settings
├── Appointment/          # Appointment booking app
├── Portfolio/            # Portfolio website app
├── frontend/             # React frontend application
├── media/                # User uploaded media files
├── staticfiles/          # Collected static files
├── templates/            # Django templates
├── manage.py             # Django management script
├── requirements.txt      # Python dependencies
├── Procfile              # Heroku deployment config
└── README.md             # This file
```

## 🔐 Security Notes

- Never commit `.env` file to version control
- Use strong `SECRET_KEY` in production
- Set `DEBUG=False` in production
- Configure proper `ALLOWED_HOSTS` for production
- Use HTTPS in production
- Keep dependencies updated

## 📝 Available Scripts

### Backend
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Apply database migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py collectstatic` - Collect static files

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚢 Deployment

The project includes a `Procfile` for Heroku deployment. For other platforms:

1. Set environment variables on your hosting platform
2. Configure database (PostgreSQL recommended for production)
3. Run migrations: `python manage.py migrate`
4. Collect static files: `python manage.py collectstatic`
5. Build frontend: `cd frontend && npm run build`
6. Configure web server (nginx, Apache, etc.) to serve static files and proxy to Django

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

Dr. Akbiplob Portfolio & Appointment System

## 📞 Support

For support, email mdshaznuz@gmail.com

---

**Note**: Make sure to update the `.env` file with your actual credentials before running the application.