const main = document.getElementsByTagName("main");
const addBtn = document.getElementById("add-btn");
const userInput = document.getElementById("todo-text");
const total = document.getElementById("total");
const completed = document.getElementById("completed");

const toDoList = JSON.parse(localStorage.getItem('myToDoList')) || [];

//This will add user input to the list and set the focus to input
const addItem = () => {
  addBtn.addEventListener("click", () => {
    if (userInput.value) toDoList.push({ do: userInput.value, done: false });
    localStorage.setItem('myToDoList', JSON.stringify(toDoList));
    userInput.value = "";
    userInput.focus();
    renderList(toDoList);
  });
  
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });
};

/**
* Clicking on the add button will call this and render the created list
* @param {Array} toDoList - List array for mapping
*/
const renderList = (toDoList) => {
  main[0].innerHTML = "";
  
  toDoList.map((item, index) => {
    let div = document.createElement("div");
    let doText = setToDoText(item.do);
    let checkbox = setCheckBox(index, div, doText);

    if (toDoList[index].done) {
      div.classList.add("completed");
      doText.classList.add("strike");
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

/**
* Collect the text from toDoList array and add that inside a span
* @param {number} text - do text
* @returns - a span element
*/
const setToDoText = (text) => {
  let toDoText = document.createElement("span");
  toDoText.classList.add("todo-text");
  toDoText.setAttribute("title", text);
  toDoText.innerText = text;
  return toDoText;
};

/** 
 * Set the status of the list based on the check-box state
 * @param {number} index - index for check-id attribute
 * @param {HTMLDivElement} mainDiv - HTMLDivElement for each to do list
 * @param {text} doText - do text
 * @returns - an input element
 */
const setCheckBox = (index, mainDiv, doText) => {
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("check-id", index);
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      toDoList[index].done = true;
      localStorage.setItem('myToDoList', JSON.stringify(toDoList));
      mainDiv.classList.add("completed");
      doText.classList.add("strike");
    } else {
      toDoList[index].done = false;
      localStorage.setItem('myToDoList', JSON.stringify(toDoList));
      mainDiv.classList.remove("completed");
      doText.classList.remove("strike");
    }
    setCompleted();
  });
  return checkbox;
};

/**
* Removes the item permanently from the list by removing the item from 
* toDoList by splicing and calls the renderList function
* @param {number} index - index for toDoList
* @returns - a span element
*/
const setRemove = (index) => {
  let remove = document.createElement("span");
  remove.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  remove.setAttribute("remove-id", index);
  remove.addEventListener("click", () => {
    toDoList.splice(index, 1);
    localStorage.setItem('myToDoList', JSON.stringify(toDoList));
    renderList(toDoList);
    setCompleted();
    total.innerText = `Total: ${toDoList.length}`;
  });

  return remove;
};

//Filter the toDoList and collect only the completed tasks length
const setCompleted = () => {
  let finishedTask = toDoList.filter((item) => item.done === true);
  completed.innerText = `Completed: ${finishedTask.length}`;
};

(function init() {
  renderList(toDoList);
  setCompleted();
  addItem();
})();
