import { Router } from 'express';
import SubmissionController from '../controllers/SubmissionController.js';
import SubmissionAdvancedController from '../controllers/SubmissionAdvancedController';

const router = new Router();

router.post('/', SubmissionController.store);
router.get('/', SubmissionController.index);
// Submissões
router.get('/pending', SubmissionAdvancedController.pending);

router.get('/:id', SubmissionController.show);
router.put('/:id', SubmissionController.update);
router.delete('/:id', SubmissionController.delete);

export default router;
