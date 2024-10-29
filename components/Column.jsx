import React from 'react';
import Card from './Card';
import { Plus, MoreHorizontal } from 'lucide-react';
import '../styles/Column.css';

function Column({ title, tickets, users, grouping }) {
  const getColumnIcon = () => {
    if (grouping === 'priority') {
      switch (title.toLowerCase()) {
        case 'no priority': return '⚪';
        case 'urgent': return '🔴';
        case 'high': return '🟠';
        case 'medium': return '🟡';
        case 'low': return '🔵';
        default: return '📊';
      }
    } else if (grouping === 'status') {
      switch (title.toLowerCase()) {
        case 'backlog': return '📋';
        case 'todo': return '📝';
        case 'in progress': return '🔄';
        case 'done': return '✅';
        case 'canceled': return '❌';
        default: return '📊';
      }
    } else if (grouping === 'user') {
      const user = users.find(user => user.name === title);
      if (user) {
        return (
          <div className="user-avatar-container">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <span 
              className="user-status-indicator" 
              style={{ backgroundColor: user.available ? 'green' : 'gray' }}
            ></span>
          </div>
        );
      }
      return '👤';
    }
    return '📊';
  };

  return (
    <div className="column" data-grouping={grouping} data-title={title.toLowerCase()}>
      <div className="column-header">
        <div className="column-title-group">
          <span className="column-icon">{getColumnIcon()}</span>
          <h2 className="column-title">{title}</h2>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="column-actions">
          <button className="column-action-btn">
            <Plus size={16} />
          </button>
          <button className="column-action-btn">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      <div className="column-cards">
        {tickets.map(ticket => (
          <Card 
            key={ticket.id} 
            ticket={ticket} 
            user={users.find(user => user.id === ticket.userId)}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
