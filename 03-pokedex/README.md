<p align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" width="120" alt="PokeApi Logo" />
</p>

## 📚 Documentación relacionada

* [NestJS](https://docs.nestjs.com/)
* [Docker](https://docs.docker.com/get-started/)
* [MongoDB](https://www.mongodb.com/try/download/community)
* [Moongose](https://mongoosejs.com/docs/guide.html)
* [PokeApi](https://pokeapi.co/)
* [Railway](https://railway.com/)

## 📘 Descripción

Este proyecto, **POKEDEX**, tiene como objetivo explorar el funcionamiento de una API REST utilizando NestJS.

## 🧠 ¿Qué aprenderemos?

A lo largo del desarrollo del proyecto, pondrás en práctica los siguientes conceptos:

* Conexión a una base de datos MongoDB.
* Uso de Docker para levantar los servicios necesarios.
* Implementación de DTOs (Data Transfer Objects).
* Uso del patrón adaptador.
* Desarrollo de operaciones CRUD (Crear, Leer, Actualizar y Eliminar).
* Uso de variables de entorno.
* Mapear variables de entorno (Joi).
* Desplegar proyecto en la nube (railway)
* Creación de **PIPES** personalizados.
    1. Al crear un pipe perzonalizado se recomienda seguir la siguiente estructura de directorio

        ```plaintext
        src/common
            ├── common.controller.ts
            ├── common.module.ts
            ├── common.service.ts
            ├── pipes/
        ```

## ⚙️ Comandos básicos

### 1. Crear un recurso completo

```bash
nest g resource <nombre>
# Ejemplo:
nest g resource seed
```

### 2. Crear un módulo

```bash
nest g mo <ruta/nombre>
# Ejemplo:
nest g mo common
```

### 3. Crear un pipe

```bash
nest g pi <ruta/ruta/nombre>
# Ejemplo:
nest g pi common/pipes/pasrMongoId
```

## 🚀 ¿Cómo ejecutar el proyecto?

1. Clonar el proyecto.
2. Crear archivo **`.env`** a partir del archivo **`.env.template`**
3. Configurar las variables de entorno en el archivo **`.env`**
4. Instalar dependencias

    ```bash
    npm install
    ```

5. Tener instalado NEST CLI

    ```bash
    npm i -g @nestjs/cli
    ```

6. Levantar base de datos

    ```bash
    docker compose up -d
    ```

7. Levantar proyecto en modo desarrollo

    ```bash
    npm run start:dev
    ```

8. Reconstruir base de datos

    ```bash
    http://localhost:3000/api/v2/seed
    ```

## 🚀 Levantar el proyecto en modo producción con docker

1. Crear el archivo **`.env.prod`**
2. Llenar las variables de entorno.
3. Crear la nueva imagen

    ```bash
    docker compose -f docker-compose.prod.yml --env-file .env.prod up --build
    ```
