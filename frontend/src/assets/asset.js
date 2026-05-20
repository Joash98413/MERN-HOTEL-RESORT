import room1 from "./Executive.jpg"
import room2 from "./presidential.jpg"
import room3 from "./vip.jpg"
import room4 from "./Double.jpg"



export const roomData = [
  {
    id: 1,
    name: "Executive Suite",
    description:
      " Exclusive VIP room with premium services and lounge access.",
    price: 199,
    image: room1,
    amenities: [
      { label: "Free Wi-Fi"},
      { label: "Pool Access"},
      { label: "Flat-screen TV"},
    ]
  },
  {
    id: 2,
    name: "Presidential Suite",
    description:
      "Luxurious presidential suite with panoramic city view and premium amenities.",
    price: 299,
    image: room2,
      amenities: [
      { label: "Free Wi-Fi"},
      { label: "Pool Access"},
      { label: "Flat-screen TV"},
      ]
  },
  {
    id: 3,
    name: "VIP Room",
    description:
      "Exclusive VIP room with premium amenities and stunning city view.",
    price: 599,
    image: room3,
    amenities: [
      { label: "Free Wi-Fi"},
      { label: "Pool Access"},
      { label: "Flat-screen TV"},
    ]
  },
  {
    id: 4,
    name: "Double Room",
    description:
      "Cozy double room with city view and modern amenities.",
    price: 199,
    image: room4,
    amenities: [
      { label: "Free Wi-Fi"},
      { label: "Pool Access"},
      { label: "Flat-screen TV"},
    ]
  },
]