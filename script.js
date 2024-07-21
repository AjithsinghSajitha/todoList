const main = document.getElementsByTagName("main");
const addBtn = document.getElementById("add-btn");
const userInput = document.getElementById("todo-text");
const total = document.getElementById("total");
const completed = document.getElementById("completed");

const toDoList = [];

//Filter the toDoList and collect only the completed tasks length
const setCompleted = () => {
  let finishedTask = toDoList.filter((item) => item.done === true);
  completed.innerText = `Completed: ${finishedTask.length}`;
};

//Removes the item permanently from the list by removing the item from toDoList call the renderList function
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

//Set the status of the list based on the check-box state
const setCheckBox = (index, mainDiv, doText) => {
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("check-id", index);
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      mainDiv.classList.add("completed");
      toDoList[index].done = true;
      doText.classList.add("strike");
    } else {
      toDoList[index].done = false;
      mainDiv.classList.remove("completed");
      doText.classList.remove("strike");
    }
    setCompleted();
  });
  return checkbox;
};

//Collect the text from toDoList array and add that inside a span
const SetToDoText = (text) => {
  let toDoText = document.createElement("span");
  toDoText.classList.add("todo-text");
  toDoText.setAttribute("title", text);
  toDoText.innerText = text;
  return toDoText;
};

//Clicking on the add button will call this and render the created list
const renderList = (toDoList) => {
  main[0].innerHTML = "";
  toDoList.map((item, index) => {
    let div = document.createElement("div");
    let doText = SetToDoText(item.do);
    let checkbox = setCheckBox(index, div, doText);

    if (toDoList[index].done) {
      div.classList.add("completed");
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

//This will add user input to the list and set the focus to input
const addItem = () => {
  addBtn.addEventListener("click", () => {
    if (userInput.value) toDoList.push({ do: userInput.value, done: false });
    userInput.value = "";
    userInput.focus();
    renderList(toDoList);
  });
};

(function Init() {
  addItem();
})();
