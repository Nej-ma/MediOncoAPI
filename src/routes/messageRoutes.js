// src/routes/messageRoutes.js

import { Router } from 'express';
const router = Router();
import { getMessagesByThreadId, getMessageById, createMessage, deleteMessage } from '../controllers/messageController.js';
import authenticateToken from '../middleware/authenticateToken.js';

router.get('/thread/:threadId', authenticateToken, getMessagesByThreadId);
router.get('/:id', authenticateToken, getMessageById);
router.post('/', authenticateToken, createMessage);
router.delete('/:id', authenticateToken, deleteMessage);

export default router;
