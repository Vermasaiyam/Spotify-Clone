const signUpButton = document.getElementById("signup");
const logInButton = document.getElementById("login");
const container = document.getElementById("container");

signUpButton.addEventListener("click",()=>{
    container.classList.add("right-panel-active");
})

logInButton.addEventListener("click",()=>{
    container.classList.remove("right-panel-active");
})