
window.onload = function(){
    
let form = document.querySelector("#form-createUser");
 
let errores = ["Nombre","Apellido","Email","Password","Imagen Usuario"];

 let nombreUsuario = document.querySelector("input#nombre_usuario"); 
 
 nombreUsuario.addEventListener("blur",function(){
     
    if(!nombreUsuario.value || nombreUsuario.value == ""){
        nombreUsuario.classList.add("is-invalid")
        nombreUsuario.nextElementSibling.innerHTML="Agregar nombre de usuario"
        errores.indexOf("Nombre") > -1 ? null : errores.push("Nombre");     
    }else {
        if(nombreUsuario.value.length<3){
            nombreUsuario.classList.add("is-invalid")
            nombreUsuario.nextElementSibling.innerHTML="El nombre de usuario debe tener mas de 2 caracteres"
            errores.indexOf("Nombre") > -1 ? null : errores.push("Nombre");    
        }
        else{
        nombreUsuario.nextElementSibling.innerHTML = "";
        errores = errores.filter(err => err != "Nombre");
        nombreUsuario.classList.remove("is-invalid")
        // let ulErrores = document.querySelector("ul.ulErrores");
        // ulErrores.innerHTML=''
        // errores.forEach(error => {
        //     ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
        // })
        }

        
       }
     
 })

 
let apellidos_usuario = document.querySelector("input#apellidos_usuario"); 
apellidos_usuario.addEventListener("blur",function(){
    
   if(!apellidos_usuario.value || apellidos_usuario.value == ""){
    apellidos_usuario.classList.add("is-invalid")
    apellidos_usuario.nextElementSibling.innerHTML="Agrega tus apellidos"
       errores.indexOf("Apellido") > -1 ? null : errores.push("Apellido");
       //errores.push("Agregar una descripcion")
      
   }
   else {

    if(apellidos_usuario.value.length<3){
        apellidos_usuario.classList.add("is-invalid")
        apellidos_usuario.nextElementSibling.innerHTML="El apellido debe tener mas de 2 caracteres"
        errores.indexOf("Apellido") > -1 ? null : errores.push("Apellido");    
    }
    else{
        apellidos_usuario.nextElementSibling.innerHTML = "";
    errores = errores.filter(err => err != "Apellido");
    apellidos_usuario.classList.remove("is-invalid")
        // let ulErrores = document.querySelector("ul.ulErrores");
        // ulErrores.innerHTML=''
        // errores.forEach(error => {
        //     ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
        // })
    }
    
   }
   
    
})


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

            // let ulErrores = document.querySelector("ul.ulErrores");
            // ulErrores.innerHTML=''
            // errores.forEach(error => {
            //     ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
            // })
           
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

        // let ulErrores = document.querySelector("ul.ulErrores");
        // ulErrores.innerHTML=''
        // errores.forEach(error => {
        //     ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
        // })
    }
    
   }
   
    
})

let imagen_usuario = document.querySelector("input#imagen_usuario"); 

imagen_usuario.addEventListener("blur",function(){

   if(!imagen_usuario.value || imagen_usuario.value == ""){
    imagen_usuario.classList.add("is-invalid")
    imagen_usuario.nextElementSibling.innerHTML="Ingresar imagen de usuario"
        errores.indexOf("Imagen Usuario") > -1 ? null : errores.push("Imagen Usuario");
        //errores.push("Ingresar imagen del producto")
    }
    else {
      let archivo = imagen_usuario.value
      let extension = archivo.substring(archivo.lastIndexOf('.'),archivo.length);
      let acceptedExtensions=['.jpg','.png','jpeg','gif']
      if(acceptedExtensions.indexOf(extension) < 0) {
        imagen_usuario.nextElementSibling.innerHTML="Archivo inválido. No se permite esta extensión "
        errores.indexOf("Imagen Usuario") > -1 ? null : errores.push("Imagen Usuario");
        //errores.push('Archivo inválido. No se permite la extensión ' + extension);
      }
      else {
        imagen_usuario.nextElementSibling.innerHTML = "";
        errores = errores.filter(err => err != "Imagen Usuario");
        imagen_usuario.classList.remove("is-invalid")
        // let ulErrores = document.querySelector("ul.ulErrores");
        // ulErrores.innerHTML=''
        // errores.forEach(error => {
        //     ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
        // })
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