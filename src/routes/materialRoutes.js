import { Router } from 'express';
import MaterialController from '../controllers/MaterialController.js';

const router = new Router();

router.post('/', MaterialController.store);
router.get('/', MaterialController.index);
router.get('/:id', MaterialController.show);
router.put('/:id', MaterialController.update);
router.delete('/:id', MaterialController.delete);

export default router;
