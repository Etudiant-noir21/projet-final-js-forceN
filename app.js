// form ajouter tache
const form_ajout = document.getElementById('myForm_ajout')
const inputAjout = document.getElementById('InputTask')
const btn_ajout = document.getElementById('btn_ajout')

// table pour enregistrer les taches 

let tasks = []

// ecoutons la soumission
btn_ajout.addEventListener('click',function(event){

    if(inputAjout.value === '') return
        event.preventDefault()
        const task = inputAjout.value
        tasks.push(task)
        // console.log(task)
        
        createElements(task)

    inputAjout.value = ''

})

// fonction d'ajout d'element

function createElements(task){
    const listTask = document.getElementById('listTask'); // Récupérer l'élément <ul> de la page

    const li = document.createElement('li');  // Créer un nouvel élément <li>
    li.classList.add('list-group-item');       // Ajouter la classe CSS pour la mise en forme

    li.textContent = task;                    // Ajouter le contenu de la tâche
console.log(task);
    listTask.appendChild(li);                 // Ajouter le nouvel élément <li> à la liste

    console.log('Tâche ajoutée :', li); 

// cache a cocher
const cache = document.createElement('input')
cache.type = 'checkbox'
cache.classList.add('me-1')
li.appendChild(cache)

// span pour contenir les taches
const span = document.createElement('span')
span.textContent= task
li.appendChild(span)
// console.log(li);


// button suprimer
const btnSupp = document.createElement('button')
btnSupp.textContent = 'supprimer'
btnSupp.classList.add('btn','btn-danger','text-white')
li.appendChild(btnSupp)

btnSupp.onclick =()=>{
supprimerTache(task)
}


}

// fonction supprimer

function supprimerTache(taskSupp){
    const listTask = document.getElementById('listTask')
    const index = tasks.indexOf(taskSupp)

    // verifions si la tache existe dans le tableau
    if(index !== -1){
        // supprimer la tache du tableau de cette index
        tasks.splice(index,1)
        
        // supprimons l'element li dans correspondant
        listTask.children[index].remove()

    }
}

// local storage

function saveDonner(){
    let save = JSON.parse(localStorage.getItem('taches'))||[]
    
    if(!Array.isArray(save)){
         save=[]
    }
    save.push(tasks)

    localStorage.setItem('taches',JSON.stringify(save))
}