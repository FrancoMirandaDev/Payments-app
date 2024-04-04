import Payment from '../models/payments.js';

export const getPaymentsController = async (req, res) => {
    try {
        const payments = await Payment.getPayments();

        payments.forEach(payment => {
            payment.date = payment.date.toISOString().split('T')[0];
        });
        
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    return;
};

export const getPaymentByIdController = async (req, res) => {
    const paymentId = req.params.payment_id;

    const payment = await Payment.getPaymentById(paymentId);
    if (!payment.rows[0]) {
        res.status(404).json({ error: `El pago con ID ${paymentId} no existe.` });
        return;
    }

    payment.rows[0].date = payment.rows[0].date.toISOString().split('T')[0];

    res.status(200).json(payment.rows[0]);
    return;
}

export const createPaymentsController = async (req, res) => {

    console.log(req.session);

    const {user_id, name, amount, date, payment_type, recipient } = req.body;

    if(!user_id || !name || !amount || !date || !payment_type || !recipient){
        res.status(400).json({ error: 'Por favor, complete todos los campos.' });
        return;
    }

    const payment_x = {
        user_id: user_id,
        name: name,
        amount: amount,
        date: date,
        payment_type: payment_type,
        recipient: recipient,
    };
    try {
        const paymentId = await Payment.SavePayment(payment_x);
        res.status(201).json({ message: `El pago con ID ${paymentId} ha sido guardado exitosamente.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    return;
};

export const UpdatePaymentsController = async (req, res) => {
    const paymentId = req.params.id;
    const updatedPayment = req.body;

    const existingPayment = await Payment.getPaymentById(paymentId);
    if (!existingPayment.rows[0]) {
        res.status(404).json({ error: `El pago con ID ${paymentId} no existe.` });
        return;
    }

    try {
        await Payment.updatePayment(paymentId, updatedPayment);
        res.status(200).json({ message: `El pago con ID ${paymentId} ha sido actualizado exitosamente.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const DeletePaymentsController = async (req, res) => {

    const paymentId = req.params.id;

    const existingPayment = await Payment.getPaymentById(paymentId);
    if (!existingPayment.rows[0]) {
        res.status(404).json({ error: `El pago con ID ${paymentId} no existe.` });
        return;
    }

    try {
        await Payment.deletePayment(paymentId);
        res.status(200).json({ message: `El pago con ID ${paymentId} ha sido eliminado exitosamente.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}