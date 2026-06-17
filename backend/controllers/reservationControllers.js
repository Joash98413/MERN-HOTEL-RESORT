import reservationModels from '../models/reservationModels.js';

const createReservation = async (req, res) => {
    try {
        const {name, email, phone, checkin, checkout, guests, roomName, roomId} = req.body;
        if (!name || !email || !phone || !checkin || !checkout || !guests || !roomName || !roomId) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const newReservation = new reservationModels({name, email, phone, checkin, checkout, guests, roomName, roomId});
        await newReservation.save();
        res.status(201).json({message: 'Reservation created successfully', reservation: newReservation});
    } catch (error) {
        console.log("=== FULL ERROR ===");
        console.log(error);
        console.log("=== FULL END ERROR ===");
        res.status(500).json({message: 'Error creating reservation', error});
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await reservationModels.find();
        res.status(200).json({reservations});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error fetching reservations', error});
    }

}

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await reservationModels.findByIdAndDelete(id);
        if (!reservation) {
            return res.status(404).json({message: 'Reservation not found'});
        }
        res.json({message: 'Reservation deleted successfully', reservation});
    } catch (error) {
        res.status(500).json({message: 'Error deleting reservation', error});
    }
};


export { createReservation, getReservations, deleteReservation }