// This component is continuously used:
// At the welcome chat, both at identified and non-identified states.
// At a room chat

import { PropsWithChildren } from 'react';
import styles from './layout.module.css';

const ContainerChatWindow = (props: PropsWithChildren) => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default ContainerChatWindow;
