// Only visible at the beggining, once the user enters the app to identify itself.

import { useRef } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserRegisterForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onRegisterHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    // todo: afegir validació dels inputs en algun moment (Amb bootstrap? manualment?)
    const userName = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
      if (response.ok) {
        // *If registered, login the user and add it to the context
        const loginResponse = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName, password }),
        });
        if (loginResponse.ok) {
          const data = await loginResponse.json();
          localStorage.setItem('token', data.payload.token);
          navigate('/welcome');
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <div className="name-field">
      <h2>Register</h2>

      <FloatingLabel controlId="floatingInput" label="Your username" className="mb-2 p-0">
        <Form.Control
          ref={usernameRef}
          id="userName"
          name="userName"
          placeholder="Your username"
        />
      </FloatingLabel>
      {/* --------------- */}
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2 p-0">
        <Form.Control
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </FloatingLabel>
      {/* --------------- */}
      <FloatingLabel className="d-flex" controlId="floatingPassword" label="Confirm password">
        <Form.Control
          ref={passwordConfRef}
          type="password"
          placeholder="Password"
          id="passwordConfirmation"
          name="passwordConfirmation"
        />
        <Button size="sm" variant="primary" type="submit" onClick={onRegisterHandler}>
          Submit
        </Button>
      </FloatingLabel>
      <Link to="/login">Already registered? Login</Link>
    </div>
  );
};

export default UserRegisterForm;
