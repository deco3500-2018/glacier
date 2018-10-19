import React from 'react';
import { Link } from 'react-router-dom';



export const Login = () => {

  return (
      <div className="title">
        <h1>React Router demo</h1>
        <Link to="/list"><button>Show the List</button></Link>
      </div>
  )
}

export const List = () => {
  return (
    <div className="nav">
      <ul>
        <li>list item</li>
        <li>list item</li>
      </ul>
      <Link to="/"><button>Back Home</button></Link>
    </div>
  )
}

