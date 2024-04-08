import messageDAO from '../DAO/messageDAO.js';

// src/controllers/messageController.js


export const getMessagesByThreadId = async (req, res, next) => {
    try {
        const threadId = req.params.threadId;
        const messages = await messageDAO.findAllByThreadId(threadId);
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

export const getMessageById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const message = await messageDAO.findById(id);
        if (message) {
            res.json(message);
        } else {
            res.status(404).send('Message not found');
        }
    } catch (error) {
        next(error);
    }
};

export const createMessage = async (req, res, next) => {
    try {
        const newMessage = await messageDAO.create(req.body);
        res.status(201).json(newMessage);
    } catch (error) {
        next(error);
    }
};

export const deleteMessage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const success = await messageDAO.softDelete(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Message not found');
        }
    } catch (error) {
        next(error);
    }
};

export const restoreMessage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const success = await messageDAO.restore(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Message not found');
        }
    } catch (error) {
        next(error);
    }
};
