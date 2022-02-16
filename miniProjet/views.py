from django.http import HttpResponse
from formation.models import Formation,Chapitre
from formation.forms import AddChap, AddForm
from django.shortcuts import render

def home(request):
    formF=AddForm()
    formC=AddChap()
    formation=Formation.objects.get()
    chapitre=Chapitre.objects.all()
    context={'formF':formF,'formation':formation,'formC':formC,'chapitre':chapitre,}
    return render(request,"home.html",context)

