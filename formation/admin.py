from django.contrib import admin
from .models import Formation
from .models import Chapitre 
# Register your models here.
class FormationAdmin(admin.ModelAdmin):
    fields    = ('titre', 'description','durée')

    #list of fields to display in django admin
    list_display = ['titre', 'description','durée']


    #if you want django admin to show the search bar, just add this line
    search_fields = ['titre', 'description','durée']

    #to define model data list ordering
    ordering = ('titre', 'description','durée')
admin.site.register(Formation,FormationAdmin)
admin.site.register(Chapitre)