/* This button component will be used for the following purposes:
-New user input
-Send button for new message input
-create room at New Room form
-Leave room button
*/
import { Button } from 'react-bootstrap';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  btnText: string;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UIButton = (props: ButtonProps) => {
  return (
    <Button size="sm" variant="primary" type={props.type} onClick={props.clickHandler}>
      {props.btnText}
    </Button>
  );
};

export default UIButton;
