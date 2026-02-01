import { Router } from 'express';
import * as billingController from '../controllers/billing.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All billing routes require authentication
router.use(authenticate);

// Get services list (for invoice creation)
router.get('/services', billingController.getServices);

// Get all invoices
router.get('/invoices', billingController.getAll);

// Get invoice by ID
router.get('/invoices/:id', billingController.getById);

// Create invoice (admin, receptionist)
router.post('/invoices', authorize('admin', 'receptionist'), billingController.create);

// Add payment to invoice
router.post('/invoices/:id/payments', authorize('admin', 'receptionist'), billingController.addPayment);

// Cancel invoice (admin only)
router.delete('/invoices/:id', authorize('admin'), billingController.cancelInvoice);

export default router;
