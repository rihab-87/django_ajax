from django.db import models

# Create your models here.
class Formation(models.Model):
    titre=models.CharField(max_length=50, blank=True)
    description=models.TextField( max_length=250 , blank=True)
    durée=models.CharField(max_length=100 , blank=True)

    def __str__(self):
        return self.titre

class Chapitre(models.Model):
    nom_chapitre=models.TextField(max_length=250)
    created=models.DateTimeField(auto_now_add="True", null=True)
    formation=models.ForeignKey(Formation,on_delete=models.CASCADE)
    def __str__(self):
        return self.nom_chapitre

class Meta:
    ordering=("created",)