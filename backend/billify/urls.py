# billify/urls.py
from django.contrib import admin
from django.urls import path, include
from users.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Admin y auth
    path('admin/', admin.site.urls),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # Obtención de access + refresh
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Solo refresh de access

    # Apps
    path('api/', include('users.urls')),
    path('api/', include('billing.urls')),
    path('api/', include('suppliers.urls')),
]
