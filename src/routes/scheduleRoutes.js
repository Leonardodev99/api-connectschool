import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController';

const routes = new Router();

routes.post('/', ScheduleController.store);
routes.get('/', ScheduleController.index);
routes.get('/:id', ScheduleController.show);
routes.put('/:id', ScheduleController.update);
routes.delete('/:id', ScheduleController.delete);

export default routes;
