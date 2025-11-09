from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR is the 'backend' folder
BASE_DIR = Path(__file__).resolve().parent
MEDIA_ROOT = BASE_DIR.parent / 'media' 
MEDIA_URL = '/media/'
# --- Path Calculation FIX ---
# Go up two levels to ProjectRoot/
PROJECT_ROOT = BASE_DIR.parent.parent

# The path to the built frontend files
FRONTEND_DIST_DIR = PROJECT_ROOT / 'CryptoVault'/ 'dist'

# 🛑 CRITICAL DEBUG STEP: Check the calculated path
print(f"\n--- DEBUG PATH CHECK ---")
print(f"Project Root (2 up): {PROJECT_ROOT}")
print(f"Frontend Dist Dir: {FRONTEND_DIST_DIR}")
print(f"------------------------\n")

# -------------------------------------------------------------
# 🎯 CORE CONFIGURATION
# -------------------------------------------------------------

SECRET_KEY = 'django-insecure-=b+@@!^crnxvo3#dx(bi_07w@(%3)onzqkffsdl&(-bzk+(3_5'
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party Apps
    'rest_framework',
    'corsheaders', 
    'rest_framework.authtoken',
    # Your App
    'api',
]
 

# 🛑 CRITICAL DEBUG LINE
print(f"*** DEBUG MEDIA ROOT: {MEDIA_ROOT}")

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware', # MUST be placed high up
    'django.contrib.sessions.middleware.SessionMiddleware', 
    'django.middleware.common.CommonMiddleware', 
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

# -------------------------------------------------------------
# 🎯 TEMPLATES (Serving index.html)
# -------------------------------------------------------------

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        
        # This is where Django looks for index.html
        'DIRS': [FRONTEND_DIST_DIR], 
        
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# -------------------------------------------------------------
# 🎯 STATIC FILES (Serving CSS, JS, Images)
# -------------------------------------------------------------


STATIC_URL = '/static/'
# STATICFILES_DIRS must also point to the 'dist' folder
STATICFILES_DIRS = [
    FRONTEND_DIST_DIR,
]

# -------------------------------------------------------------
# 🎯 DRF & CORS (unchanged)
# -------------------------------------------------------------

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    )
}

CORS_ALLOW_ALL_ORIGINS = True 

# -------------------------------------------------------------
# 🎯 DATABASE & DEFAULTS (unchanged)
# -------------------------------------------------------------

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# File: settings.py

# ... (Existing settings)
