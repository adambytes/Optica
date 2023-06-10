import cors from 'cors';
import express, { NextFunction, type Request, type Response } from 'express';
import imageRouter from './routes/imageRouter';
import imageController from './controllers/imageController';
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.use('/images', imageRouter);

// route to search for images based on a given keyword
app.get('/search', imageController.getSearchFromSQL, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.urls);
});

// catch-all route handler for any requests to an unknown route
app.use((req: Request, res: Response) =>
  res.status(404).send("This is not the page you're looking for...")
);

// Global error handler -- CHANGE TO NOT SHOW CLIENT ANYTHING TOO SPECIFIC, BUT RATHER SHOW A GENERIC CONSOLE LOG FOR NOW. CAN CHANGE TO AN ERROR PAGE/RESPONSE LATER?
app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
  console.log(err);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
