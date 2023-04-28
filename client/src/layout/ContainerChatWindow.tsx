// This component is continuously used:
// At the welcome chat, both at identified and non-identified states.
// At a room chat

import { PropsWithChildren } from 'react';

const ContainerChatWindow = (props: PropsWithChildren) => {
  return <div className="container">{props.children}</div>;
};

export default ContainerChatWindow;
