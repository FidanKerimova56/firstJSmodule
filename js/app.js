const input = document.querySelector(".main-input")
const submitButton = document.querySelector(".button")
const ul = document.querySelector("ul")
const newElement = document.querySelector(".li-value")

submitButton.addEventListener("click",addElement)

function addElement(){
    const li = document.createElement("li");
    li.innerHTML = '<p class="list-style"></p> <div class="delete-icon"><a href="#"><i class="fa-solid fa-circle-xmark"></i></a></div>'
     li.classList.add("input-cont") ;
     li.textContent = input.value;
     ul.append(li)
            
        
            
        
    
}