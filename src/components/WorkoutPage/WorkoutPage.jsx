import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import './WorkoutPage.css';

function WorkoutPage() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const startReducer = useSelector((store) => store.startReducer);
    const [workoutData, setWorkoutData] = useState({});

    const handleInputChange = (event) => {
        const { value } = event.target;
        const exerciseId = event.target.dataset.exerciseId;
        const field = event.target.name;
        setWorkoutData((prevData) => {
            const updatedData = {
                ...prevData,
                [exerciseId]: {
                    ...prevData[exerciseId],
                    [field]: value,
                },
            };
            return updatedData;
        });
    };

    const completeWorkout = () => {
        console.log('finish clicked');
        const exerciseIds = Object.keys(workoutData || {});
        let workoutId = startReducer[0].workout_id;
        const exercises = exerciseIds.map((exerciseId) => ({
            exerciseId,
            sets: workoutData[exerciseId]?.sets,
            reps: workoutData[exerciseId]?.reps,
            weight: workoutData[exerciseId]?.weight,
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
    }

    return (
        <div className="container">
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <LogOutButton className="btn" />
            {startReducer.map((data) => (
                <div className="workout-table" key={data.user_id}>
                    <div className="graybox">
                        <div className="purplebox">
                            <p>{data.exercise_name}</p>
                            <form>
                                <input
                                    type="text"
                                    value={workoutData[data.exercise_id]?.reps || ''}
                                    placeholder="Reps"
                                    data-exercise-id={data.exercise_id}
                                    name="reps"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    value={workoutData[data.exercise_id]?.sets || ''}
                                    placeholder="Sets"
                                    data-exercise-id={data.exercise_id}
                                    name="sets"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    value={workoutData[data.exercise_id]?.weight || ''}
                                    placeholder="Weight"
                                    data-exercise-id={data.exercise_id}
                                    name="weight"
                                    onChange={handleInputChange}
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

