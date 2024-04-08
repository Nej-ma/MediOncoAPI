import pool from '../config/db.js';

// src/DAO/messageDAO.js


const messageDAO = {
    findAllByThreadId: async (threadId) => {
        const { rows } = await pool.query('SELECT * FROM Messages WHERE thread_id = $1 AND deleted_at IS NULL', [threadId]);
        return rows;
    },

    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM Messages WHERE id = $1', [id]);
        return rows[0];
    },

    create: async (messageData) => {
        const { threadId, senderId, content, sendDate } = messageData;
        const { rows } = await pool.query(
            'INSERT INTO Messages (thread_id, sender_id, content, send_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [threadId, senderId, content, sendDate || 'NOW()']
        );
        return rows[0];
    },

    delete: async (id) => {
        const { rowCount } = await pool.query('DELETE FROM Messages WHERE id = $1', [id]);
        return rowCount > 0;
    },
    softDelete: async (id) => {
        await pool.query('UPDATE Messages SET deleted_at = NOW() WHERE id = $1', [id]);
    },
    
    restore: async (id) => {
        await pool.query('UPDATE Messages SET deleted_at = NULL WHERE id = $1', [id]);
    },
};

export default messageDAO;
