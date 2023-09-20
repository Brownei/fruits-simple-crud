import { Router } from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import fruits from './fruits/fruits.route';

const router = Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Connected successfully!',
  });
});

router.use('/fruits', fruits);

export default router;
