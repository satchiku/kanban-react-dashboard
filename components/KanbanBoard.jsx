import React from 'react';
import Column from './Column';
import '../styles/KanbanBoard.css';

function KanbanBoard({ tickets, users, grouping, sorting }) {
  const groupTickets = () => {
    const grouped = {};
    tickets.forEach(ticket => {
      let key;
      switch (grouping) {
        case 'status':
          key = ticket.status;
          break;
        case 'user':
          key = users.find(user => user.id === ticket.userId)?.name || 'Unassigned';
          break;
        case 'priority':
          key = getPriorityLabel(ticket.priority);
          break;
        default:
          key = 'Other';
      }
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });
    return grouped;
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'No priority';
    }
  };

  const groupedTickets = groupTickets();
  const columns = Object.entries(groupedTickets).map(([title, tickets]) => (
    <Column key={title} title={title} tickets={sortTickets(tickets)} users={users} />
  ));

  return (
    <div className="kanban-board">
      {columns}
    </div>
  );
}

export default KanbanBoard;