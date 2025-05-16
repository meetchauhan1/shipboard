import React from 'react';
import { Link } from 'react-router-dom';

const ShipList = ({ ships }) => {
  return (
    <div className="ship-list">
      <h2>Ship List</h2>
      <ul>
        {ships.map((ship) => (
          <li key={ship.id}>
            <Link to={`/ship/${ship.id}`}>{ship.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipList;
