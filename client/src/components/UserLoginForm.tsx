// Only visible at the beggining, once the user enters the app to identify itself.

import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginForm, LoginFormProps, User } from '../Interfaces/Interfaces';
import { Formik } from 'formik';
import { loginSchema } from '../validation/loginSchema';
import { useEffect, useRef } from 'react';

const UserLoginForm = (props: LoginFormProps) => {
  const { setLoggedUser } = props;
  const navigate = useNavigate();
  const initialValues: LoginForm = {
    userName: '',
    password: '',
    formError: null,
  };

  const onLoginHandler = async (values: LoginForm) => {
    const { userName, password } = values;
    try {
      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
      if (loginResponse.ok) {
        const data = await loginResponse.json();
        localStorage.setItem('token', data.payload.token);
        setLoggedUser(data.payload.user as User);
        navigate('/chat/welcome');
      }
    } catch (error: unknown) {
      if (error instanceof Error) alert("Something's wrong, please check your data.");
    }
  };

  // Auto-focus input when the user enters the chat
  const userInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (userInputRef.current) {
      userInputRef.current.focus();
    }
  }, []);

  return (
    <div className="name-field">
      <h2>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={onLoginHandler}
      >
        {(formik) => {
          // console.log('Formik props', formik);
          return (
            <Form noValidate onSubmit={formik.handleSubmit}>
              <FloatingLabel
                controlId="username"
                label="Your username"
                className="mb-2 p-0"
              >
                <Form.Control
                  ref={userInputRef}
                  type="text"
                  name="userName"
                  placeholder="Your username"
                  isValid={formik.touched.userName && !formik.errors.userName}
                  isInvalid={formik.touched.userName && !!formik.errors.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.userName}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="password"
                label="Password"
                className="d-flex mb-2 p-0"
              >
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  isValid={formik.touched.password && !formik.errors.password}
                  isInvalid={formik.touched.password && !!formik.errors.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <Button
                  size="sm"
                  variant="primary"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </Button>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form>
          );
        }}
      </Formik>
      <Link to="/welcome/register">I am not yet registered🔑</Link>
    </div>
  );
};

export default UserLoginForm;
