import express from 'express';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(express.json());
app.use('/', taskRoutes);

export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
}