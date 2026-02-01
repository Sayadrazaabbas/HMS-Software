import { Router } from 'express';
import * as patientController from '../controllers/patient.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All patient routes require authentication
router.use(authenticate);

// Get all patients (admin, receptionist, doctor)
router.get('/', patientController.getAll);

// Get patient by ID
router.get('/:id', patientController.getById);

// Create patient (admin, receptionist)
router.post('/', authorize('admin', 'receptionist'), patientController.create);

// Update patient (admin, receptionist)
router.put('/:id', authorize('admin', 'receptionist'), patientController.update);

// Delete patient (admin only)
router.delete('/:id', authorize('admin'), patientController.remove);

export default router;
