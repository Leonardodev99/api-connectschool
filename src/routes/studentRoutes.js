import { Router } from 'express';
import StudentController from '../controllers/StudentController';
import StudentAdvancedController from '../controllers/StudentAdvancedController';
import upload from '../middlewares/upload';

const router = new Router();

router.post('/', StudentController.store);
router.post('/:id/photo', upload.single('file'), StudentController.uploadPhoto);

router.get('/', StudentController.index);

// Aluno
router.get('/:studentId/grades', StudentAdvancedController.grades);
router.get('/:studentId/report', StudentAdvancedController.report);
router.get('/:studentId/submissions', StudentAdvancedController.submissions);

router.get('/:id', StudentController.show);
router.put('/:id', StudentController.update);
router.delete('/:id', StudentController.delete);

export default router;
