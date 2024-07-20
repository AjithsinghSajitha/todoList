const main = document.getElementsByTagName("main");
const addBtn = document.getElementById("add-btn");
const userInput = document.getElementById("todo-text");
const total = document.getElementById("total");
const completed = document.getElementById("completed");

const toDoList = [];

const setCompleted = () =>{
    let finishedTask = toDoList.filter( item => item.done === true);
    completed.innerText = `Completed: ${finishedTask.length}`;
}

const setRemove = (index) => {
  let remove = document.createElement("span");
  remove.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  remove.setAttribute("remove-id", index);
  remove.addEventListener("click", () => {
    toDoList.splice(index, 1);
    renderList(toDoList);
    setCompleted();
    total.innerText = `Total: ${toDoList.length}`;
  });
  
  return remove;
};

const setCheckBox = (index, mainDiv, doText) => {
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("check-id", index);
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      console.log("hellllllo");
      mainDiv.classList.add("completed");
      toDoList[index].done = true;
    } else {
      toDoList[index].done = false;
      mainDiv.classList.remove("completed");
    }
    setCompleted();
  });
  return checkbox;
};

const SetToDoText = (text) => {
  let toDoText = document.createElement("span");
  toDoText.classList.add("todo-text");
  toDoText.innerText = text;
  return toDoText;
};

const renderList = (toDoList) => {
  main[0].innerHTML = "";
  toDoList.map((item, index) => {
    let div = document.createElement("div");
    let doText = SetToDoText(item.do);
    let checkbox = setCheckBox(index, div, doText);

    if (toDoList[index].done) {
      div.classList.add("completed");
      console.log("added");
      checkbox.checked = true;
    }

    div.classList.add("todo-item");
    div.append(checkbox);
    div.append(doText);
    div.append(setRemove(index));

    main[0].append(div);
    total.innerText = `Total: ${toDoList.length}`;
  });
};

addBtn.addEventListener("click", () => {
  if (userInput.value) toDoList.push({ do: userInput.value, done: false });
  userInput.value = "";
  renderList(toDoList);
});

