import { Router } from 'express';
import TeacherController from '../controllers/TeacherController.js';
import TeacherAdvancedController from '../controllers/TeacherAdvancedController';

const router = new Router();

router.post('/', TeacherController.store);
router.get('/', TeacherController.index);
router.get('/:id', TeacherController.show);
// Professor
router.get('/:teacherId/submissions/pending', TeacherAdvancedController.pendingSubmissions);
router.get('/:teacherId/submissions/graded', TeacherAdvancedController.gradedSubmissions);
router.get('/:teacherId/grades', TeacherAdvancedController.gradesByTeacher);

router.put('/:id', TeacherController.update);
router.delete('/:id', TeacherController.delete);

export default router;
