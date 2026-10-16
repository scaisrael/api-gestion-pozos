# 🛢️ API de Gestión de Pozos

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB Atlas** para la gestión integral de pozos (petroleros o de agua), permitiendo realizar operaciones CRUD completas con manejo de códigos de estado HTTP y control de errores.

---

## 📋 Tabla de Endpoints

| Método | Endpoint | Descripción | Código de Estado Éxito | Códigos de Error Posibles |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Ruta raíz de bienvenida a la API. | `200 OK` | - |
| **GET** | `/api/pozos` | Obtiene la lista completa de todos los pozos registrados. | `200 OK` | `500 Internal Server Error` |
| **GET** | `/api/pozos/:id` | Obtiene un pozo específico buscando por su ID de MongoDB. | `200 OK` | `400 Bad Request`, `404 Not Found`, `500` |
| **POST** | `/api/pozos` | Crea y registra un nuevo pozo en la base de datos. | `201 Created` | `400 Bad Request`, `500 Internal Server Error` |
| **PUT** | `/api/pozos/:id` | Actualiza por completo o parcialmente un pozo existente según su ID. | `200 OK` | `400 Bad Request`, `404 Not Found`, `500` |
| **DELETE** | `/api/pozos/:id` | Elimina un pozo de la base de datos utilizando su ID. | `200 OK` | `400 Bad Request`, `404 Not Found`, `500` |

---

## 🚀 Ejemplos de Peticiones y Respuestas (JSON)

### 1. Crear un pozo (`POST /api/pozos`)
* **Body (JSON):**
  ```json
  {
    "nombre": "Pozo Norte 01",
    "ubicacion": "Cuenca Norte",
    "profundidad": 2500,
    "estado": "Activo"
  }
### Respuesta Exitosa (201 Created):
[cite: 9]
JSON
{
  "mensaje": "Pozo creado exitosamente",
  "pozo": {
    "nombre": "Pozo Norte 01",
    "ubicacion": "Cuenca Norte",
    "profundidad": 2500,
    "estado": "Activo"
  }
}
### 2. Obtener todos los pozos (GET /api/pozos)
### Respuesta Exitosa (200 OK):
JSON
[
  {
    "_id": "6ad161cf46b7b10ea1ebd592",
    "nombre": "Pozo Norte 01",
    "ubicacion": "Cuenca Norte",
    "profundidad": 2500,
    "estado": "Activo"
  }
]
### 3. Actualizar un pozo (PUT /api/pozos/:id)
Body (JSON):

JSON
{
  "estado": "En Mantenimiento"
}
Respuesta Exitosa (200 OK):

JSON
{
  "mensaje": "Pozo actualizado correctamente"
}
### 4. Eliminar un pozo (DELETE /api/pozos/:id)
Respuesta Exitosa (200 OK):

JSON
{
  "mensaje": "Pozo eliminado correctamente"
  }