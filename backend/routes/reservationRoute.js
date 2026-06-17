import express from 'express';
import { createReservation, getReservations, deleteReservation } from '../controllers/reservationControllers.js';

const router = express.Router();

router.post('/create', createReservation);
router.get('/get', getReservations);
router.delete('/delete/:id', deleteReservation);

export default router;