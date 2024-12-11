const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList')
console.log(taskList);

// modifier

const modifyInput = document.getElementById('modifyInput')
const modifyBtn = document.getElementById('modifyBtn')
console.log(modifyBtn);


let tasks = []
window.onload = ()=>{
    getTask()
}
addTaskBtn.addEventListener('click',(event)=>{
    if(taskInput.value==='') return

    const task = taskInput.value.trim()
    tasks.push(task)
    console.log(tasks)
    event.preventDefault()
    createElement(task)
    saveTask(task)

taskInput.value = ''
})

function createElement(task){
    const tr = document.createElement('tr')
    console.log(tr);
    
const td1 = document.createElement('td')
const td2 = document.createElement('td')
const td3 = document.createElement('td')
taskList.appendChild(tr)

tr.appendChild(td1)
tr.appendChild(td2)
tr.appendChild(td3)
const cache = document.createElement('input')
cache.type = 'checkbox'
td1.appendChild(cache)


td2.textContent = task


// creation button modifier
const btnModif = document.createElement('button')
btnModif.textContent = 'update'
btnModif.classList.add('btn','btn-warning','text-white')
td3.appendChild(btnModif)

// button modifier

btnModif.onclick = ()=>{
    modifyInput.value = task
    const misAjour = document.querySelector('.misAjour')
    misAjour.style.display = 'flex'
    
    const Ajouter  = document.querySelector('.Ajouter')
    Ajouter.style.display = 'none'
    // modifierTache(task)
}

// button supprimer
const btnsupp = document.createElement('button')
btnsupp.textContent= 'Supp'
btnsupp.classList.add('btn','btn-danger', 'text-white')
td3.appendChild(btnsupp)
td3.classList.add('d-flex','justify-content-between','align-items-center')

btnsupp.addEventListener('click',()=>{
    supprimerTache(task)
})


// gerer l'etat de la tache
cache.addEventListener('change',()=>{
    gererEtat(cache,td2)
})
}


// fonction supprimer

function supprimerTache(taskDelete){
    let save = JSON.parse(localStorage.getItem('taches'))||[]
    if(!Array.isArray(save)){
        save = []
    }
    const index = save.indexOf(taskDelete)
    save.splice(index,1)
    localStorage.setItem('taches',JSON.stringify(save))
    location.reload()

   
}

// fonction pour gerer l'etat de la tache
function gererEtat(cache,td2,id){
    let save = JSON.parse(localStorage.getItem('taches'))||[]
    if(!Array.isArray(save)){
        save = []
    }
    if(cache.checked){
        td2.style.textDecoration = 'line-through'
        td2.style.color = 'red'
        cache.checked = false
        save.splice(id,1)
    }else{
        td2.style.textDecoration = 'none'
        td2.style.color = 'white'
    }
    
    localStorage.setItem('taches',JSON.stringify(save))
}
// ecoutons la soumission de update
modifyBtn.addEventListener('click',()=>{

    const misAjour = document.querySelector('.misAjour')
    misAjour.style.display = 'none'
    
    const Ajouter  = document.querySelector('.Ajouter')
    Ajouter.style.display = 'flex'
    modifierTache(modifyInput.value)

    // vider le champs
    modifyInput.value = ''
})
// fonction modifier

function modifierTache(taskModif){
    let save = JSON.parse(localStorage.getItem('taches'))||[]
    if(!Array.isArray(save)){
        save = []
    }
  
    
    const index = save.indexOf(taskModif)
    save.splice(index,1,modifyInput.value)
    localStorage.setItem('taches',JSON.stringify(save))
    location.reload()
}



function saveTask(task){
let save = JSON.parse(localStorage.getItem('taches'))||[]
if(!Array.isArray(save)){
    save = []
}
save.push(task)
localStorage.setItem('taches',JSON.stringify(save))
}

// recuperation dans le localStorage

function getTask(){
    let save = JSON.parse(localStorage.getItem('taches'))||[]
    if(!Array.isArray(save)){
        save = []
    }
  save.forEach(element => {
    createElement(element)
  });
}
