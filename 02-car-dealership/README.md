# Proyecto Car Dealership

Proyecto inicial para aprender el funcionamiento de **NestJS** a través del desarrollo de un CRUD.

---

## 🧠 ¿Qué aprenderemos?

En este primer contacto con NestJS, exploraremos los siguientes conceptos:

- Creación de módulos
- Creación de controladores
- Creación de servicios
- Uso de decoradores
- Uso de Pipes
- Uso de Exception Filters
- Uso de DTO (Data Transfer Object)
- Uso de class-validator
- Uso de Pipes a nivel aplicación
- Uso de el principio DRY (Don't repeat yourself)
- Consumo de seeders
- Dependencias entre modulos

---

## ⚙️ Comandos básicos

### 1. Crear un módulo

```bash
nest g mo <ruta/nombre>
# Ejemplo:
nest g mo car
```

### 2. Crear un controlador

```bash
nest g co <ruta/nombre>
# Ejemplo:
nest g co car
```

### 3. Crear un servicio

```bash
nest g s <ruta/nombre>
# Ejemplo:
nest g s car
```

### 3. Crear un recurso completo

```bash
nest g resource <nombre>
# Ejemplo:
nest g resource seed
```

Este comando creara la siguiente estructura de archivos

```
seed/
├── seed.controller.ts
├── seed.module.ts
├── seed.service.ts
├── dto
│   ├── create-seed.dto.ts
│   └── update-seed.dto.ts
└── entities
    └── seed.entity.ts
```

---

## 🚀 Cómo levantar el proyecto

1. Instalar las dependencias:

    ```bash
    npm i
    ```

2. Iniciar el proyecto en modo desarrollo:

    ```bash
    npm run dev
    ```

3. Ejecutar seeders:

    ```bash
    http://localhost:3000/seed
    ```
