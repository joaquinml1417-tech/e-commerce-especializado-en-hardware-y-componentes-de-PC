Entrega Actividad N° 4: Seguridad y Persistencia en Base de Datos (MongoDB)

Seguridad: Implementación de encriptación de contraseñas mediante bcrypt y sistema de autenticación basado en JWT (JSON Web Tokens) para proteger las rutas críticas (compras).

Persistencia: Migración completa de archivos JSON a una base de datos NoSQL con MongoDB, asegurando la integridad de los datos de usuarios y ventas.

Integración: El flujo de autenticación, desde el registro hasta la compra, está totalmente validado y conectado al Back-end.

UI: Se ha añadido el footer solicitado en la interfaz para mejorar la presentación final.


Entrega 3: Integración Full-Stack (MonoRepo)

En esta fase final, se consolidó la aplicación vinculando el servidor (Back-end) con una interfaz de usuario dinámica (Front-end), aplicando un modelo de MonoRepo para una organización profesional del código.

Arquitectura MonoRepo: Separación estricta de responsabilidades en los directorios /client (vistas y lógica de navegador) y /server (API y persistencia).

Interfaz de Usuario Dinámica: * Listado de productos generado mediante consumo asíncrono de la API.

Buscador inteligente y filtrado por categorías en tiempo real.

Uso de Modales para la gestión de Carrito e Inicio de Sesión, mejorando la UX sin recargas de página.

Persistencia Híbrida: * LocalStorage: Gestión del estado del carrito y la sesión del usuario en el navegador para garantizar persistencia entre recargas.

Back-end: Procesamiento de órdenes de compra mediante peticiones POST que impactan en ventas.json.

Seguridad y Lógica de Negocio: Se implementaron validaciones que impiden agregar productos o finalizar compras sin una sesión de usuario activa.


Entrega 2: E-commerce de Hardware

En esta fase, el proyecto ha evolucionado de un script plano a una API profesional modular y asíncrona, siguiendo estrictamente los lineamientos de JavaScript moderno (ES6) y las buenas prácticas de desarrollo en Node.js.

Configuración del Servidor y Arquitectura:

Entorno: Configurado para módulos de ES6 ("type": "module").

Modularización (Express Router): Se implementó una arquitectura de carpetas dividiendo la lógica en el directorio /routes. Se crearon archivos independientes (productos.routes.js y usuarios.routes.js) para gestionar cada entidad de forma aislada, mejorando la escalabilidad del código.

Persistencia Asíncrona (JS Moderno): Se migró el manejo de archivos al módulo fs/promises. Todas las operaciones de lectura de los archivos JSON se realizan mediante async/await, garantizando que el servidor sea no bloqueante y eficiente.

Rutas (Endpoints) desarrolladas:

GET /productos: Consulta asíncrona del catálogo completo.

GET /usuarios: Obtención de la lista de usuarios mediante promesas.

POST /productos: Simulación de carga de nuevos componentes.

POST /login: Gestión segura de datos sensibles (email/password) en el cuerpo de la petición.

PUT /productos/:id: Actualización dinámica de registros basada en parámetros de ruta.

DELETE /usuarios/:id: Eliminación con validación de seguridad.

Integridad Referencial:
Se implementó una validación lógica robusta en la ruta DELETE. El sistema verifica de forma asíncrona en ventas.json si el usuario posee transacciones relacionadas. De existir una relación, el servidor responde con un código de estado 400 (Bad Request) y un mensaje de error.

Alumno: Joaquín Muñoz Lopez
Carrera: Tecnicatura Superior en Análisis de Sistemas
Año: 2026


Entrega 1: Estructuras de Datos JSON - E-commerce de Hardware

Contexto de Negocio:

Este proyecto simula la estructura de datos básica para una plataforma de venta de componentes de PC y hardware. Se han definido tres entidades principales que permiten gestionar usuarios, catálogo de productos y el registro de transacciones comerciales.

Archivos Incluidos:

El repositorio contiene tres archivos JSON interrelacionados:

1.  usuarios.json: Contiene la información de los clientes registrados.
    Campos: ID, nombre, apellido, email, contraseña y estado premium (boolean).

2.  productos.json: Listado de componentes de hardware disponibles.
    Campos: ID, nombre, descripción, precio (numérico), imagen y disponibilidad de stock (boolean).

3.  ventas.json: Registro de compras realizadas.
    Campos: ID de venta, relación con el ID de usuario, fecha, total, dirección y un array de objetos con los productos adquiridos.

Relación de los Datos:

Las ventas se vinculan con los usuarios a través del campo id_usuario.

El detalle de productos dentro de cada venta se vincula con el catálogo mediante el id_producto.


Alumno: Joaquín Muñoz Lopez  
Carrera: Tecnicatura Superior en Análisis de Sistemas  
Año: 2026

