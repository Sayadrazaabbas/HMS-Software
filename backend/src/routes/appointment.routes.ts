import { Router } from 'express';
import * as appointmentController from '../controllers/appointment.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All appointment routes require authentication
router.use(authenticate);

// Get doctors list (for booking form)
router.get('/doctors', appointmentController.getDoctors);

// Get available slots
router.get('/slots', appointmentController.getAvailableSlots);

// Get all appointments
router.get('/', appointmentController.getAll);

// Get today's appointments for a doctor
router.get('/today/:doctorId', appointmentController.getTodayByDoctor);

// Get appointment by ID
router.get('/:id', appointmentController.getById);

// Create appointment (admin, receptionist)
router.post('/', authorize('admin', 'receptionist'), appointmentController.create);

// Update appointment status (admin, receptionist, doctor)
router.patch('/:id/status', authorize('admin', 'receptionist', 'doctor'), appointmentController.updateStatus);

// Update appointment (admin, receptionist)
router.put('/:id', authorize('admin', 'receptionist'), appointmentController.update);

// Cancel appointment (admin, receptionist)
router.delete('/:id', authorize('admin', 'receptionist'), appointmentController.cancel);

export default router;
