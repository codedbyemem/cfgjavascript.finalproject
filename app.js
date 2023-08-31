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
  let currentLine = document.createTextNode(
    `${formatDate} ${exerciseInputText} ${durationInputH} H ${durationInputM} M ${notes}`
  );

  //adding the new line of text and the button in the DOM div
  wrapper.append(currentLine, deleteBtn, editBtn);

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
      wrapper.parentNode.removeChild(wrapper);
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
      const newExerciseInput = getExerciseInputText();
      const newDateFormat = new Date(newDate);
      //formatting newly inputted date as DD MM YYYY
      let day = newDateFormat.getDate();
      let month = newDateFormat.getMonth() + 1;
      let year = newDateFormat.getFullYear();
      let formatOfNewDate = `${day} - ${month} - ${year}`;
      // capturing the newly inputed results
      updatedLine = `${formatOfNewDate} ${newExerciseInput} ${newDurationH} H ${newDurationM} M ${newNotes}`;
      console.log(updatedLine);
      editBtn.textContent = "Saved";
      // create a function that will reset the button back to it's orignal edit text
      function btnTextSavedToEdit() {
        editBtn.textContent = "Edit";
      }
      // set timeout for text in button to go from saved to edit again and reset the input fields
      setTimeout(btnTextSavedToEdit, 1000);
      document.getElementById("date-select").value = "";
      document.getElementById("duration-h").value = "";
      document.getElementById("duration-m").value = "";
      document.getElementById("notes").value = "";
      document.getElementById("exercise-select").value = "";
      let spanTextInput = document.createElement("span");
      spanTextInput.setAttribute("id", "new-span");
      spanTextInput.textContent = updatedLine;

      wrapper.replaceChild(spanTextInput, currentLine);
      currentLine = spanTextInput;
      // if the button still says save (to be saved), we will be caputuring the inputs into variables
    } else {
      editBtn.textContent = "Save";
      document.getElementById("date-select").value = dateInput;
      document.getElementById("duration-h").value = durationInputH;
      document.getElementById("duration-m").value = durationInputM;
      document.getElementById("notes").value = notes;
      document.getElementById("exercise-select").value = exerciseInputValue;
      console.log(displayAll);

      //   displayAll.replaceChild(spanTextInput, wrapper);
      // }
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
