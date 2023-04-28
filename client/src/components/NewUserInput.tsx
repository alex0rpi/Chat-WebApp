// Only visible at the beggining, once the user enters the app to identify itself.

import UIButton from './UIButton';

// type Props = {}

const NewUserInput = () => {
  const handleUserEnter = async () => {
    const response = await fetch('http://localhost:5000/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'Vegita' }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="name-field">
      <form>
        <input type="text" placeholder="Vegita Prince of all Sayans" />
        <UIButton btnText="ENTER" clickHandler={handleUserEnter} />
      </form>
    </div>
  );
};

export default NewUserInput;
