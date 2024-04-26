document.addEventListener("DOMContentLoaded", (e) => {
 

    




});

const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", handlePause);

const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const likeButton = document.getElementById("heart");
const submitButton = document.getElementById("submit");
const likeList = document.querySelector("ul");
const commentSection = document.getElementById("list");

plusButton.addEventListener("click", timerIncrementer);
minusButton.addEventListener("click", timerDecrementer);
likeButton.addEventListener("click", likeCounter)

let commentForm = document.getElementById("comment-form")
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  buildComment(e.target);
  commentForm.reset();
})


let intervalID = setInterval(timerIncrementer, 1000);
let i = 0;
let paused = false;

const likeData = {};

function timerIncrementer(){
    if(paused === false)
    i += 1;
    updateCounterDOM();
}
function timerDecrementer(){
    if (paused === false){
        i -= 1;
        updateCounterDOM();
    }
}


function handlePause(e){

    if (paused === true){
        paused = false;
        intervalID = setInterval(timerIncrementer, 1000);
        pauseButton.textContent = ` pause `;
        unshadeButtons();
        
    }
    else{
        paused = true;
        clearInterval(intervalID);
        pauseButton.textContent = ` resume `;
        shadeButtons();
        
        
    }
}

function shadeButtons(){
    plusButton.style.opacity = 0.6;
    minusButton.style.opacity = 0.6;
    likeButton.style.opacity = 0.6;
    submitButton.style.opacity = 0.6;
}
function unshadeButtons(){
    plusButton.style.opacity = 1;
    minusButton.style.opacity = 1;
    likeButton.style.opacity = 1;
    submitButton.style.opacity = 1;
}

function updateCounterDOM(){
    let counter = document.getElementById("counter");
    counter.textContent = `${i}`
}

function likeCounter(){
    if(paused === false){
        if (typeof likeData[`${i}`] === "number"){
            likeData[`${i}`] += 1;
        }
        else{
            likeData[`${i}`] = 1;
        }
        updateLikesDOM();
    }
}

function updateLikesDOM(){
    while (likeList.firstChild) {
        likeList.removeChild(likeList.lastChild);
    }
    for(const key in likeData){
        let p = document.createElement("p");
        let t = document.createTextNode(`${key} has been liked ${likeData[key]} times!`)
        p.appendChild(t);
        likeList.appendChild(p);

    }
}

function buildComment(comment){
    let p = document.createElement("p");
    let t = document.createTextNode(comment.comment_input.value.toString());
    p.appendChild(t);
    commentSection.appendChild(p);

}

