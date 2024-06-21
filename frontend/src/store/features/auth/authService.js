import axios from "axios";

const loginUser = async (userData) => {
  try {
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
    console.log("login ", res);
    if (res) {
      window.localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {
    return {
      statusCode: 400,
      success: false,
      message: err.response.data.message,
    };
  }
};

const authService = { loginUser };
export default authService;
