import { Button } from "../ui/button.tsx";

export default function AuthToggle({ mode, setMode }) {
  return (
    <div className="flex mb-8 border-b">
      <Button
        className={`w-1/2 py-2 text-lg font-semibold bg-transparent hover:bg-transparent border-b rounded-none ${
          mode === "login"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setMode("login")}
      >
        Login
      </Button>

      <Button
        className={`w-1/2 py-2 text-lg font-semibold bg-transparent hover:bg-transparent border-b rounded-none ${
          mode === "signup"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setMode("signup")}
      >
        Sign Up
      </Button>
    </div>
  );
}
