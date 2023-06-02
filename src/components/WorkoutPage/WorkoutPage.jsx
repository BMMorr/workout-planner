import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import './WorkoutPage.css';
import { useHistory } from 'react-router-dom';

function WorkoutPage() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const startReducer = useSelector((store) => store.startReducer);
    const [workoutData, setWorkoutData] = useState({});
    const history = useHistory();

    const handleInputChange = (event, index) => {
        const { value } = event.target;
        const exerciseId = event.target.dataset.exerciseId;
        const field = event.target.name;
        setWorkoutData((prevData) => {
            // Create an object called updatedData to update the workoutData state.
            // The updatedData object is created by taking the previous data (prevData) and making 
            // changes to a specific exercise (exerciseId) and its field (field) with a new value.
            const updatedData = {
                ...prevData, // Copy all the previous data into the updatedData object.
                [exerciseId]: { // Update the specific exercise with the exerciseId.
                    ...prevData[exerciseId], // Copy all the previous fields of the exercise.
                    [field]: value, // Update the specific field of the exercise with the new value.
                },
            };
            return updatedData;
        });
    };

    const completeWorkout = () => {
        console.log('finish clicked');
        const exerciseIds = Object.keys(workoutData || {});
        // Retrieve an array of exercise IDs from the workoutData object.
        // If workoutData is null or undefined, set exerciseIds to an empty array.
        let workoutId = startReducer[0].workout_id;
        const exercises = exerciseIds.map((exerciseId) => ({
            exerciseId,
            sets: workoutData[exerciseId]?.sets || '',
            reps: workoutData[exerciseId]?.reps || '',
            weight: workoutData[exerciseId]?.weight || '',
            // exercises is an array that stores exercise objects. Each object contains the exercise ID 
            // along with the sets, reps, and weight values from workoutData. If any of these values are 
            // missing or undefined, they are set to an empty string.
        }));
        console.log('---=workoutId=--', workoutId);
        console.log('---=exercises=--', exercises);
        dispatch({
            type: 'ADD_COMPLETE',
            payload: {
                workoutId,
                exercises,
            },
        });
        history.push('/user');
    };

    return (
        <div className="container">
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <LogOutButton className="btn" />
            {startReducer.map((data, index) => (
                <div className="workout-table" key={`${data.user_id}-${index}`}>
                    {/* this makes the error go away /\/\/\*/}
                    <div className="graybox">
                        <div className="purplebox">
                            <p>{data.exercise_name}</p>
                            <form>
                                <input
                                    type="text"
                                    value={workoutData[data.exercise_id]?.sets || ''}
                                    placeholder="Sets"
                                    data-exercise-id={data.exercise_id}
                                    name="sets"
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                                <input
                                    type="text"
                                    value={workoutData[data.exercise_id]?.reps || ''}
                                    placeholder="Reps"
                                    data-exercise-id={data.exercise_id}
                                    name="reps"
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                                <input
                                    type="text"
                                    value={workoutData[data.exercise_id]?.weight || ''}
                                    placeholder="Weight"
                                    data-exercise-id={data.exercise_id}
                                    name="weight"
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            ))}
            <div className="finish-btn">
                <p> </p>
                <button type="button" onClick={completeWorkout}>
                    Finish
                </button>
            </div>
        </div>
    );
}

export default WorkoutPage;

