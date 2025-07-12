<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Teslo API

## 🧠 ¿Qué aprenderemos?

A lo largo del desarrollo del proyecto, pondrás en práctica los siguientes conceptos:

* Uso de Docker para levantar los servicios necesarios.
* Uso de TypeORM.
* Creación de esquemas mediante TypeORM.
* Conexión a una base de datos PostgreSQL.
* Manejo de transacciones.
* Implementación de DTOs (Data Transfer Objects).
* Implementación de Entities
* Uso de queryNuilder.
* Uso del patrón adaptador.
* Use del patrón repository
* Desarrollo de operaciones CRUD.
* Uso de variables de entorno.

## 🚀 ¿Cómo ejecutar el proyecto?

1. Instalar dependencias de desarrollo

    ```bash
    npm install
    ```

2. Crear archivo `.env` a partir del archivo `.env.template`
3. Configurar las variables de entorno
4. Levantar base de datos

    ```bash
    docker compose up -d
    ```

5. Levantar aplicación en modo desarrollo

    ```bash
    npm run start:dev
    ```
