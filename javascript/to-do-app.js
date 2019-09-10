const clear = document.getElementById("clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "lineThrough";

let LIST = [];
let id = 0;
//LIST = [{}, {}, ...];

//Get item from localstorage + check if data is empty
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDo(LIST);
} else {
  LIST = [];
  id = 0;
}

//Load items to the user interface
function loadToDo(array) {
  array.forEach(function(item) {
      addToDo(item.name, item.id, item.done, item.trash);
  });
}

//Add date
let today = new Date();
let options = {weekday:"long", month:"short", day:"numeric"}
dateElement.innerHTML = today.toLocaleDateString("en-US", options);


//"Add To-do"
function addToDo(toDo, id, done, trash) {
    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINETHROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
                  </li>`;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        const toDo = input.value;
        if(toDo){
          addToDo(toDo, id, false, false);
          LIST.push(
            {
              name: toDo,
              id: id,
              done: false,
              trash: false
            }
          );
        input.value = "";

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
        }
    }
});

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINETHROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener("click", function(event) {
  let element = event.target;
  const elementJOB = event.target.attributes.job.value;
  if (elementJOB == "complete") {
    completeToDo(element);
  } else if (elementJOB == "delete") {
    removeToDo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});


//Clear button
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload(); 
});
