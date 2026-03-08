const form = document.getElementById("taskForm")
const input = document.getElementById("taskInput")
const list = document.getElementById("taskList")

let tareas = JSON.parse(localStorage.getItem("tareas")) || []

function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function render() {
    list.innerHTML = ""

    tareas.forEach((tarea, index) => {
        const li = document.createElement("li")
        li.className = "task"

        const span = document.createElement("span")
        span.textContent = tarea.texto

        if (tarea.completada) {
            span.style.textDecoration = "line-through"
            span.style.opacity = "0.6"
        }

        span.onclick = () => {
            tareas[index].completada = !tareas[index].completada
            guardar()
            render()
        }

        const btn = document.createElement("button")
        btn.textContent = "Eliminar"

        btn.onclick = () => {
            tareas.splice(index, 1)
            guardar()
            render()
        }

        li.appendChild(span)
        li.appendChild(btn)
        list.appendChild(li)
    })
}

form.addEventListener("submit", e => {
    e.preventDefault()

    if (input.value.trim() === "") return

    tareas.push({
        texto: input.value,
        completada: false
    })

    input.value = ""
    guardar()
    render()
})

render()