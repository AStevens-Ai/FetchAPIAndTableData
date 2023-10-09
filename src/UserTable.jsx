import { useState, useEffect } from 'react'
import './styles.css'

function UserTable() {
    const [name, setName] = useState([])
    const [editUserId, setEditUserId] = useState(null)
    const [editedName, setEditedName] = useState('')

    const handleEdit = (userId, userName) => {
        setEditUserId(userId)
        setEditedName(userName)
    }

    const handleSave = (userId, newName) => {
        const updatedUsers = name.map((user) =>
            user.id === userId ? { ...user, name: newName } : user
        )
        setName(updatedUsers)
        setEditUserId(null)
    }

    const handleCancel = () => {
        setEditUserId(null)
    }

    const handleDelete = (userId) => {
        const updatedData = name.filter((user) => user.id !== userId)
        setName(updatedData)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setName(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

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
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {name.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                {editUserId === user.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                        <button onClick={() => handleSave(user.id, editedName)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </>
                                ) : (
                                    user.name
                                )}
                            </td>
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
                            <td>{user.company.name}</td>
                            <td>{user.company.catchPhrase}</td>
                            <td>
                                {editUserId === user.id ? null : <button onClick={() => handleEdit(user.id, user.name)}>Edit</button>}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable
