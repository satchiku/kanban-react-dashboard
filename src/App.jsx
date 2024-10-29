import React, { useState, useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import Header from '../components/Header';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

  useEffect(() => {
    fetchData();
    const savedState = localStorage.getItem('kanbanState');
    if (savedState) {
      const { grouping, sorting } = JSON.parse(savedState);
      setGrouping(grouping);
      setSorting(sorting);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanState', JSON.stringify({ grouping, sorting }));
  }, [grouping, sorting]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
  };

  return (
    <div className="app">
      <h1>Display state:</h1>
      <Header
        grouping={grouping}
        sorting={sorting}
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
      />
      
      {/* Display grouping and sorting selection
      
      <h3>Grouping by {grouping} is selected. </h3>
     <h3>Ordering by {sorting} is selected. </h3> */}
      
      {/* Display state-based messages based on grouping
      {grouping === 'priority' && <p>Grouping by priority is selected. State based on display.</p>}
      {grouping === 'user' && <p>Grouping by user is selected.</p>}
       */}
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
      />
    </div>
  );
}

export default App;
