import { Router } from 'express';
import MessageController from '../controllers/MessageController.js';

const router = new Router();

// Enviar mensagem
router.post('/', MessageController.store);

// Inbox
router.get('/inbox/:userId', MessageController.inbox);

// Marcar como lida
router.put('/:id/read', MessageController.markAsRead);

export default router;
