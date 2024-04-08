import pool from '../config/db.js';

// src/DAO/messageThreadDAO.js


const messageThreadDAO = {
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM MessageThreads WHERE deleted_at IS NULL');
        return rows;
    },

    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM MessageThreads WHERE id = $1', [id]);
        return rows[0];
    },

    create: async (threadData) => {
        const { participant1, participant2 } = threadData;
        const { rows } = await pool.query(
            'INSERT INTO MessageThreads (participant1, participant2) VALUES ($1, $2) RETURNING *',
            [participant1, participant2]
        );
        return rows[0];
    },

    delete: async (id) => {
        const { rowCount } = await pool.query('DELETE FROM MessageThreads WHERE id = $1', [id]);
        return rowCount > 0;
    },
    softDelete: async (id) => {
        await pool.query('UPDATE MessageThreads SET deleted_at = NOW() WHERE id = $1', [id]);
    },
    
    restore: async (id) => {
        await pool.query('UPDATE MessageThreads SET deleted_at = NULL WHERE id = $1', [id]);
    },
};

export default messageThreadDAO;
