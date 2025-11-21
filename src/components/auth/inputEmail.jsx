import { Input } from "../ui/input";

export default function InputEmail({ value, onChange, onBlur, name, error }) {
  return (
    <div>
      <Input
        type="email"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Email"
        className="w-full h-10 border rounded p-3"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
