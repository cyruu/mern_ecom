import bcrypt from "bcryptjs";

const encryptPassword = async (password) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export { encryptPassword };
