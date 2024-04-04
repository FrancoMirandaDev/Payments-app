import { Router } from 'express';
import { getPaymentsController,getPaymentByIdController , createPaymentsController, UpdatePaymentsController, DeletePaymentsController } from '../controllers/payments.controller.js';

const router = Router();

router.get('/payments', getPaymentsController);

router.get('/payments/:payment_id', getPaymentByIdController);

router.post('/payments/register', createPaymentsController);

router.put('/payments/update/:id', UpdatePaymentsController);

router.delete('/payments/delete/:id', DeletePaymentsController);

export default router;