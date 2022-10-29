
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = event =>{
    event.preventDefault();
    const name = event.target.email.value;
    const email = event.target.name.value;
    const user = { name, email};
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users, data];
      setUsers(newUsers);
    })
    .catch(error => console.log(error));

    event.target.reset(); 
  }

  return (
    <div className="App">

      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='name' />
        <br />
        <input type="email" name='email' placeholder='email' />
        <br />
        <button type='submit'> Add Users</button>
      </form>

      <h4>This is a test: {users.length}</h4>
      <div>
        {
          users.map(user => <p
            key={user._id}
          > {user.name} {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
