import React, {createContext, useState} from "react";
import {roomData} from "../assets/asset";

export const RoomContext = createContext();

const RoomContextProvider = ({children}) => {
    const [rooms, setRooms] = useState(roomData);
    return (
        <RoomContext.Provider value={{rooms, setRooms}}>
            {children}
        </RoomContext.Provider>
    );
}
export default RoomContextProvider;