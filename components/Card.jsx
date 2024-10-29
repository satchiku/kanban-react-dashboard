import React from 'react';
import '../styles/Card.css';

function Card({ ticket, user }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return '🔴'; // Urgent
      case 3: return '🟠'; // High
      case 2: return '🟡'; // Medium
      case 1: return '🔵'; // Low
      default: return '⚪'; // No priority
    }
  };

  const getUserStatusColor = (available) => {
    return available ? 'green' : 'gray';
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar-container">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <span 
            className="user-status-indicator" 
            style={{ backgroundColor: getUserStatusColor(user.available) }}
          ></span>
        </div>
      </div>
      <h3 className="card-title">{ticket.title}</h3>
      <div className="card-tags">
        <span className="tag priority-tag">
          {getPriorityIcon(ticket.priority)}
        </span>
        {ticket.tag.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default Card;