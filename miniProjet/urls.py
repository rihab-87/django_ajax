
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from . settings import STATIC_URL,STATIC_ROOT
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name="home"),
    path('formation/', include('formation.urls')),
]+static(STATIC_URL, document_root=STATIC_ROOT)
