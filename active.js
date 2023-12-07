let addbox = document.querySelector(".add-box");
let popupBox = document.querySelector(".popup-box ");
let popupTitle = popupBox.querySelector("header p");
let addbtn = popupBox.querySelector("button");

let closeIcon   = popupBox.querySelector("header i");
let titleTag = popupBox.querySelector("input");
let descTag = popupBox.querySelector("textarea");

let notes = JSON.parse(localStorage.getItem("notes")||"[]");
let isUpdate =false;
let update;

//  function for show data 
let showNotes = function(){ 
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note,id)=> {
        let filterDesc = note.description.replaceAll("\n","<br/>");
        let liTag = `
            <li class="note">
                <div class="detailes"> 
                    <p>${note.title }</p>
                    <span>${filterDesc}</span> 
                </div>
                <div class="botton-content">
                    <span>${note.date}</span>
                    <div class="sitting">
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis" id="siting"></i>
                            <ul class="menu">
                                <li onclick="updateNote('${id}' , '${note.title}','${filterDesc}')"><i class="fa-regular fa-pen-to-square" id="edit"></i>Edit</li>
                                <li onclick="deleteNote(${id})"><i class="fa-solid fa-trash" id="delete"></i>Delete</li>
                            </ul>
                    </div>
                </div>
            </li>
        `;
        addbox.insertAdjacentHTML("afterend",liTag)
    });
}

showNotes();

// function for update or delete the Note 
let showMenu = function(ele){
    ele.parentElement.classList.add("show");
    document.addEventListener("click",function(e){
        if(e.target.tagName !="I" || e.target!=ele){
            ele.parentElement.classList.remove("show");
        }
    })
}

// function for delete the note 
function deleteNote(noteId){
    let confermDel = confirm("You Want to Delete this Node ?");
    if(!confermDel)return;
    notes.splice(noteId , 1);
    localStorage.setItem("notes" , JSON.stringify(notes));
    showNotes(); 
}

// function for update the note 
function updateNote(noteId , title , filterDesc){
    // let description = filterDesc.replaceAll(`<br/>`,`\r\n`);
    update = noteId ;
    isUpdate = true ;
    addbox.click();
    titleTag.value = title ;
    descTag.value = filterDesc;
    [popupTitle.innerHTML ,addbtn.innerHTML ] = ["Update Note","Update Note"];
}


// open tag 
addbox.addEventListener("click",function(){
    popupBox.classList.add("show");
    [popupTitle.innerHTML ,addbtn.innerHTML ] = ["Add New Note","Add Note"];
    document.querySelector("body").style.overflow = "hidden";
    titleTag.focus();
})

// close tag 
closeIcon.addEventListener("click",function(){
    popupBox.classList.remove("show");
    [titleTag.value ,descTag.value ] = ["",""];
    document.querySelector("body").style.overflow = "auto";
});

// add note 
addbtn.addEventListener("click",function(e){
    e.preventDefault();
    let title = titleTag.value.trim();
    let description = descTag.value.trim();
    if(title || description){

        let currentData = new Date();
        let month = currentData.getMonth();
        let year = currentData.getFullYear();
        let day = currentData.getDate();

        let noteinfo = {title , description , date: `${month}/${day}/${year}`};
        if(!isUpdate){
            notes.push(noteinfo);
        }else{
            isUpdate = false;
            notes[update]=noteinfo;
        }  
        localStorage.setItem("notes" , JSON.stringify(notes) );
        showNotes();
        closeIcon.click();
    }
})

