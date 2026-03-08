const user = JSON.parse(localStorage.getItem("currentUser"));

if(!user){
window.location.href = "login.html";
}

let usuarioActual = null;


function login(){

usuarioActual = document.getElementById("loginUser").value;

document.getElementById("currentUser").innerText = usuarioActual;

document.getElementById("loginView").classList.add("hidden");

document.getElementById("appView").classList.remove("hidden");

cargarTareas();

}

function logout(){

localStorage.removeItem("currentUser");

window.location.href = "login.html";

}



async function cargarTareas(){

const res = await fetch("http://localhost:3000/tareas");

const tareas = await res.json();

mostrarTareas(tareas);

}


function mostrarTareas(tareas){

const lista = document.getElementById("listaTareas");

lista.innerHTML = "";

tareas.forEach(t => {

const div = document.createElement("div");

div.className = "task-card";

div.innerHTML = `
<div>
<strong>${t.titulo}</strong><br>
Asignado a: ${t.usuario}<br>
Estado: <span class="${t.estado === 'Pendiente' ? 'estado-pendiente' : 'estado-completada'}">
${t.estado}
</span>
</div>

<div>
<button onclick="cambiarEstado(${t.id}, '${t.estado}')">
Cambiar Estado
</button>

<button onclick="eliminarTarea(${t.id})">
Eliminar
</button>
</div>
`;

lista.appendChild(div);

});

}


async function crearTarea(){

const titulo = document.getElementById("titulo").value;

if(titulo.trim() === ""){
alert("Ingrese un título");
return;
}

const user = JSON.parse(localStorage.getItem("currentUser"));

await fetch("http://localhost:3000/tareas",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

titulo: titulo,
usuario: user.nombre,
estado: "Pendiente"

})

});

document.getElementById("titulo").value="";

cargarTareas();

}


async function eliminarTarea(id){

await fetch(`http://localhost:3000/tareas/${id}`,{

method:"DELETE"

});

cargarTareas();

}

async function cambiarEstado(id, estadoActual){

let nuevoEstado = estadoActual === "Pendiente" ? "Completada" : "Pendiente";

await fetch(`http://localhost:3000/tareas/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({estado:nuevoEstado})
});

cargarTareas();

}

async function cambiarEstado(id, estadoActual){

let nuevoEstado = estadoActual === "Pendiente" ? "Completada" : "Pendiente";

await fetch(`http://localhost:3000/tareas/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({estado:nuevoEstado})
});

cargarTareas();

}