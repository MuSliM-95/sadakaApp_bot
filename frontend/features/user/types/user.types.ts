
export const UserRole = {
  regular: "REGULAR",
  admin: "ADMIN",
} as const;

export type RoleType = (typeof UserRole)[keyof typeof UserRole]

export interface IProfile {
  id: number;
  username?: string;
  first_name: string;
  adsCount: number;
  ticketsCount: number;
  role: RoleType;
}

export interface ITicket {
  id: number;
  used: boolean;
  createdAt: Date;
  user: IProfile
}

export interface UserRating {
  id: number;
  username: string;
  first_name: string;
  role: string;
  ticketsCount: number;
  adsCount: number;
}
