import { Router } from 'express';

import GuardianController from '../controllers/GuardianController';

const router = new Router();

router.post('/', GuardianController.store);
router.get('/', GuardianController.index);

router.get('/:id', GuardianController.show);

router.put('/:id', GuardianController.update);
router.delete('/:id', GuardianController.delete);

export default router;
