# Vue.js, Node.js y MySQL CRUD App

Este proyecto es una aplicación de CRUD (Crear, Leer, Actualizar, Eliminar) utilizando Vue.js en el frontend, Node.js en el backend y MySQL como base de datos. La aplicación permite a los usuarios realizar operaciones CRUD sobre los datos almacenados en la base de datos.

## Descripción

Esta aplicación está diseñada para gestionar registros en una base de datos MySQL. El frontend está construido con Vue.js, mientras que el backend está desarrollado con Node.js utilizando Express. Los datos se almacenan y gestionan en MySQL.

### Características:

- **Frontend:** Vue.js
  - Interfaz de usuario interactiva.
  - Formularios para crear, leer, actualizar y eliminar registros.
  - Visualización dinámica de los datos.

- **Backend:** Node.js con Express
  - API RESTful para manejar las solicitudes HTTP (GET, POST, PUT, DELETE).
  - Conexión a la base de datos MySQL para realizar operaciones CRUD.

- **Base de datos:** MySQL
  - Gestión de los registros en una base de datos MySQL.

## Tecnologías utilizadas

- **Frontend:**
  - Vue.js
  - Vue Router (para navegación entre páginas)
  - Axios (para hacer solicitudes HTTP al backend)

- **Backend:**
  - Node.js
  - Express.js
  - MySQL

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/LiderSalinas/vue-node-mysql.git

## 2. Configurar la base de datos

Asegúrese de tener MySQL instalado y configurado. Crea una base de datos con las tablas necesarias para que el backend pueda interactuar con ella. Aquí te dejo un ejemplo de cómo puedes crear una base de datos y una tabla de ejemplo:

sql

Copiar código
CREATE DATABASE vue_node_mysql;

USE vue_node_mysql;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
##3. Back-end
Navega a la carpeta backendy ejecuta el siguiente comando para instalar las dependencias:
intento

Copiar código
cd backend
npm install
Asegúrese de configurar las credenciales de su base de datos en el archivo de configuración correspondiente en el backend. Aquí te dejo un ejemplo de cómo podrías configurar la conexión en el archivo config.js:
Javascript

Copiar código
module.exports = {
  db: {
    host: 'localhost',
    user: 'root', // tu usuario de MySQL
    password: '', // tu contraseña de MySQL
    database: 'vue_node_mysql',
  },
};
Luego, inicia el servidor:
intento

Copiar código
npm start
El backend estará corriendo en el puerto configurado (por defecto, puede ser http://localhost:3000).

##4. Interfaz
Navega a la carpeta frontendy ejecuta el siguiente comando para instalar las dependencias:
intento

Copiar código
cd frontend
npm install
Luego, inicia el servidor de desarrollo:
intento

Copiar código
npm run serve
La interfaz estará disponible en http://localhost:8080.

Uso
Una vez que el frontend y el backend estén funcionando, podrás acceder a la aplicación en tu navegador. La interfaz te permitirá realizar operaciones CRUD sobre los registros en la base de datos.

Las operaciones disponibles incluyen:

Crear: Agregar un nuevo registro.
Leer: Ver todos los registros existentes.
Actualizar: Modificar un registro existente.
Eliminar: Eliminar un registro.
##Contribuciones
Si deseas contribuir a este proyecto, puedes hacerlo mediante un pull request. Cualquier mejora es bienvenida.
