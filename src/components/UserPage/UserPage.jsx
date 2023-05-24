import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import './UserPage.css';
import TableList from './TableList';
import { useHistory } from 'react-router-dom';

function UserPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const plannerPage = () => {
    history.push('/info');
  };
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <div className='buttonbox'>
        <button onClick={plannerPage} className="createbtn">Create</button>
      </div>


      <h1 className="work-title">Workouts</h1>
      <TableList />
    </div>
  );
}

export default UserPage;
