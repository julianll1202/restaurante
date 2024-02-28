# Tutorial de instalación
## Clonar el repositorio
En una carpeta vacia utiliza el comando git clone

`` git clone https://github.com/julianll1202/restaurante.git ``

## Base de datos
En el servidor de MySQL crear una base de datos llamada **restaurant**. (Si, el nombre esta en ingles).

## Backend
Entrar a la carpeta backend y abrir una terminal, luego hay que ejecutar el comando `` npm install ``.
Crear un archivo **.env** siguiendo la estructura del archivo **.env.template**.

Una vez que el archivo **.env** este completo, en una terminal dentro de la carpeta **backend** ejecutar los comandos
`` npx prisma migrate dev `` -- Esto generara las tablas en la base de datos

`` npm run dev `` -- Esto corre el servidor.

## Frontend
Entrar a la carpeta frontend y abrir una terminal, después ejecutar el comando 
`` npm install `` .

Una vez que se terminen de descargar los paquetes, ejecutar el comando `` npm run dev ``.

## Inicio de sesión
En la tabla **roles** crear un registro llamado *Administrator*.

`` INSERT INTO roles VALUES (DEFAULT, 'Administrator'); ``

En la tabla **users** crear un registro llamado *admin*.

`` INSERT INTO roles VALUES (DEFAULT, 'admin', 'admin', 1); ``

***El servidor de backend puede funcionar por si solo, pero el servidor de frontend requiere de la conexion al servidor de backend para poder trabajar debido a que se necesita iniciar sesión para acceder al sistema***