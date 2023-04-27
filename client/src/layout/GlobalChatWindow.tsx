// This component is continuously used:
// At the welcome chat, both at identified and non-identified states.
// At a room chat

import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

const GlobalChatWindow = (props: PropsWithChildren) => {
  return (
    <Container fluid className="mx-auto mx-md-0 w-md-50 w-100 bg-primary rounded">
      {props.children}
    </Container>
  );
};

export default GlobalChatWindow;
