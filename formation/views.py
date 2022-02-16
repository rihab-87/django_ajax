from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from miniProjet.views import home
from formation.models import Chapitre, Formation
from . forms import AddForm,AddChap
from django.core import serializers



# def load_formation(request):
#     formF=AddForm()
#     formC=AddChap()
   
#     formation=Formation.objects.all()
#     chapitre=Chapitre.objects.all()
#     context={'formation':formation,'chapitre':chapitre, 'formF':formF,'formC':formC}
#     return render(request,"home.html",context)

def add_chapitre(request,id): 
    if request.is_ajax():
        form=AddChap(request.POST)
        formation=Formation.objects.filter(pk=id)
        if form.is_valid():
            Chap=Chapitre.objects.create(nom_chapitre=request.POST['nom_chapitre'],formation=formation[0])
            Chap.save()
    return JsonResponse({'nom_chapitre':Chap.nom_chapitre, 'id':Chap.id})


def edit_chapitre(request,id):
    chap_à_editer=Chapitre.objects.get(pk=id)
    form=AddChap(request.POST,instance=chap_à_editer)
    if form.is_valid():
        form.save()
    return JsonResponse({'nom_chapitre':chap_à_editer.nom_chapitre, 'id':id,})

def supprimer_chapitre(request,id):
    chap_à_supp=Chapitre.objects.get(pk=id) 
    chap_à_supp.delete()
    return JsonResponse({'id':id,})

