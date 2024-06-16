import bcrypt from "bcryptjs";

const encryptPassword = async (password) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, userPassword) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
};
export { encryptPassword, comparePassword };
