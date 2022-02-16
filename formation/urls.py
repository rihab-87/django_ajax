from django.urls import path
from . import views
urlpatterns = [
    
    # path('', views.load_formation, name="load_formation"),
    path('addchap/<str:id>/', views.add_chapitre, name="add_chapitre"),
    path('editchap/<str:id>/', views.edit_chapitre, name="edit_chapitre"),
    path('supprimer_chap/<str:id>/', views.supprimer_chapitre, name="supprimer_chapitre"),
   
   
]
