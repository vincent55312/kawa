export const UserType = {
  seller: 'seller',
  client: 'client',
  prospects: 'prospects',
  internal: 'internal',
} as const;

export type UserType = keyof typeof UserType;

export function isValidUserType(value: string): boolean {
  return Object.values(UserType).includes(value as UserType);
}

export type UserDto = {
  id: string;
  pseudo: string;
  password: string;
  token: string | null;
  createdAt: Date;
  updatedAt: Date;
  userType: UserType;
};
