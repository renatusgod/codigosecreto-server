import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './api/routes/router'; // Importando o roteador

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usando o roteador
app.use(router);

export { app };
