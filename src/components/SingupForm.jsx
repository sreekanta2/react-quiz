import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SingupForm() {
  const { singup } = useAuth();
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: "",
  };

  const [error, setError] = useState();

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    //   do validate password and confirm password
    if (values.password !== values.confirmPassword) {
      return setError("password do not match !");
    }

    try {
      setError(""), setLoading(false);
      await singup(values.email, values.password, values.username);

      navigate("/");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  return (
    <Form style={{ width: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        required
        values={values.username}
        name="username"
        onChange={handleInputChange}
      />

      <TextInput
        type="email"
        placeholder="Enter Email"
        icon="alternate_email"
        values={values.email}
        name="email"
        required
        onChange={handleInputChange}
      />
      <TextInput
        type="password"
        required
        placeholder="Enter password"
        icon="lock"
        values={values.password}
        name="password"
        onChange={handleInputChange}
      />

      <TextInput
        type="password"
        required
        placeholder="Confirm  password"
        icon="lock_clock"
        values={values.confirmPassword}
        name="confirmPassword"
        onChange={handleInputChange}
      />
      <CheckBox
        type="checkbox"
        text="I agree to the Terms & Conditions"
        values={values.agree}
        name="agree"
        required
        onChange={handleInputChange}
      />
      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <Link to="/login ">Login</Link> instead.
      </div>
    </Form>
  );
}
