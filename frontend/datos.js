document.addEventListener("DOMContentLoaded", () => {

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const recoverForm = document.getElementById("recoverForm");

if(registerForm){

registerForm.addEventListener("submit", async e => {

e.preventDefault();

let nombre = document.getElementById("registerName").value;
let email = document.getElementById("registerEmail").value;
let password = document.getElementById("registerPassword").value;

const res = await fetch("http://localhost:3000/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({nombre,email,password})
});

const data = await res.json();

alert("Usuario registrado correctamente");
window.location.href = "login.html";

});

}

if(loginForm){

loginForm.addEventListener("submit", async e => {

e.preventDefault();

let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;

const res = await fetch("http://localhost:3000/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({email,password})
});

const data = await res.json();

console.log("Respuesta del servidor:", data);

if(data.login){

localStorage.setItem("currentUser", JSON.stringify(data));


if(data.rol === "admin"){
window.location.href = "dashboard.html";
}else{
window.location.href = "taskmanager.html";
}

}else{
alert("Datos incorrectos");
}

});

}

if(recoverForm){

recoverForm.addEventListener("submit", async e => {

e.preventDefault();

let email = document.getElementById("recoverEmail").value;

const res = await fetch("http://localhost:3000/recuperar",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({email})
});

const data = await res.json();

if(data.existe){
alert("Tu contraseña es: " + data.password);
}else{
alert("Correo no encontrado");
}

});

}

});