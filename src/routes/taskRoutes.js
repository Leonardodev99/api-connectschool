import { Router } from 'express';
import TaskController from '../controllers/TaskController.js';

const router = new Router();

router.post('/', TaskController.store);
router.get('/', TaskController.index);
router.get('/:id', TaskController.show);

router.get('/:id/submissions', TaskController.show);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;
