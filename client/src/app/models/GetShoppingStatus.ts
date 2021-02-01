export interface GetShoppingStatus {
  success: boolean,
  data: {
    isNewUser?: boolean,
    currentCart?: {
      createdAt: any
    },
    lastOrder?: {
      createdAt: any
    }
  }
}