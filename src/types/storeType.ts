export interface Store {
  _id: string;
  name: string;
  subdomain: string;
  ownerId: string; // References User._id
  template: string;
  // ...other store config
}

export interface UserStoreRole {
  userId: string
  storeId: string 
  role: "owner" | "admin"  // For future expansion
}