// 1 – wrap each text in a span
// 2 – give these spans IDs like entry-0, entry-1, entry-2, ...
// 3 – in the save button handler, find the closest span element
// 4 – change the contents of this span element

//save whole form as variable
const tracker = document.getElementById("tracker");

//prevent page refreshing after submit is pressed, this is the default
function displayInputContents(event) {
  event.preventDefault();

  //obtain date input from form
  const dateInput = document.getElementById("date-select").value;

  //obtain exercise type from form
  const exerciseInputText = getExerciseInputText();

  // obtain value of exercise selected option from exercise dropdown list

  const exerciseInputValue = document.getElementById("exercise-select").value;

  //display all inputs in empty html section
  const displayAll = document.getElementById("output");

  //change date from default format
  const dateFormat = new Date(dateInput);

  let day = dateFormat.getDate();
  let month = dateFormat.getMonth() + 1;
  let year = dateFormat.getFullYear();

  let formatDate = `${day} - ${month} - ${year}`;

  //getting exercise duration input fields saved as variables
  const durationInputH = document.getElementById("duration-h").value;
  const durationInputM = document.getElementById("duration-m").value;

  // //accessing the values of the duration inputs
  // inputValueH = durationInputH.value;
  // inputValueM = durationInputM.value;

  //get notes box value
  const notes = document.getElementById("notes").value;
  // notesValue = notes.value;

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
    `${formatDate} ${exerciseInputText} ${durationInputH} H ${durationInputM} M ${notes}`
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
    if (editBtn.textContent === "Save") {
      const newDate = document.getElementById("date-select").value;
      const newDurationH = document.getElementById("duration-h").value;
      const newDurationM = document.getElementById("duration-m").value;
      const newNotes = document.getElementById("notes").value;
      const newExerciseInput = document.getElementById("exercise-select").value;
      updatedLine = `${newDate} ${newExerciseInput} ${newDurationH} H ${newDurationM} M ${newNotes}`;
      console.log(updatedLine);
      editBtn.textContent = "Saved";
      function savedToEditButton() {
        editBtn.textContent = "Edit";
      }
      setTimeout(savedToEditButton, 1000);
      document.getElementById("date-select").value = "";
      document.getElementById("duration-h").value = "";
      document.getElementById("duration-m").value = "";
      document.getElementById("notes").value = "";
      document.getElementById("exercise-select").value = "";
    } else {
      editBtn.textContent = "Save";
      document.getElementById("date-select").value = dateInput;
      document.getElementById("duration-h").value = durationInputH;
      document.getElementById("duration-m").value = durationInputM;
      document.getElementById("notes").value = notes;
      document.getElementById("exercise-select").value = exerciseInputValue;
    }
  }
  editBtn.addEventListener("click", editInput);
}

//get text of option rather than value name
function getExerciseInputText() {
  const optionList = document.getElementById("exercise-select");
  const selectedOption =
    optionList.options[optionList.selectedIndex].textContent;
  return selectedOption;
}

//trigger fuction above to tracker when submit button is pressed
tracker.addEventListener("submit", displayInputContents);
