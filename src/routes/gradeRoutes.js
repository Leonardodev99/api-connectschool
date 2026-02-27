import { Router } from 'express';
import GradeController from '../controllers/GradeController';

const router = new Router();

router.post('/', GradeController.store);
router.get('/', GradeController.index);
router.get('/:id', GradeController.show);
router.put('/:id', GradeController.update);
router.delete('/:id', GradeController.delete);

export default router;
