export default function AuthTitle({ mode }) {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </h2>
      <p className="text-center text-gray-600 mb-6">
        {mode === "login"
          ? "Sign in to your account"
          : "Sign up to get started"}
      </p>
    </>
  );
}
