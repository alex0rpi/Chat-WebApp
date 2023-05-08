// Only visible at the beggining, once the user enters the app to identify itself.

import { useRef } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IUserAuthFormProps, User } from '../models/Interfaces';

const UserLoginForm = (props: IUserAuthFormProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const onLoginHandler = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    // todo: afegir validació dels inputs en algun moment (Amb bootstrap? manualment?)
    const userName = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
      if (loginResponse.ok) {
        const data = await loginResponse.json();
        localStorage.setItem('token', data.payload.token);
        props.setLoggedUser(data.payload.user as User);
        navigate('/chat/welcome');
      }
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <div className="name-field">
      <h2>Login</h2>

      <FloatingLabel controlId="floatingInput" label="Your username" className="mb-2 p-0">
        <Form.Control ref={usernameRef} name="userName" placeholder="Your username" />
      </FloatingLabel>
      <FloatingLabel className="d-flex" controlId="floatingPassword" label="Password">
        <Form.Control
          ref={passwordRef}
          type="password"
          placeholder="Password"
          name="password"
        />
        <Button size="sm" variant="primary" type="submit" onClick={onLoginHandler}>
          Submit
        </Button>
      </FloatingLabel>
      <Link to="/welcome/register">Click here to register</Link>
    </div>
  );
};

export default UserLoginForm;
