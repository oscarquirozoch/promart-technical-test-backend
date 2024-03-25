# Prueba técnica Promart - Backend

### Descripción de proyecto

El proyecto se basa en desarrollar un mantenimiento de clientes, cuenta con las funciones de Crear, Editar, Eliminar y Buscar. Para el desarrollo 
sé usaron las siguientes tecnologías:

- AdonisJs
- VineJs
- Swagger
- Lucid 
- MySQL

### Como levantar el proyecto

1. Tener instalado NodeJS
2. Tener instalado un servidor de base de datos para MySQL
2. Clonar el proyecto en su computador
3. Abrir el proyecto en un editor de código
4. Abrir una terminal de comando y ejecutar el comando `npm install`
5. Crear el archivo .env y añadir las siguientes variables

    ``
      TZ=
      PORT=
      HOST=localhost
      LOG_LEVEL=info
      APP_KEY=
      NODE_ENV=development
      DB_HOST=
      DB_PORT=
      DB_USER=
      DB_PASSWORD=
      DB_DATABASE=
  ``
6. Una vez configurada la conexión a la base de datos desde las variables de entorno, ejecutar el comando `node ace migration:run`; este creará las tablas en la base de datos
6. Ejecutar el comando `npm run dev` para levantar el servidor local