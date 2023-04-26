// Only visible at the beggining, once the user enters the app to identify itself.
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import UIButton from './UIButton';
import { Col, Row } from 'react-bootstrap';

// type Props = {}

const NewUserInput = () => {
  return (
    <Row xs={12} md={5} className="g-2">
      <Col>
        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
          <Form.Control type="text" placeholder="Lord Beerus" />
        </FloatingLabel>
      </Col>
      <Col>
        <UIButton btnText="Enter" />
      </Col>
    </Row>
  );
};

export default NewUserInput;
