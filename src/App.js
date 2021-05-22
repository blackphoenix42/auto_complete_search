import { useEffect, useState } from 'react';
import axios from 'axios'

import './App.css';

function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users?page=2')
      setUsers(response.data.data)
    }
    loadUsers()
  }, [])
  const onChangeHandler = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, 'gi')
        return user.email.match(regex)
      })
    }
    console.log(matches)
    setSuggestions(matches)
    setText(text)
  }

  return (
    <div className="container">
      <input
        className="col-md-12 input"
        style={{ marginTop: 10 }}
        type="text"
        name=""
        id=""
        onChange={e => onChangeHandler(e.target.value)}
        value={text}>
      </input>
      { suggestions && suggestions.map((suggestion, i) =>
        <div key={i} className="col-md-12 justify-content-md-center">{suggestion.email}</div>
      )}

    </div>
  );
}

export default App;
