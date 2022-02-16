const csrf = document.getElementsByName("csrfmiddlewaretoken");
const alertbox = document.getElementById("alert_id");
const nom_chapitre = document.getElementById("id_nom_chapitre");
const bloc_table = document.getElementById("bloc_table");
buttons = document.querySelectorAll('.addbutton');
console.log(buttons);
//////ajouter chapitre//////////////

buttons.forEach((btn) => {

 btn.addEventListener("click", (e) => {
  id_btn = btn.getAttribute("id");
  console.log("clickeeddd");
  console.log(id_btn);
  const id = id_btn.replace("add", "");
  const add_bloc = `add_bloc${id}`;
  console.log(add_bloc);
  // const tbody_bloc_id = `tbody_${id}`;
  const tbody_bloc = document.getElementById("tbody_formation");
  bloc_form = document.getElementById(`${add_bloc}`);
  console.log(bloc_form);
  bloc_form.classList.toggle("add_bloc_hidden");
  form = document.getElementById("form_id");
  console.log(form);
  const submit_btn = document.getElementById("submit_btn");

  submit_btn.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      console.log("' clickedd am here");
      bloc_form.classList.add("add_bloc_hidden");

      $.ajax({
        type: "post",
        url: "formation/addchap/" + id + "/",
        data: {
          csrfmiddlewaretoken: csrf[0].value,
          nom_chapitre: nom_chapitre.value,
          id: id,
        },
        cache: false,
        success: (response) => {
          console.log(response);
          bloc_table.insertAdjacentHTML(
            "afterbegin",`<div class="modal fade" id="delete_Modal${response.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Supprimer</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div style=" display:flex;justify-content: space-around;">
                  <h6> Etes-vous-sur de  supprimer  le chapitre <h5 id="modal_chap_sup${response.id}"> ""</h5> <h6>?</h6></h6> </div>
                 <form id="delete_form${response.id}">
                 
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"> Fermer</button>
                    <button  type="submit"  id="btn_sup${response.id} "class="btn btn-danger">Oui</button>
                  </div>
                </form>
                </div>
               
              </div>
            </div>
          </div>`)


          tbody_bloc.insertAdjacentHTML(
            "afterbegin",
            ` 
           <tr  id="row_chap${response.id}" class="draggable" draggable="true">
           
           <td class="titre_chap_style"> 
             
               <div id="edit_bloc${response.id}" class="add_bloc_hidden " >
                 
                 <form  id="form_${response.id}" method="POST" style="display:flex;justify-content:center" >
                   
                  <input  placeholder="edit chapitre" id="chap${response.id}" class="form-control"/>
                   <input
                   type="submit"
                   class="btn button_style"
                   value="save"
                   form-inline
                   /> 
                 </form>
               </div>
            
               <h5 id="nom_chap${response.id}">${response.nom_chapitre}</h5>
           </td> 
          
           <td class="edit_supp_style">
             <button id="edit${response.id}" class="editbutton"  ></button>
             <button id="delete${response.id}" class="deletebutton" data-bs-toggle="modal" data-bs-target="#delete_Modal${response.id}"> </button>
            </td>
         </tr>
         `
          );
          handelAlert(
            "success",
            ` un nouveau chapitre "${response.nom_chapitre}" est ajouté `
          );
          nom_chapitre.value = "";
        },

        error: (error) => {
          handelAlert("danger", ` l'ajout d'un nouveau chapitre est echoué`);
        },
      });
    },
    { once: true }
  );
});
})
////////////////edit chapitre////////

document
  .getElementById("tbody_formation")
  .addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "BUTTON") {
      console.log( "button trouvé",e.target)
      var classes = e.target.className.split(" ");
      if (classes) {
        for (var x = 0; x < classes.length; x++) {
          if (classes[x] == "editbutton") {
            
            console.log(e.target.id);
            const id_btn = e.target.id;
            const id = id_btn.replace("edit", "");
            const edit_bloc = `edit_bloc${id}`;
            const chp_form = `chap${id}`;
            const form_edit_id = `form_${id}`;
            const titre_chap_id = `nom_chap${id}`;
            var chap_form_content = document.getElementById(`${chp_form}`);
            var titre_chap = document.getElementById(`${titre_chap_id}`);
            titre_chap.classList.toggle("add_bloc_hidden");
            bloc_form_edit = document.getElementById(`${edit_bloc}`);
            chap_form_content.value = titre_chap.innerText;
            bloc_form_edit.classList.toggle("add_bloc_hidden");
            form = document.getElementById(`${form_edit_id}`);
          
            form.addEventListener(
              "submit",
              (e) => {
                e.preventDefault();
                bloc_form_edit.classList.add("add_bloc_hidden");
                titre_chap.classList.remove("add_bloc_hidden");

                $.ajax({
                  type: "post",
                  url: "formation/editchap/" + id + "/",
                  data: {
                    csrfmiddlewaretoken: csrf[0].value,
                    nom_chapitre: chap_form_content.value,
                    id: id,
                  },
                  cache: false,
                  success: (response) => {
                    console.log(response);
                    titre_chap.innerText = response.nom_chapitre;
                    handelAlert(
                      "success",
                      ` Le chapitre  "${response.nom_chapitre}" est edité`
                    );
                  },
                  error: (error) => {
                    handelAlert(
                      "danger",
                      ` l'édition  du chapitre "${chap_form_content.value}" est échoué`
                    );
                  },
                });
              },
              { once: true }
            );
          }
        }
      }
    }
  });

//////////// supprimer chapitre///////////

document
  .getElementById("tbody_formation")
  .addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "BUTTON") {
      var classes = e.target.className.split(" ");
      if (classes) {
        for (var x = 0; x < classes.length; x++) {
          if (classes[x] == "deletebutton") {
            const id_btn_supprimer = e.target.id;
            const id = id_btn_supprimer.replace("delete", "");
            const row_chapitre_id = `row_chap${id}`;
            const row_chapitre = document.getElementById(`${row_chapitre_id}`);
            const modal_chap_sup = document.getElementById(
              `modal_chap_sup${id}`
            );
            const nom_chapitre_supprimé = document.getElementById(
              `nom_chap${id}`
            );
             modal_chap_sup.innerText = nom_chapitre_supprimé.innerText;
            const delete_form = document.getElementById(`delete_form${id}`);
            console.log(modal_chap_sup);
            console.log(nom_chapitre_supprimé.innerText);
            const btn_sup_confirm = document.getElementById(`btn_sup${id}`);

            delete_form.addEventListener("submit", (e) => {
              e.preventDefault();
              $.ajax({
                type: "post",
                url: "formation/supprimer_chap/" + id + "/",
                data: {
                  csrfmiddlewaretoken: csrf[0].value,
                  id: id,
                },
                cache: false,
                success: (response) => {
                  row_chapitre.remove();

                  handelAlert(
                    "success",
                    ` Le chapitre  ${nom_chapitre_supprimé.innerText} est supprimé`
                  );
                },
                error: (error) => {
                  const nom_chapitre_supprimé = document.getElementById(
                    `nom_chap${id}`
                  );
                  handelAlert(
                    "danger",
                    ` La suppression du chapitre  "${nom_chapitre_supprimé.innerText}" est échoué`
                  );
                },
              });
            });
          }
        }
      }
    }
  });
/////////////Alert function
////
function handelAlert(type, message) {
  alertbox.innerHTML = `<div class="alert alert-${type}" role="alert" style="display:flex;justify-content:space-around;flex-direction:wrap;">
 <h5 style="text_align:center;word-break:break-word"> ${message}</h5>
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
}
