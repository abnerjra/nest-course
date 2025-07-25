<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Teslo API

## 📚 Documentación relacionada

* [NestJS](https://docs.nestjs.com/)
* [TypeORM](https://typeorm.io/docs/getting-started)
* [Docker](https://docs.docker.com/get-started/)


## 🧠 ¿Qué aprenderemos?

A lo largo del desarrollo del proyecto, pondrás en práctica los siguientes conceptos:

* Uso de Docker para levantar los servicios necesarios.
* Uso de TypeORM.
* Creación de esquemas mediante TypeORM.
* Conexión a una base de datos PostgreSQL.
* Manejo de transacciones.
* Relaciones entre tablas.
* Implementación de DTOs (Data Transfer Objects).
* Implementación de Entities
* Uso de queryBuilder.
* Uso del patrón adaptador.
* Use del patrón repository
* Desarrollo de operaciones CRUD.
* Uso de variables de entorno.
* Autenticación de usuarios.
* Uso de JWT.
* Manejo de roles.
* Manejo de decoradores.

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

6. Ejecutar seeder

    ```bash
    http://localhost:3000/api/seed
    ```
