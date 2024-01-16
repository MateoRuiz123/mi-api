import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './v1/routes/userRoutes';

export const app = express();
export const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb+srv://teoruiz:14122004@cluster0.rro0mjn.mongodb.net/apiJoi');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
	console.log('Conexión exitosa a MongoDB');
});

app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);