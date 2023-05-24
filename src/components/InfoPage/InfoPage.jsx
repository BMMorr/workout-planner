import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './InfoPage.css'

function InfoPage() {
  const dispatch = useDispatch();
  const wger = useSelector((state) => state.wger);
  const tableData = useSelector((state) => state.workTableReducer);
  const [query, setQuery] = useState('');
  const [exercise, setExercise] = useState('');
  const [workout, setWorkout] = useState('');

  useEffect(() => {
    dispatch({ type: 'GET_EXERCISE' });
  }, []);

  const handleSearch = () => {
    dispatch(search(query));
  };

  function addWorkout(event) {
    event.preventDefault();
    dispatch({
      type: 'ADD_WORKOUT',
      payload: {
        exercise_name: tableData,
        workout_name: workout
      }
    })
  }

  const insertExercise = () => {
    dispatch({
      type: 'ADD_TO_TABLE',
      payload: exercise,
    })
    setExercise("");
  }




  return (
    <div className='container'>
      <h1>Create Workout</h1>
      <div className='inputs'>
        <div className='search-inputs'>
          <input
            type='text'
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <select>
            <option value="">Any Body Part</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
            <option value="Abs">Abs</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          <input
            type='text'
            value={workout}
            placeholder="Workout Title"
            onChange={(e) => setWorkout(e.target.value)}
            className='editable-title'
          />
        </div>
        <div className='add-inputs'>
          <input
            type='text'
            value={exercise}
            placeholder="Exercise Name"
            onChange={(e) => setExercise(e.target.value)}
          />
          <button onClick={insertExercise}>Add Exercise</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((exercise, index) => (
            <tr key={index}>
              <td>
                {exercise}
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='footy'>
        <div>
          {wger.map((exercise) => (
            <div key={exercise.id}>
              <p>{exercise.name}</p>
            </div>
          ))}
        </div>
        <div className='create-btn' >
          <button onClick={addWorkout}>Create Workout</button>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
