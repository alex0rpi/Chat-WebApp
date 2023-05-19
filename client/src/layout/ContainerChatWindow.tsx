import { PropsWithChildren } from 'react';

const ContainerChatWindow = (props: PropsWithChildren) => {
  return <div className="container">{props.children}</div>;
};

export default ContainerChatWindow;
