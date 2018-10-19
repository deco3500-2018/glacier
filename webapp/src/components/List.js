import React,  { Component } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
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

export default List;