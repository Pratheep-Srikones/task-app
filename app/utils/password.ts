import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 12);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
