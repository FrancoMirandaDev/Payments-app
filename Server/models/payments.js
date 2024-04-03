import { pool } from '../config/db.js';

class Payment{
    static async SavePayment(payment) {
    const query = `
        INSERT INTO Payments (user_id, name, amount, date, payment_type, recipient)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING payment_id;
    `;
    const values = [
        payment.user_id,
        payment.name,
        payment.amount,
        payment.date,
        payment.payment_type,
        payment.recipient,
    ];

    try {
        const result = await pool.query(query, values);
        const paymentId = result.rows[0].payment_id;
        console.log(`El pago con ID ${paymentId} ha sido guardado exitosamente.`);
        return paymentId;
    } catch (error) {
        console.error('Error al guardar el pago:', error);
        throw new Error('Error al guardar el pago:', error);
    }
    }

    static async getPayments() {
        const query = 'SELECT * FROM Payments;';
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los pagos:', error);
            throw new Error('Error al obtener los pagos:', error);
        }
    }

    static async getPaymentById(paymentId) {
        const query = 'SELECT * FROM Payments WHERE payment_id = $1;';
        const values = [paymentId];
    
        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            console.error('Error al obtener el pago:', error);
            throw new Error('Error al obtener el pago:', error);
        }
    }

    static async updatePayment(paymentId, updatedPayment) {
        const query = `
            UPDATE Payments
            SET amount = $1, date = $2, payment_type = $3, recipient = $4
            WHERE payment_id = $5;
        `;
        const values = [
            updatedPayment.amount,
            updatedPayment.date,
            updatedPayment.payment_type,
            updatedPayment.recipient,
            paymentId,
        ];
    
        try {
            await pool.query(query, values);
            console.log(`El pago con ID ${paymentId} ha sido actualizado exitosamente.`);
            return true;
        } catch (error) {
            console.error('Error al actualizar el pago:', error);
            throw new Error('Error al actualizar el pago:', error);
        }
    }

    static async deletePayment(paymentId) {
        const query = 'DELETE FROM Payments WHERE payment_id = $1;';
        const values = [paymentId];
    
        try {
            await pool.query(query, values);
            console.log(`El pago con ID ${paymentId} ha sido eliminado exitosamente.`);
            return true;
        } catch (error) {
            console.error('Error al eliminar el pago:', error);
            throw new Error('Error al eliminar el pago:', error);
        }
    }

}

export default Payment; 