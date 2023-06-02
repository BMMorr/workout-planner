import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EditPage() {
    const dispatch = useDispatch();
    const wger = useSelector((state) => state.wger);
    const startReducer = useSelector((store) => store.startReducer);
    const [exercise, setExercise] = useState('');
    const [workoutID, setWorkoutID] = useState('');
    const [workoutName, setWorkoutName] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'GET_EXERCISE' });
    }, [dispatch]);
    useEffect(() => {
        if (startReducer.length > 0) {
            setWorkoutID(startReducer[0].workout_id);
            setWorkoutName(startReducer[0].workout_name);
        }
    }, [startReducer]);

    const insertExercise = () => {
        dispatch({
            type: 'ADD_EDIT_EXERCISE',
            payload: {
                exercise_name: exercise,
                workout_id: workoutID
            }
        });
        setExercise("");
    };

    const deleteExercise = (exerciseID) => {
        dispatch({
            type: 'DELETE_EXERCISE',
            payload: {
                exercise_id: exerciseID,
                workout_id: workoutID
            }
        });
    };

    const handleWorkoutNameChange = (e) => {
        setWorkoutName(e.target.value);
        setIsChanged(true);
    };

    const saveWorkoutName = () => {
        setIsChanged(false);
        dispatch({
            type: 'UPDATE_WORKOUT_NAME',
            payload: {
                workout_name: workoutName,
                workout_id: workoutID
            }
        });
    };

    return (
        <div className='container'>
            <h1>Edit Workout</h1>
            <div className='inputs'>
                <div>
                    <input
                        type='text'
                        value={workoutName}
                        placeholder='Workout Title'
                        onChange={handleWorkoutNameChange}
                        className='editable-title'
                    />
                    {isChanged && <button onClick={saveWorkoutName}>Save</button>}
                </div>
                <form className='add-inputs' onSubmit={insertExercise}>
                    <div>
                        <input
                            type='text'
                            value={exercise}
                            placeholder="Exercise Name"
                            onChange={(e) => setExercise(e.target.value)}
                        />
                        <button type="submit">Add Exercise</button>
                    </div>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Exercise</th>
                    </tr>
                </thead>
                <tbody>
                    {startReducer.map((data, index) => (
                        <tr key={`${data.exercise_id}-${index}`}>
                            <td>
                                {data.exercise_name}
                                <button onClick={() => deleteExercise(data.exercise_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EditPage;