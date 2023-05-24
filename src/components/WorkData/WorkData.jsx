import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './WorkData.css'


function WorkData() {
    const dispatch = useDispatch();
    const workdata = useSelector(store => store.workdataReducer);
    console.log('workdata------', workdata);

    useEffect(() => {
        dispatch({ type: 'GET_WORKDATA' });
    }, []);

    return (
        <main>
            <h1>Work Out table</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Workout ID</th>
                        <th>Workout Name</th>
                        <th>Exercise ID</th>
                        <th>Exercise Name</th>
                        {/* <th>Completed Workout ID</th>
                        <th>Completed Workout Date</th> */}
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Rest</th>
                        <th>Exercise Data Date</th>
                    </tr>
                </thead>
                <tbody>
                    {workdata.map((data) => (
                        <tr key={data.id + data.user_id + data.workout_id + data.exercise_id}>
                            <td>{data.user_id}</td>
                            <td>{data.username}</td>
                            <td>{data.workout_id}</td>
                            <td>{data.workout_name}</td>
                            <td>{data.exercise_id}</td>
                            <td>{data.exercise_name}</td>
                            {/* <td>{data.completed_workout_id}</td>
                            <td>{data.completed_workout_date}</td> */}
                            <td>{data.sets}</td>
                            <td>{data.reps}</td>
                            <td>{data.weight}</td>
                            <td>{data.rest}</td>
                            <td>{data.exercise_data_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </main>

    );
}

export default WorkData;
