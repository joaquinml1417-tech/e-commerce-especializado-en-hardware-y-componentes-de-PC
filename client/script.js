const API_URL = 'http://localhost:3000';

let productosBase = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedor = document.getElementById('contenedor-productos');
const inputSearch = document.getElementById('input-search');
const contadorCarrito = document.getElementById('contador-carrito');
const linkLogin = document.getElementById('link-login');
const formLogin = document.getElementById('form-login');
const formRegistro = document.getElementById('form-registro');
const btnComprar = document.getElementById('btn-comprar');

async function obtenerProductos() {
    try {
        const respuesta = await fetch(`${API_URL}/productos`); 
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
        
        const datos = await respuesta.json();
        productosBase = datos;
        renderizarProductos(productosBase); 
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

function renderizarProductos(productos) {
    if (!contenedor) return;
    contenedor.innerHTML = "";
    
    productos.forEach(prod => {
        if (!prod.nombre) return; 

        const precio = prod.precio ? prod.precio.toLocaleString('es-AR') : "0";
        const imagen = prod.imagen || "img/placeholder.jpg";
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${imagen}" alt="${prod.nombre}">
            <div class="info">
                <h3>${prod.nombre}</h3>
                <p class="precio">$ ${precio}</p>
                <button class="btn-add" onclick="agregarAlCarrito('${prod._id}')">Agregar al carrito</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

function filtrar(categoria) {
    if (categoria === 'todos') {
        renderizarProductos(productosBase);
    } else {
        const filtrados = productosBase.filter(p => p.categoria === categoria);
        renderizarProductos(filtrados);
    }
}

if (inputSearch) {
    inputSearch.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        const filtrados = productosBase.filter(p => 
            p.nombre.toLowerCase().includes(termino)
        );
        renderizarProductos(filtrados);
    });
}

function agregarAlCarrito(id) {
    if (!localStorage.getItem('usuario')) {
        alert("⚠️ Debes iniciar sesión para agregar productos.");
        abrirModal('modal-login');
        return;
    }
    const producto = productosBase.find(p => p._id == id);
    if (producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContador();
        alert(`¡${producto.nombre} añadido!`);
    }
}

function actualizarContador() {
    if (contadorCarrito) contadorCarrito.innerText = carrito.length;
}

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
}

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = formLogin.querySelector('input[type="email"]').value;
        const password = formLogin.querySelector('input[type="password"]').value;

        try {
            const res = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('usuario', data.usuario);
                localStorage.setItem('token_jwt', data.token);
                cerrarModal('modal-login');
                actualizarInterfazUsuario();
            } else {
                alert(data.error);
            }
        } catch (err) { alert("Error al conectar"); }
    });
}

if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('reg-nombre').value;
        const apellido = document.getElementById('reg-apellido').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        try {
            const res = await fetch(`${API_URL}/usuarios/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, apellido, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                alert("🎉 Registro exitoso");
                cerrarModal('modal-registro');
                abrirModal('modal-login');
            } else {
                alert(data.error);
            }
        } catch (err) { alert("Error al registrar"); }
    });
}

if (btnComprar) {
    btnComprar.onclick = async () => {
        const token = localStorage.getItem('token_jwt');
        
        if (!token) { 
            alert("Debes iniciar sesión"); 
            return; 
        }

        const orden = {
            productos: carrito.map(p => ({ id_producto: p._id, cantidad: 1 })),
            total: carrito.reduce((acc, p) => acc + (p.precio || 0), 0)
        };

        try {
            const res = await fetch(`${API_URL}/ventas/comprar`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token 
                },
                body: JSON.stringify(orden)
            });

            const data = await res.json(); 

            if (res.ok) {
                alert("🛒 " + data.mensaje);
                carrito = [];
                localStorage.removeItem('carrito');
                actualizarContador();
                cerrarModal('modal-carrito');
            } else {
                alert("Error: " + data.error); 
            }
        } catch (err) { 
            alert("Error de conexión con el servidor"); 
        }
    };
}

function actualizarInterfazUsuario() {
    const usuario = localStorage.getItem('usuario');
    if (usuario && linkLogin) {
        linkLogin.innerHTML = `👤 ${usuario} | <span onclick="logout()" style="cursor:pointer; color:#00d4ff;">Salir</span>`;
    }
}

function logout() {
    localStorage.clear();
    window.location.reload();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    if (!listaCarrito) return;
    
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((prod, index) => {
        total += prod.precio;
        listaCarrito.innerHTML += `
            <div class="carrito-item" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <p>${prod.nombre} - $${prod.precio.toLocaleString('es-AR')}</p>
                <button onclick="eliminarDelCarrito(${index})" style="background: red; color: white; border: none; cursor: pointer;">❌</button>
            </div>
        `;
    });

    totalCarrito.innerText = `$ ${total.toLocaleString('es-AR')}`;
    abrirModal('modal-carrito');
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    mostrarCarrito();
}

obtenerProductos();
actualizarContador();
actualizarInterfazUsuario();