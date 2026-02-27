import { Router } from 'express';
import StudentController from '../controllers/StudentController.js';
import StudentAdvancedController from '../controllers/StudentAdvancedController';

const router = new Router();

router.post('/', StudentController.store);
router.get('/', StudentController.index);
router.get('/:id', StudentController.show);

// Aluno
router.get('/:studentId/grades', StudentAdvancedController.grades);
router.get('/:studentId/report', StudentAdvancedController.report);
router.get('/:studentId/submissions', StudentAdvancedController.submissions);


router.put('/:id', StudentController.update);
router.delete('/:id', StudentController.delete);

export default router;
