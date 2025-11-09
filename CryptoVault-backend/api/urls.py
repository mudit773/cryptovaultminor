from django.urls import path
from .views import FileUploadView # <<< FIX: REMOVE FileDownloadView
from .views import CustomAuthToken
from .views import UserRegistrationView
urlpatterns = [
    # 1. Upload and List Files (GET/POST)
    path('uploadfiles/', FileUploadView.as_view(), name='file-upload-list'),
    path('login/', CustomAuthToken.as_view(), name='api_login'),
    # 🛑 FIX: REMOVE this path entirely since FileDownloadView is gone!
    # path('download/<int:pk>/', FileDownloadView.as_view(), name='file-download'), 
    path('register/', UserRegistrationView.as_view(), name='api_register'),
]