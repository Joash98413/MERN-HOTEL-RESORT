import hotelModel from "../models/hotelModel.js";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.cloudinary_CLOUD_NAME,
    api_key_key: process.env.cloudinary_API_KEY,
    api_secret: process.env.cloudinary_API_SECRET
})

const addHotel = async (req, res) => {
    try {
        const {name, price, description} = req.body;
        let imageUrl = "";

        if (req.file) {
            let result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image"
            });
            imageUrl = result.secure_url;
        } else {
            imageUrl = "https://via.placeholder.com/300";
}
        const hotel = {
            name,
            price:Number(price),
            description,
            image: imageUrl
        };
        const newHotel = new hotelModel(hotel);
        await Hotel.save();

        res.json({success: true, message: "Hotel added successfully"});

    } catch (error) {
        console.error(error);
        res.json({success: false, message: "Failed to add hotel"});


    }

}

const listHotels = async (req, res) => {
    res.json({message: "List of hotels"});

}

const removeHotel = async (req, res) => {
        res.json({message: "Hotel room removed successfully"});

}

const singleHotel = async (req, res) => {
    res.json({message: "Single hotel details"});

}

export {addHotel, listHotels, removeHotel, singleHotel};


