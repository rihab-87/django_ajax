from django import forms


from .models import Chapitre, Formation

class AddForm(forms.ModelForm):
    class Meta:
        model=Formation
        
        widgets = {
            'titre': forms.TextInput(attrs={'placeholder': 'titre de formation','class':'form-control'}),
            'description': forms.TextInput(
                attrs={'placeholder': 'description' ,'class':'form-control'}),
            'durée': forms.TextInput(
                attrs={'placeholder': 'durée du formation','class':'form-control'}),
           
        }
        fields=['titre','description','durée']

class AddChap(forms.ModelForm):
    class Meta:
        model=Chapitre
        
        widgets = {
            'nom_chapitre': forms.TextInput(attrs={'placeholder': 'Nom de chapitre ' ,'class':'form-control'}),
            
           
           
        }
        fields=['nom_chapitre']

              