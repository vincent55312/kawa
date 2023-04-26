export const UserType = {
  revendeur: 'revendeur',
  client: 'client',
  prospects: 'prospects',
} as const;

export type UserType = keyof typeof UserType;

export type UserDto = {
  id: string;
  pseudo: string;
  password: string;
  token: string | null;
  createdAt: Date;
  updatedAt: Date;
  userType: UserType;
};
