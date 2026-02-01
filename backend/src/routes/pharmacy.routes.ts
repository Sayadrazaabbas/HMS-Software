import { Router } from 'express';
import * as pharmacyController from '../controllers/pharmacy.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All pharmacy routes require authentication
router.use(authenticate);

// Get all medicines
router.get('/medicines', pharmacyController.getMedicines);

// Get medicine by ID
router.get('/medicines/:id', pharmacyController.getMedicineById);

// Get stock overview
router.get('/stock', pharmacyController.getStockOverview);

// Get low stock alerts
router.get('/stock/low', pharmacyController.getLowStock);

// Dispense medicine (pharmacist, admin)
router.post('/dispense', authorize('admin', 'pharmacist'), pharmacyController.dispenseMedicine);

// Get prescriptions
router.get('/prescriptions', pharmacyController.getPrescriptions);

export default router;
