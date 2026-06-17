import hotelModel from "../models/hotelModel.js";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const addHotel = async (req, res) => {
console.log("BODY:", req.body, "FILE:", req.file?.filename);

    try {
        console.log("1.req.file:", req.file);
        console.log("2.req.body:", req.body);
        const {name, price, description, amenities} = req.body;
        const image = req.file;
        let imageUrl = "";
        let parsedAmenities = [];

        if (amenities) {
            try {
                const rawAmenities = typeof amenities === "string" ? JSON.parse(amenities) : amenities;
                if (Array.isArray(rawAmenities)) {
                    parsedAmenities = rawAmenities
                        .map((amenity) => {
                            if (typeof amenity === "string") {
                                return {label: amenity.trim()};
                            }

                            return {label: String(amenity?.label || "").trim()};
                        })
                        .filter((amenity) => amenity.label);
                }
            } catch (error) {
                console.log("Failed to parse amenities:", error.message);
            }
        }

        if (req.file) {
            let result = await cloudinary.uploader.upload(image.path, {
                resource_type: "image"
            });
            imageUrl = result.secure_url;
        } else {
            imageUrl = "https://via.placeholder.com/300";
        }

        const hotelData = {
            name,
            price: Number(price),
            description,
            image: imageUrl,
            amenities: parsedAmenities,
            date: Date.now()
        };

        const newHotel = new hotelModel(hotelData);
        await newHotel.save();

        res.json({success: true, message: "Hotel added successfully"});

    } catch (error) {
        console.log("ERROR DETAILS:", error);
        console.log("ERROR MESSAGE:", error.message);
        res.status(500).json({success: false, message: error.message || "Failed to add hotel"});
    }
}
export const listHotels = async (req, res) => {
    try {
        const hotels = await hotelModel.find({});
        res.json({success: true, hotels: hotels});
    } catch (error) {
        console.log("ERROR DETAILS:", error);
        console.log("ERROR MESSAGE:", error.message);
        res.json({success: false, message: "Failed to fetch hotels"});
    }
};

 export const removeHotel = async (req, res) => {
    try {
        const {id} = req.body;
        await hotelModel.findByIdAndDelete(id);
        res.json({success: true, message: "Hotel removed successfully"});
    } catch (error) {
        console.log("ERROR DETAILS:", error);
        console.log("ERROR MESSAGE:", error.message);
        res.status(500).json({success: false, message: error.message || "Failed to remove hotel"});
    }
};

export const singleHotel = async (req, res) => {
    try {
        const {id} = req.params;
        const hotel = await hotelModel.findById(id);
        if (!hotel) {
            return res.status(404).json({success: false, message: "Hotel not found"});
        }
        res.json({success: true, data: hotel});
    } catch (error) {
        console.log("ERROR DETAILS:", error);
        console.log("ERROR MESSAGE:", error.message);
        res.status(500).json({success: false, message: error.message || "Failed to fetch hotel"});
    }
};