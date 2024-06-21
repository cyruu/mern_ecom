import axios from "axios";

const loginUser = async (userData) => {
  const res = await axios.post(
    "http://localhost:3000/api/v1/users/login",
    {
      email: userData.email,
      password: userData.password,
    },
    {
      // yo lekhene vane application ma cookie dekhaundaina

      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res) {
    return res.data;
  }
};

const authService = { loginUser };
export default authService;
