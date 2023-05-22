import { defineStore } from "pinia";
import { HotelDetail } from "../typings/Hotels";

import lakewoodImage from "../assets/images/edvin-johansson-rlwE8f8anOc-unsplash.png";
import bridgewoodImage from "../assets/images/fernando-alvarez-rodriguez-M7GddPqJowg-unsplash.png";
import ridgewoodImage from "../assets/images/manuel-moreno-DGa0LQ0yDPc-unsplash.png";

interface RootState {
  hotels: HotelDetail[]
}

const useHotelStore = defineStore('HotelStore', {
  state: (): RootState => ({
    hotels: [
      { 
        image: lakewoodImage,
        name: 'Lakewood',
        rating: 3,
        weekPrices: {
          regular: 11000,
          rewards: 8000
        },
        weekendPrices: {
          regular: 9000,
          rewards: 8000
        }
      },
      {
        image: bridgewoodImage,
        name: 'Bridgewood',
        rating: 4,
        weekPrices: {
          regular: 16000,
          rewards: 11000
        },
        weekendPrices: {
          regular: 6000,
          rewards: 5000
        }
      },
      {
        image: ridgewoodImage,
        name: 'Ridgewood',
        rating: 5,
        weekPrices: {
          regular: 22000,
          rewards: 10000
        },
        weekendPrices: {
          regular: 15000,
          rewards: 4000
        }
      },
    ]
  })
})


export default useHotelStore