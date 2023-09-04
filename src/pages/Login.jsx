import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import Illustration from "../components/Illustration";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import classes from "../styles/Login.module.css";
export default function Login() {
  const { login } = useAuth();
  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [error, setError] = useState();

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError(""), setLoading(false);
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      setError("Failed to login");
    }
  }

  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration />
        <Form className={classes.login} onSubmit={handleSubmit}>
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

          <Button disabled={loading} type="submit">
            <span>Login</span>
          </Button>
          {error && <p className="error">{error}</p>}
          <div className="info">
            Don not have an account? <Link to="/singup">Signup</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
