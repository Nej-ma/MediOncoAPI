import messageThreadDAO from '../DAO/messageThreadDAO.js';

// src/controllers/messageThreadController.js


export const getAllMessageThreads = async (req, res, next) => {
    try {
        const threads = await messageThreadDAO.findAll();
        res.json(threads);
    } catch (error) {
        next(error);
    }
};

export const getMessageThreadById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const thread = await messageThreadDAO.findById(id);
        if (thread) {
            res.json(thread);
        } else {
            res.status(404).send('Message Thread not found');
        }
    } catch (error) {
        next(error);
    }
};

export const createMessageThread = async (req, res, next) => {
    try {
        const newThread = await messageThreadDAO.create(req.body);
        res.status(201).json(newThread);
    } catch (error) {
        next(error);
    }
};

export const deleteMessageThread = async (req, res, next) => {
    try {
        const id = req.params.id;
        const success = await messageThreadDAO.softDelete(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Message Thread not found');
        }
    } catch (error) {
        next(error);
    }
};

export const restoreMessageThread = async (req, res, next) => {
    try {
        const id = req.params.id;
        const success = await messageThreadDAO.restore(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Message Thread not found');
        }
    } catch (error) {
        next(error);
    }
};
