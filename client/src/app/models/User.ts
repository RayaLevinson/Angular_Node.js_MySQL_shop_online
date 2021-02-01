export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  confirmPassword?: string,
  role?: string, 
  id?: string,
  city?: string,
  street?: string,
  house?: string,
  apartment?: number
}