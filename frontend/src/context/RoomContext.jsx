import React, {createContext, useState, useEffect} from "react";
import axios from "axios";
import { backendUrl } from "../App";

export const RoomContext = createContext();

const RoomContextProvider = ({children}) => {
    const [rooms, setRooms] = useState([]);

    const fetchHotelRoom = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/hotel/list`);
            if (response.data.success) {
                setRooms(response.data.hotels);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchHotelRoom();
    }, []);

    return (
        <RoomContext.Provider value={{rooms, setRooms}}>
            {children}
        </RoomContext.Provider>
    );
};
export default RoomContextProvider;