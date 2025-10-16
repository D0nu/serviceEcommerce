import { CartItem } from "./cartType";

export interface Order {
  userId: string
  items: CartItem[] 
  totalAmount: number
  paymentStatus: "pending" | "paid" | "failed";

}

export interface RevenueDistribution {
  orderId: string
  storeId: string
  storeOwnerId: string
  amount: number
  platformFee: number
  netAmount: number
  status: 'pending' | 'processed'
}