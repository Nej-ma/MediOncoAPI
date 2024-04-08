import { Router } from 'express';
const router = Router();
import { getAllMessageThreads, getMessageThreadById, createMessageThread, deleteMessageThread } from '../controllers/messageThreadController.js';
import authenticateToken from '../middleware/authenticateToken.js';


router.get('/',authenticateToken, getAllMessageThreads);
router.get('/:id', authenticateToken,getMessageThreadById);
router.post('/',authenticateToken, createMessageThread);
router.delete('/:id', authenticateToken, deleteMessageThread);

export default router;
