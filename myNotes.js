
let addBtn = document.getElementById("add-btn"); 
let addTxt = document.getElementById("note-text"); 
let addTitle = document.getElementById("note-title"); 


addBtn.addEventListener("click", function(e) {

    if(addTitle.value == "" || addTxt.value == "") {
        return alert("Please add note title and details"); 
    }
    
    let notes = localStorage.getItem("notes"); 
    if (notes == null) {
        notesobj = []; 
    } else {
        notesObj = JSON.parse(notes); 
    }
    let myObj = {
        title: addTitle.value, 
        text: addTxt.value 
    }
    notesObj.push(myObj); 
    localStorage.setItem("notes", JSON.stringify(notesObj));
     
}); 

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
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
      notesElm.innerHTML = html;
    } else {
      notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
    }
  }

function deleteNote(index) {
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
        notesObj = JSON.parse(notes);
        }
    
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
        }
      
    }    

showNotes()