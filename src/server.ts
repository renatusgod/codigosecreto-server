import mongoose from 'mongoose';
import { app } from './app';
import { createServer } from 'http';

const PORT = 4001;
const MONGO_URI = 'mongodb://localhost:27017/codigosecreto';

const httpServer = createServer(app);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
