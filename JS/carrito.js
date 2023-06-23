class Carrito {
    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar')) {
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
        if (productosLS === infoProducto.id) {
            Swal.fire({
                icon: 'info',
                title: 'SOBRE EL CARRITO',
                text: 'El producto ya está agregado',
                timer: 2000,
                showConfirmButton: false
            })
        }
        else {
            this.insertarCarrito(infoProducto);
        }
    }
    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td id="subprecio">$ ${Number(producto.precio).toFixed(2)}</td>
            <td><a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a></td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLS(producto);
    }

    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLS(productoID);
        this.calcularTotal();
    }

    vaciarCarrito(e) {
        e.preventDefault();
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLS();
        return false;
    }

    guardarProductosLS(producto) {
        let productos;
        productos = this.obtenerProductosLS();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLS() {
        let productoLS;
        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    eliminarProductoLS(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === productoID) {
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }
    leerLS() {
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>$ ${Number(producto.precio).toFixed(2)}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    leerLSCompra() {
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>$ ${Number(producto.precio).toFixed(2)}</td>
                <td class="td-cantidad">
                    <input type="number" class="form-control cantidad" id="in-cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>$ ${Number(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    vaciarLS() {
        localStorage.clear();
    }

    procesarPedido(e) {
        e.preventDefault();
        if (this.obtenerProductosLS().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'ACCESO DENEGADO',
                text: 'El carrito está vacío',
                timer: 2000,
                showConfirmButton: false
            })
        }
        else {
            location.href = "../compra.html";
        }
    }

    calcularTotal() {
        let productoLS;
        let total = 0, subtotal = 0, iva = 0;
        productoLS = this.obtenerProductosLS();
        for (let i = 0; i < productoLS.length; i++) {
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }
        iva = parseFloat(total * 0.16).toFixed(2);
        subtotal = parseFloat(total - iva).toFixed(2);

        document.getElementById("subtotal").innerHTML = "$ " + subtotal;
        document.getElementById("IVA").innerHTML = "$ " + iva;
        document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        producto = e.target.parentElement.parentElement;
        id = producto.querySelector('a').getAttribute('data-id');
        cantidad = producto.querySelector('input').value;
        let actualizarMontos = document.querySelectorAll('#subtotales');
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS, index) {
        if (productoLS.id === id) {
            productoLS.cantidad = cantidad;
            actualizarMontos[index].innerHTML = "$ " + Number(cantidad * productosLS[index].precio).toFixed(2);
        }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }
}
