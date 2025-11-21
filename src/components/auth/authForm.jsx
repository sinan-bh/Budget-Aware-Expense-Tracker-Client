import { Formik, Form } from "formik";

import InputEmail from "./inputEmail";
import InputPassword from "./inputPassword";
import { validationSchema } from "../../lib/validation";
import { Button } from "../ui/Button";

export default function AuthForm({ mode, handleSubmit }) {
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, helpers) => handleSubmit(values, helpers.resetForm)}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className="space-y-5">
          {/* Email */}
          <InputEmail
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            error={touched.email && errors.email}
          />

          {/* Password */}
          <InputPassword
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            error={touched.password && errors.password}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded font-semibold shadow-lg hover:shadow-xl transition"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
