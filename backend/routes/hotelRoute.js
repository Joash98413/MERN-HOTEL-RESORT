import express from "express";
import multer from "multer"
import  {addHotel, listHotels, removeHotel, singleHotel} from "../controllers/hotelControllers.js";

const hotelRouter = express.Router();
const upload = multer({
     dest: 'uploads/',
     limits: { fileSize: 10 * 1024 * 1024}
    
    })

hotelRouter.post("/add", upload.single('image'), addHotel)
hotelRouter.get("/get", listHotels);
hotelRouter.delete("/remove", removeHotel);
hotelRouter.get("/rooms", singleHotel);

export default hotelRouter


