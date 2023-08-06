//save whole form as variable
const tracker = document.getElementById("tracker");

//prevent page refreshing after submit is pressed, this is the default
function displayInputContents(event) {
  event.preventDefault();

  //obtain date input from form
  const dateInput = document.getElementById("date-select").value;

  //obtain exercise type from form
  const exerciseInput = getOptionText();

  //display all inputs in empty html section
  const displayAll = document.getElementById("output");

  //change date from default format
  const dateFormat = new Date(dateInput);

  let day = dateFormat.getDate();
  let month = dateFormat.getMonth() + 1;
  let year = dateFormat.getFullYear();

  let formatDate = `${day} - ${month} - ${year}`;

  //getting exercise duration input fields saved as variables
  const durationInputH = document.getElementById("duration-h");
  const durationInputM = document.getElementById("duration-m");

  //accessing the values of the duration inputs
  inputValueH = durationInputH.value;
  inputValueM = durationInputM.value;

  //get notes box value
  const notes = document.getElementById("notes");
  notesValue = notes.value;

  //creating delete button via dom

  let wrapper = document.createElement("div"); // creating an empty div
  let deleteBtn = document.createElement("button");

  //creating delete button
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-button");

  //creating edit button

  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");

  //creating a new line of the html page displaying the inputs
  const newLine = document.createTextNode(
    `${formatDate} ${exerciseInput} ${inputValueH} H ${inputValueM} M ${notesValue}`
  );

  //adding the new line of text and the button in the DOM div
  wrapper.append(newLine, deleteBtn, editBtn);

  //making sure display shows most recent input first
  displayAll.insertBefore(wrapper, displayAll.childNodes[0]);

  document.getElementById("date-select").value = "";
  document.getElementById("exercise-select").value = "";
  document.getElementById("duration-h").value = "";
  document.getElementById("duration-m").value = "";
  document.getElementById("notes").value = "";

  //delete button function - get the wrapper div and delete the child
  //item will only be deleted if user selects confirm on pop up

  function deleteFunction() {
    let shouldDelete = confirm("Are you sure you want to delete this entry?");

    if (shouldDelete) {
      const lineToDelete = newLine.parentNode;
      lineToDelete.parentNode.removeChild(lineToDelete);
      console.log("deleteFunction");
    }
  }

  deleteBtn.addEventListener("click", deleteFunction);

  function editInput() {
    editBtn.textContent = "Save";
    document.getElementById("date-select").value = dateInput;
    document.getElementById("exercise-select").getOptionText() = exerciseInput;
    document.getElementById("duration-h").value = inputValueH;
    document.getElementById("duration-m").value = inputValueM;
    document.getElementById("notes").value = notesValue;
  }
  editBtn.addEventListener("click", editInput);
}

//get text of option rather than value name
function getOptionText() {
  const optionList = document.getElementById("exercise-select");
  const selectedOption =
    optionList.options[optionList.selectedIndex].textContent;
  return selectedOption;
}

//trigger fuction above to tracker when submit button is pressed
tracker.addEventListener("submit", displayInputContents);
