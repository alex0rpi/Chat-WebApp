// Only visible at the beggining, once the user enters the app to identify itself.

// import { useRef } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RegisterForm, RegisterFormProps, User } from '../Interfaces/Interfaces';
import { Formik } from 'formik';
import { registerSchema } from '../validation/registerSchema';

const UserRegisterForm = (props: RegisterFormProps): React.ReactElement => {
  const { setLoggedUser } = props;
  const navigate = useNavigate();
  const initialValues: RegisterForm = {
    userName: '',
    password: '',
    confirmPassword: '',
    formError: null,
  };
  // const usernameRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);
  // const passwordConfRef = useRef<HTMLInputElement>(null);
  //* Register handler ------------------------------------------------------ *//
  const onRegisterHandler = async (values: RegisterForm) => {
    // const userName = usernameRef.current?.value;
    // const password = passwordRef.current?.value;
    const { userName, password } = values;
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
      if (response.ok) {
        // If registered, login the user and add it to the context
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
      }
    } catch (error: unknown) {
      // if (error instanceof Error) alert("Something's wrong, please check your data.");
      console.log(error);
    }
  };

  return (
    <div className="name-field">
      <h2>Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={onRegisterHandler}
      >
        {(formik) => {
          console.log('Formik props', formik);
          return (
            <Form noValidate onSubmit={formik.handleSubmit}>
              <FloatingLabel
                controlId="username"
                label="Your username"
                className="mb-2 p-0"
              >
                <Form.Control
                  // ref={usernameRef}
                  type="text"
                  name="userName"
                  placeholder="Your username"
                  isValid={formik.touched.userName && !formik.errors.userName}
                  isInvalid={formik.touched.userName && !!formik.errors.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {formik.errors.userName}
              </Form.Control.Feedback>
              <FloatingLabel controlId="password" label="Password" className="mb-2 p-0">
                <Form.Control
                  // ref={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                  isValid={formik.touched.password && !formik.errors.password}
                  isInvalid={formik.touched.password && !!formik.errors.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                className="d-flex"
                controlId="confirmPassword"
                label="Confirm password"
              >
                <Form.Control
                  // ref={passwordConfRef}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  isValid={
                    formik.touched.confirmPassword && !formik.errors.confirmPassword
                  }
                  isInvalid={
                    formik.touched.confirmPassword && !!formik.errors.confirmPassword
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
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
            </Form>
          );
        }}
      </Formik>
      <Link to="/welcome/login">Already registered? Login</Link>
    </div>
  );
};

export default UserRegisterForm;
