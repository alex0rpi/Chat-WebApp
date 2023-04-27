// Only visible at the beggining, once the user enters the app to identify itself.

// type Props = {}

const NewUserInput = () => {

const handleUserEnter = async() => {
    const response = await fetch('http://localhost:5000/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'Vegita' }),
    });
    const data = await response.json();
    console.log(data);
}

  return (
    <form>
      <input type="text" placeholder="Vegita Prince of all Sayans" />
      <button type="submit" onClick={handleUserEnter}>ENTER</button>
    </form>
  );
};

export default NewUserInput;
