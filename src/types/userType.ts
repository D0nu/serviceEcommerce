
export type UserRole = "admin" | "store_owner" | "customer";

export interface AuthUser  {
    _id: string
    name: string
    email: string
    backup?: string
    role: UserRole
    password: string
    avartar?: string
}