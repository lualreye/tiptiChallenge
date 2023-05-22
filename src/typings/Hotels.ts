interface prices {
  regular: number,
  rewards: number
}

interface HotelDetail {
  image: string,
  name: string,
  rating: number,
  weekPrices: prices,
  weekendPrices: prices 
}

export type {
  HotelDetail
}