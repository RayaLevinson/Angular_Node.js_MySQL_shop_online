export interface Order {
  totalPrice: number,
  city: string, 
  street: string, 
  house: string, 
  apartment: number, 
  dateToShip: any, 
  creditCardPartialDigits: string  // in case like 0789 we should save all 4 chars
}