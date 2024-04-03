// Define the Users model

import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

class Users {
    static async create(username, password, email, name) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
            text: 'INSERT INTO Users (username, password, email, name) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [username, hashedPassword, email, name],
        };

        try {
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    static async getById(userId) {
        const query = {
            text: 'SELECT * FROM Users WHERE user_id = $1',
            values: [userId],
        };

        try {
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw new Error('Failed to get user by ID');
        }
    }

}

export default Users;