// use a document ready statement here
// window.addEventListener('DOMContentLoaded', (event) => {
//   console.log('DOM fully loaded and parsed');
// });

let addBtn = document.getElementById("add-btn"); 
let addTxt = document.getElementById("note-text"); 
let addTitle = document.getElementById("note-title"); 

addBtn.addEventListener("click", function(e) {

    if(addTitle.value == "" || addTxt.value == "") {
        return alert("Please add note title and details"); 
    }
    // could technically build this into one statement
    // I.E. let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notes = localStorage.getItem("notes"); 
    if (notes == null) {
      // this technically works in javascript only due to how javascripts instantiates variables. If going with this logic, you should instantiate in the global scope.
        notesobj = []; 
    } else {
        notesObj = JSON.parse(notes); 
    }
    // variables should represent what you are defining, in this case obj could be notes.
    let myObj = {
        title: addTitle.value, 
        text: addTxt.value 
    }
    notesObj.push(myObj); 
    localStorage.setItem("notes", JSON.stringify(notesObj));
     
}); 

// Function to show elements from localStorage
function showNotes() {
  // same as above, could technically build this into one statement.
    let notes = localStorage.getItem("notes");
    // if instaniated in the global scope, you wouldn't need to declare notesObj twice.
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
      html += `
          <div class="note">
              <p class="note-counter">Note ${index + 1}</p>
              <h3 class="note-title"> ${element.title} </h3>
              <p class="note-text"> ${element.text}</p>
              <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
          </div>
              `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
      // NICE used innerhtml correctly!
      notesElm.innerHTML = html;
    } else {
      notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
    }
  }

function deleteNote(index) {
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
      // same comments as above.
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
        notesObj = JSON.parse(notes);
        }
        // could use an array method filter to set this.
        notesObj.splice(index, 1);
        // notesObj.filter(function(note, i) {
        //   if(index === i) {
        //     return note
        //   }
        // })
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
        }
      
    }    

showNotes()