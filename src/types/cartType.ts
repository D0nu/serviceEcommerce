export interface CartItem {
  productId: string
  storeId: string  // Critical for revenue distribution
  quantity: number
  price: number
  // ... product details
}

export interface Cart {
  userId: string
  items: CartItem[]  // Max 20 items across all stores
  total: number
}