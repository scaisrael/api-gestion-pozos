const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3008;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'gestion_pozos';

let db, pozosCollection;

// Conexión a MongoDB Atlas de forma robusta
MongoClient.connect(MONGO_URI)
    .then(client => {
        db = client.db(DB_NAME);
        pozosCollection = db.collection('pozos');
        console.log("🟢 Conectado exitosamente a la base de datos de MongoDB");
    })
    .catch(error => {
        console.error("🔴 Error al conectar a MongoDB:", error);
    });

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Gestión de Pozos 🛢️💧');
});

// 1. GET: Obtener todos los pozos
app.get('/api/pozos', async (req, res) => {
    try {
        if (!pozosCollection) {
            return res.status(503).json({ mensaje: "La base de datos aún se está conectando, intenta de nuevo en unos segundos." });
        }
        const pozos = await pozosCollection.find({}).toArray();
        res.json(pozos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los pozos", error: error.message });
    }
});

// 2. GET: Obtener un pozo por ID
app.get('/api/pozos/:id', async (req, res) => {
    try {
        if (!pozosCollection) {
            return res.status(503).json({ mensaje: "La base de datos aún se está conectando, intenta de nuevo en unos segundos." });
        }
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ mensaje: "El ID proporcionado no es válido" });
        }

        const pozo = await pozosCollection.findOne({ _id: new ObjectId(id) });
        if (!pozo) {
            return res.status(404).json({ mensaje: "Pozo no encontrado" });
        }

        res.json(pozo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar el pozo", error: error.message });
    }
});

// 3. POST: Crear un nuevo pozo
app.post('/api/pozos', async (req, res) => {
    try {
        if (!pozosCollection) {
            return res.status(503).json({ mensaje: "La base de datos aún se está conectando, intenta de nuevo en unos segundos." });
        }
        const nuevoPozo = req.body;

        if (!nuevoPozo.nombre || !nuevoPozo.ubicacion) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios (nombre, ubicacion)" });
        }

        const resultado = await pozosCollection.insertOne(nuevoPozo);
        res.status(201).json({ 
            mensaje: "Pozo creado exitosamente", 
            id: resultado.insertedId,
            pozo: nuevoPozo 
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el pozo", error: error.message });
    }
});

// 4. PUT: Actualizar un pozo por ID
app.put('/api/pozos/:id', async (req, res) => {
    try {
        if (!pozosCollection) {
            return res.status(503).json({ mensaje: "La base de datos aún se está conectando, intenta de nuevo en unos segundos." });
        }
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ mensaje: "El ID proporcionado no es válido" });
        }

        const datosActualizados = req.body;
        const resultado = await pozosCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: datosActualizados }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ mensaje: "Pozo no encontrado para actualizar" });
        }

        res.json({ mensaje: "Pozo actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el pozo", error: error.message });
    }
});

// 5. DELETE: Eliminar un pozo por ID
app.delete('/api/pozos/:id', async (req, res) => {
    try {
        if (!pozosCollection) {
            return res.status(503).json({ mensaje: "La base de datos aún se está conectando, intenta de nuevo en unos segundos." });
        }
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ mensaje: "El ID proporcionado no es válido" });
        }

        const resultado = await pozosCollection.deleteOne({ _id: new ObjectId(id) });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ mensaje: "Pozo no encontrado para eliminar" });
        }

        res.status(200).json({ mensaje: "Pozo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el pozo", error: error.message });
    }
});

// Ruta 404
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de Gestión de Pozos corriendo en http://localhost:${PORT}`);
});