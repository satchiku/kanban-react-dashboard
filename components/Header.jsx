import React, { useState } from 'react';
import '../styles/Header.css';

function Header({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          Display <span className="arrow">▼</span>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <label>Grouping</label>
              <select
                value={grouping}
                onChange={(e) => onGroupingChange(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label>Ordering</label>
              <select
                value={sorting}
                onChange={(e) => onSortingChange(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;