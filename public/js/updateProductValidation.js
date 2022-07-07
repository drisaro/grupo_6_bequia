
window.onload = function(){
    
let form = document.querySelector("#form-updateProduct");
 
let errores = ["Producto","Descripción","Precio","Imagen Producto"];

 let nombreProducto = document.querySelector("input#nombre_producto"); 
 nombreProducto.addEventListener("blur",function(){
     
    if(!nombreProducto.value || nombreProducto.value == ""){
        nombreProducto.classList.add("is-invalid")
        nombreProducto.nextElementSibling.innerHTML="Agregar nombre de producto"
        errores.indexOf("Producto") > -1 ? null : errores.push("Producto");     
    }else {
        if(nombreProducto.value.length<5){
            nombreProducto.classList.add("is-invalid")
            nombreProducto.nextElementSibling.innerHTML="El nombre de producto debe tener al menos 5 caracteres"
            errores.indexOf("Producto") > -1 ? null : errores.push("Producto");    
        }
        else{
        nombreProducto.nextElementSibling.innerHTML = "";
        errores = errores.filter(err => err != "Producto");
        nombreProducto.classList.remove("is-invalid")
        let ulErrores = document.querySelector("ul.ulErrores");
        ulErrores.innerHTML=''
        errores.forEach(error => {
            ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
        })
        
        }

        
       }
     
 })

 
let descripcion_producto = document.querySelector("input#descripcion_producto"); 
descripcion_producto.addEventListener("blur",function(){
    
   if(!descripcion_producto.value || descripcion_producto.value == ""){
       descripcion_producto.classList.add("is-invalid")
       descripcion_producto.nextElementSibling.innerHTML="Agregar una descripcion"
       errores.indexOf("Descripción") > -1 ? null : errores.push("Descripción");
       //errores.push("Agregar una descripcion")
      
   }
   else {
    if(descripcion_producto.value.length<20){
        descripcion_producto.classList.add("is-invalid")
        descripcion_producto.nextElementSibling.innerHTML="La descripcion debe tener al menos 20 caracteres"
        errores.indexOf("Descripción") > -1 ? null : errores.push("Descripción");    
    }
    else{
    descripcion_producto.nextElementSibling.innerHTML = "";
    errores = errores.filter(err => err != "Descripción");
    descripcion_producto.classList.remove("is-invalid")
    let ulErrores = document.querySelector("ul.ulErrores");
    ulErrores.innerHTML=''
    errores.forEach(error => {
        ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
    })
    }

    
   }
   
    
})


let precio_producto = document.querySelector("input#precio_producto"); 
precio_producto.addEventListener("blur",function(){
    
   if(!precio_producto.value || precio_producto.value == ""){
        precio_producto.classList.add("is-invalid")
        precio_producto.nextElementSibling.innerHTML="Ingresar un precio"
        errores.indexOf("Precio") > -1 ? null : errores.push("Precio");
        //errores.push("Ingresar un precio")
   }
   else {
       if(isNaN(precio_producto.value)){
        precio_producto.classList.add("is-invalid")
        precio_producto.nextElementSibling.innerHTML="El precio debe ser un numero"
        errores.indexOf("Precio") > -1 ? null : errores.push("Precio");
       }
       else {
           if(precio_producto.value<=1){
            precio_producto.classList.add("is-invalid")
            precio_producto.nextElementSibling.innerHTML="El precio debe ser mayor a 1"
            errores.indexOf("Precio") > -1 ? null : errores.push("Precio");
            //errores.push("El precio debe ser mayor a 1")
           } else {
            precio_producto.nextElementSibling.innerHTML = "";
            errores = errores.filter(err => err != "Precio");
            precio_producto.classList.remove("is-invalid")
            let ulErrores = document.querySelector("ul.ulErrores");
            ulErrores.innerHTML=''
            errores.forEach(error => {
                ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
            })
           }
       }

      
       
   }
    
})

let imagen_producto = document.querySelector("input#imagen_producto"); 

imagen_producto.addEventListener("blur",function(){

   if(!imagen_producto.value || imagen_producto.value == ""){
        imagen_producto.classList.add("is-invalid")
        imagen_producto.nextElementSibling.innerHTML="Ingresar imagen del producto"
        errores.indexOf("Imagen Producto") > -1 ? null : errores.push("Imagen Producto");
        //errores.push("Ingresar imagen del producto")
    }
    else {
      let archivo = imagen_producto.value
      let extension = archivo.substring(archivo.lastIndexOf('.'),archivo.length);
      let acceptedExtensions=['.jpg','.png','jpeg','gif']
      if(acceptedExtensions.indexOf(extension) < 0) {
        imagen_producto.nextElementSibling.innerHTML="Archivo inválido. No se permite esta extensión "
        errores.indexOf("Imagen Producto") > -1 ? null : errores.push("Imagen Producto");
        //errores.push('Archivo inválido. No se permite la extensión ' + extension);
      }
      else {
        imagen_producto.nextElementSibling.innerHTML = "";
        errores = errores.filter(err => err != "Imagen Producto");
        imagen_producto.classList.remove("is-invalid")

        let ulErrores = document.querySelector("ul.ulErrores");
        ulErrores.innerHTML=''
        errores.forEach(error => {
            ulErrores.innerHTML += `<li>Corregir: ${error}</li>`
        })
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