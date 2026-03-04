import { Router } from 'express';
import AttendanceController from '../controllers/AttendanceController';

const router = new Router();

router.post('/', AttendanceController.store);
router.post('/bulk', AttendanceController.bulkCreate);
router.get('/', AttendanceController.index);
router.get('/:id', AttendanceController.show);
router.put('/:id', AttendanceController.update);
router.delete('/:id', AttendanceController.delete);


export default router;
