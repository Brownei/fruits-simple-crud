import express from 'express';
import { getAllFruits, createFruit, deleteFruit, getOneFruit } from './fruits.handler';

const router = express.Router();

router.get('/', getAllFruits);
router.post('/', createFruit);
router.delete('/:name', deleteFruit);
router.get('/:name', getOneFruit);

export default router;
