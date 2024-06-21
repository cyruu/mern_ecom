import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/store/features/auth/authslice";

export default function Login() {
  const dis = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();

    dis(login(userData))
      .unwrap()
      .then((res) => {
        if (res != null) {
          console.log("loginnnnnnnnn");
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your information to Login to an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4"></div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            New?{" "}
            <Link to="/register" className="underline">
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
