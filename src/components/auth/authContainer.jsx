import { useState } from "react";
import AuthToggle from "./authToggle";
import AuthTitle from "./authTitle";
import AuthForm from "./authForm";
import { login, signup } from "../../services/auth/authServices";
import { useNavigate } from "react-router-dom";

export default function AuthContainer() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");

  const handleSubmitLogin = async (values, resetForm) => {
    const response = await login(values);
    if (response?.status === 200) {
      resetForm();
      navigate("/dashboard");
    }
  };

  const handleSubmitSignup = async (values, resetForm) => {
    // try {
    const response = await signup(values);

    if (response?.status === 200) {
      resetForm();
      setMode("login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <AuthToggle mode={mode} setMode={setMode} />
        <AuthTitle mode={mode} />

        <AuthForm
          mode={mode}
          handleSubmit={
            mode === "login" ? handleSubmitLogin : handleSubmitSignup
          }
        />
      </div>
    </div>
  );
}
