import express from "express";
// import multer from "multer"
import  {addHotel, listHotels, removeHotel, singleHotel} from "../controllers/hotelControllers.js";
import upload from "../middleware/multer.js"

const hotelRouter = express.Router();

// const storage = multer.diskStorage({
//     destination:"uploads/",
//     filename:(req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)

//     }
// })
 
// 
hotelRouter.post("/add", upload.single('image'), addHotel)
hotelRouter.get("/list", listHotels);
hotelRouter.post("/remove", removeHotel);
hotelRouter.get("/rooms/:id", singleHotel);

export default hotelRouter