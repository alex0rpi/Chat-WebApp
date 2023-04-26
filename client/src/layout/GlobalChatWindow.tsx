// This component is continuously used:
// At the welcome chat, both at identified and non-identified states.
// At a room chat

import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

// type Props = {}

const GlobalChatWindow = (props: PropsWithChildren) => {
  return (
    <Container fluid="md" className="bg-primary rounded">
      {props.children}
    </Container>
  );
};

export default GlobalChatWindow;
