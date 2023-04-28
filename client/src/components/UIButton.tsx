/* This button component will be used for the following purposes:
-New user input
-Send button for new message input
-create room at New Room form
-Leave room button
*/
import { Button } from 'react-bootstrap';

interface ButtonProps {
  btnText: string;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UIButton = (props: ButtonProps) => {
  return (
    <Button variant="primary" type="button" onClick={props.clickHandler}>
      {props.btnText}
    </Button>
  );
};

export default UIButton;
