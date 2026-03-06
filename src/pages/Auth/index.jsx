import React, { useState } from "react";
import { User, Lock, LogIn } from "lucide-react";
import Input from "@shared/components/ui/Input";
import Button from "@shared/components/ui/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Müəllim Girişi</h2>
          <p className="text-gray-600">Sisteme daxil olun</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              <User className="inline w-4 h-4 mr-2" />
              Email
            </label>
            <Input
              type="email"
              placeholder="Emailinizi daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              <Lock className="inline w-4 h-4 mr-2" />
              Şifrə
            </label>
            <Input
              type="password"
              placeholder="Şifrənizi daxil edin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <LogIn className="inline w-4 h-4 mr-2" />
            Daxil ol
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
