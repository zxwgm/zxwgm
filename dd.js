const toDoForm = document.querySelector("#todo-form")
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.querySelector("#todo-list")

let toDos = []

function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos))

}

function deleteToDo(e) {
    const li = e.target.parentElement
    li.remove();
    toDos = toDos.filter((item) => item.id !== parseInt(li.id))
    saveToDos()
}

function paintToDo(newToDo) {
    const li = document.createElement("li")
    const span = document.createElement("span")
    li.setAttribute("id", newToDo.id)
   const button = document.createElement("button")



    button.innerText = "❌"
    button.addEventListener("click", deleteToDo)
    span.innerText = newToDo.text;
    li.appendChild(span)
    li.appendChild(button)
    toDoList.appendChild(li)
}

function handleToDoSubmit (event) {
    event.preventDefault();
    // console.log(toDoInput.value)
    const newToDoObj = {
        text: toDoInput.value,
        id: Date.now()
    }

    toDoInput.value = "";
    // 그려주는 함수
    paintToDo(newToDoObj)
    // 로컬스토리지에 저장
    toDos.push(newToDoObj)
    saveToDos()
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedtoDos = localStorage.getItem("todos")

if (savedtoDos !== null) {
    const parsedToDos = JSON.parse(savedtoDos)
    toDos = parsedToDos
    toDos.forEach(item => paintToDo(item)) // 각각의 todo 항목을 paintToDo 함수에 전달합니다.
}