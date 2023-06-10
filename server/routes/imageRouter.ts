import express, { Request, Response } from 'express';
import imageController from '../controllers/imageController';
const imageRouter = express.Router();

// route to retrieve landing page of images
imageRouter.get('/', imageController.getImageFromSQL, (req: Request, res: Response) => {
  const { urls }: Record<string, any> = res.locals;
  return res.status(200).json(urls);
});

// route to save an image to the SQL database
imageRouter.post('/', imageController.saveImageToSQL, (req: Request, res: Response) => {
  return res.status(200).send('Image saved to database!');
});

export default imageRouter;
