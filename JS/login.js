var contador = 0;

function login(){
    const nombre = document.querySelector('#nombre').value
    const apellidos = document.querySelector('#apellidos').value
    const password = document.querySelector('#contraseña').value
    const email = document.querySelector('#e-mail').value

    if(nombre==='' || apellidos==='' || password==='' || email===''){
        Swal.fire({
            icon: 'warning',
            title: 'ACCESO DENEGADO',
            text: 'Debe rellenar todos los campos solicitados',
            timer: 3000
        })
    }
    else{
        const Users = JSON.parse(sessionStorage.getItem('users')) || []
        const registrado = Users.find(user => user.email === email)
        if(registrado){
            Swal.fire({
                icon: 'error',
                title: 'ACCESO DENEGADO',
                text: 'Usuario ya registrado',
                timer: 3000
            })
        }
        else{
            Users.push({nombre: nombre, apellidos: apellidos, email: email, password: password})
            sessionStorage.setItem('users', JSON.stringify(Users))
            Swal.fire({
                icon: 'success',
                title: 'REGISTRO EXITOSO',
                timer: 1500
            }).then(function(){
                sessionStorage.setItem('contador', 1)
                window.location.href = 'index.html'
            })
        }
        
    }
}
function loginInicio(){
    const password = document.querySelector('#contraseña').value
    const email = document.querySelector('#e-mail').value
    const Users = JSON.parse(sessionStorage.getItem('users')) || []

    if(password==='' || email===''){
        Swal.fire({
            icon: 'warning',
            title: 'ACCESO DENEGADO',
            text: 'Debe rellenar todos los campos solicitados',
            timer: 3000
        })
    }
    else{
        const validacion = Users.find(user => user.email === email && user.password === password)
        if(!validacion){
            Swal.fire({
                icon: 'error',
                title: 'USUARIO NO ENCONTRADO',
                text: 'Correo y/o contraseña incorrectos',
                timer: 3000
            })
        }
        else{
            Swal.fire({
                icon: 'success',
                title: 'BIENVENIDO',
                timer: 1500
            }).then(function(){
                sessionStorage.setItem('contador', 1)
                window.location.href = 'index.html'
            })
        }
    }
}
function salir(){
    location.reload();
    sessionStorage.removeItem('contador');
}

function actualizar(){
    var i = 1;
    var descuento;

    if(sessionStorage.getItem('contador')!=undefined){
        document.getElementById("cerrar").style.display = "flex";
        document.getElementById("registro").style.display = "none";

        for(i; i<=5; i++){
            var precio = Number(document.getElementById('number' + i).textContent);
            descuento = parseFloat(precio * 0.05).toFixed(2);
            precio = precio - descuento;
            document.getElementById('number' + i).innerHTML = precio.toFixed(2);
        }
    }
    else{
        document.getElementById("cerrar").style.display = "none";
        document.getElementById("registro").style.display = "flex";
    }
}
function actualizarProductos(){
    var i = 1;
    var descuento;
    if(sessionStorage.getItem('contador')!=undefined){
        document.getElementById("cerrar").style.display = "flex";
        document.getElementById("registro").style.display = "none";

        for(i; i<=9; i++){
            var precio = Number(document.getElementById('number' + i).textContent);
            descuento = parseFloat(precio * 0.05).toFixed(2);
            precio = precio - descuento;
            document.getElementById('number' + i).innerHTML = precio.toFixed(2);
        }
    }
    else{
        document.getElementById("cerrar").style.display = "none";
        document.getElementById("registro").style.display = "flex";
    }
}
function actualizar_normal(){
    if(sessionStorage.getItem('contador')!=undefined){
        document.getElementById("cerrar").style.display = "flex";
        document.getElementById("registro").style.display = "none";
    }
    else{
        document.getElementById("cerrar").style.display = "none";
        document.getElementById("registro").style.display = "flex";
    }
}
