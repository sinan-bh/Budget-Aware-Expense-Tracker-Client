import { useState } from "react";
import { Input } from "../ui/input";

export default function InputPassword({
  value,
  onChange,
  onBlur,
  name,
  error,
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Password"
          className="w-full h-10 border rounded p-3 pr-10"
        />

        <span
          className="absolute right-3 top-3 cursor-pointer text-sm"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </span>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
