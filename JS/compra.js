const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const nombre = document.getElementById("nombre");
const correo = document.getElementById("email");
const address = document.getElementById("adress");

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLSCompra());
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}

function procesarCompra(e) {
    e.preventDefault();

    if (compra.obtenerProductosLS().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'El carrito está vacío',
            timer: 2000,
            showConfirmButton: false
        }).then(function () {
            window.location = "index.html";
        })
    }
    else if (nombre.value === "" || correo.value === "" || address.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Rellene todos los campos solicitados',
            timer: 2000,
            showConfirmButton: false
        })
    }
    else {
        Swal.fire({
            icon: 'success',
            title: '¡LISTO!',
            text: 'Compra efectuada correctamente',
            timer: 2000,
            showConfirmButton: false
        });

        setTimeout(() => {
            compra.vaciarLS();
            window.location = "index.html";
        }, 3000);
    }
}

/* const customNum = document.querySelectorAll('.td-cantidad');

customNum.forEach(num => {
    const numInput = num.querySelector('.cantidad');
    const arrUp = num.querySelector('.fa-circle-plus');
    const arrDown = num.querySelector('.fa-circle-minus');

    arrUp.addEventListener('click', () => {
        numInput.stepUp();
    });

    arrDown.addEventListener('click', () => {
        numInput.stepDown();
    });
}); */

/* var incremento = document.getElementsByClassName('fa-circle-plus');
var decremento = document.getElementsByClassName('fa-circle-minus');

//Incremento
for(var i = 0; i < incremento.length; i++){
    var button = incremento[i];
    button.addEventListener('click',function(event){
        var buttonClicked = event.target;
        var input = buttonClicked.parentElement.children[1];
        var inputValue = input.value;
        var newValue = parseInt(inputValue) + 1;
        input.value = newValue;
    })
}
//Decremento
for(var i = 0; i < decremento.length; i++){
    var button = decremento[i];
    button.addEventListener('click',function(event){
        var buttonClicked = event.target;
        var input = buttonClicked.parentElement.children[1];
        var inputValue = input.value;
        var newValue = parseInt(inputValue) - 1;
        input.value = newValue;
    })
} */