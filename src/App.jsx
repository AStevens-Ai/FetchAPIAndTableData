import { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [name, setName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setName(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="backgroundColor">
      <h1>User Data Table</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Geo</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Company Catch Phrase</th>
          </tr>
        </thead>
        <tbody>
          {name.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
              </td>
              <td>
                {user.address.geo.lat}, {user.address.geo.lng}
              </td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}, {user.company.bs}</td>
              <td>{user.company.catchPhrase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
