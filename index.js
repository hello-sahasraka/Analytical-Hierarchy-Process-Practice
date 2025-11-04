import express from 'express';
// import ahpRouter from './src/routes/dataDrivenAHPRoutes.js';

const app = express();
const port = 5000;

app.use(express.json());

// app.use("/api/v1", ahpRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

