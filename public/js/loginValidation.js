
window.onload = function(){
    
let form = document.querySelector("#form-login");
let ulErrores = document.querySelector("ul.ulErrores");
let errores = ["Email","Password"];


let email_usuario = document.querySelector("input#email_usuario"); 
email_usuario.addEventListener("blur",function(){
    
   if(!email_usuario.value || email_usuario.value == ""){
    email_usuario.classList.add("is-invalid")
    email_usuario.nextElementSibling.innerHTML="Ingresar un email"
        errores.indexOf("Email") > -1 ? null : errores.push("Email");
        //errores.push("Ingresar un precio")
   }
   else {
       let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
       if(!emailRegex.test(email_usuario.value)){
        email_usuario.classList.add("is-invalid")
        email_usuario.nextElementSibling.innerHTML="Escribe un email valido"
        errores.indexOf("Email") > -1 ? null : errores.push("Email");
       }
       else {
           
            email_usuario.nextElementSibling.innerHTML = "";
            errores = errores.filter(err => err != "Email");
            email_usuario.classList.remove("is-invalid")
           
            //  ulErrores.innerHTML=''
            //  errores.forEach(error => {
            //      ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
            //  })
           
       }

      
       
   }
    
})


let password_usuario = document.querySelector("input#password_usuario"); 
password_usuario.addEventListener("blur",function(){
    
   if(!password_usuario.value || password_usuario.value == ""){
    password_usuario.classList.add("is-invalid")
    password_usuario.nextElementSibling.innerHTML="Ingresa tu password"
       errores.indexOf("Password") > -1 ? null : errores.push("Password");
       //errores.push("Agregar una descripcion")
      
   }
   else {
    if(password_usuario.value.length<8){
        password_usuario.classList.add("is-invalid")
        password_usuario.nextElementSibling.innerHTML="El password debe tener al menos 8 caracteres"
        errores.indexOf("Password") > -1 ? null : errores.push("Password");    
    }
    else{
        password_usuario.nextElementSibling.innerHTML = "";
    errores = errores.filter(err => err != "Password");
    password_usuario.classList.remove("is-invalid")

            //  ulErrores.innerHTML=''
            //  errores.forEach(error => {
            //      ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
            //  })
    }
    
   }
   
    
})


form.addEventListener("submit", function(e) {


    if(errores.length > 0){
        e.preventDefault()
        let ulErrores = document.querySelector("ul.ulErrores");
        ulErrores.innerHTML=''
        errores.forEach(error => {
            ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
        })
        
         
    }

})
}