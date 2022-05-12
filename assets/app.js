var nav_register = document.querySelector(".header__navbar-register");
var nav_login = document.querySelector(".header__navbar-login");
var modalOverlay = document.querySelector(".modal__overlay");
var modalLogin = document.querySelector(".modal__body .login");
var modalRegister = document.querySelector(".modal__body .register");
var modal = document.querySelector(".modal");
var modalBody = document.querySelector(".modal__body");

modalRegister.style.display = "none";
modalLogin.style.display = "none";
modalOverlay.style.display = "none";
modal.style.display = "none";
modalBody.style.display = "none";

// console.log(modalOverlay)

nav_register.onclick = function(e){
    modal.style.display = "flex";
    modalOverlay.style.display = "block";
    modalBody.style.display = "block";
    modalRegister.style.display = "block";
}

document.querySelector(".auth-form__control-back").onclick = function(e){
    modalRegister.style.display = "none";
    modalLogin.style.display = " none";
    modalOverlay.style.display = "none";
    modal.style.display = "none";
    modalBody.style.display = "none";
}

nav_login.onclick = function(e){
    modal.style.display = "flex";
    modalOverlay.style.display = "block";
    modalBody.style.display = "block";
    modalLogin.style.display = "block";
}

document.querySelector(".modal__body .login .auth-form__control-back").onclick = function(e){
modalRegister.style.display = "none";
modalLogin.style.display = " none";
modalOverlay.style.display = "none";
modal.style.display = "none";
modalBody.style.display = "none";
}

document.querySelector(".auth-form__switch-btn").onclick = function(e){
    modal.style.display = "flex";
    modalOverlay.style.display = "block";
    modalBody.style.display = "block";
    modalLogin.style.display = "block";
    modalRegister.style.display = "none";
}

document.querySelector(".modal__body .auth-form .switch-btn-register").onclick = function(e){
    modal.style.display = "flex";
    modalOverlay.style.display = "block";
    modalBody.style.display = "block";
    modalLogin.style.display = "none";
    modalRegister.style.display = "block";
}

modalOverlay.onclick = function(e){
    modalRegister.style.display = "none";
modalLogin.style.display = " none";
modalOverlay.style.display = "none";
modal.style.display = "none";
modalBody.style.display = "none";
}



