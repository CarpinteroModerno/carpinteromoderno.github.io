const imagenes = document.querySelectorAll('.card');
const btnTodos = document.querySelector('.todos');
const btnMaquinas = document.querySelector('.maquinas');
const btnInalambricos = document.querySelector('.inalambricos');
const btnManuales = document.querySelector('.manuales');
const contenedorProductos = document.querySelector('.productos');
document.addEventListener('DOMContentLoaded', ()=>{
    productosInicio();
});

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen=>{
    observer.observe(imagen);
});

const productosInicio = () =>{
    let productosArreglo = [];
    const productosCatalogo = document.querySelectorAll('.row');

    productosCatalogo.forEach(productoCatalogo=> productosArreglo = [...productosArreglo,productoCatalogo]);
    
    const maquinas = productosArreglo.filter(maquina => maquina.getAttribute('data-producto') === 'maquina');
    const inalambricos = productosArreglo.filter(inalambrico => inalambrico.getAttribute('data-producto') === 'inalambrico');
    const manuales = productosArreglo.filter(manual => manual.getAttribute('data-producto') === 'manual');

    mostrarProductos(maquinas, inalambricos, manuales, productosArreglo);
}

const mostrarProductos = (maquinas, inalambricos, manuales, todos) =>{
    btnMaquinas.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        maquinas.forEach(maquina=> contenedorProductos.appendChild(maquina));
    });
    btnInalambricos.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        inalambricos.forEach(inalambrico=> contenedorProductos.appendChild(inalambrico));
    });
    btnManuales.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        manuales.forEach(manual=> contenedorProductos.appendChild(manual));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        todos.forEach(todo=> contenedorProductos.appendChild(todo));
    })
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}