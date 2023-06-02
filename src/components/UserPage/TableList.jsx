import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

function TableList() {
    const dispatch = useDispatch();
    const hometable = useSelector(store => store.homeTableReducer);
    const history = useHistory();
    useEffect(() => {
        dispatch({ type: 'GET_WORKOUT_HOME' });
    }, []);


    const startPage = (workoutId) => {
        dispatch({
            type: 'GET_START',
            payload: workoutId
        });
        history.push(`/start/${workoutId}`);
    }

    const confirmDelete = (workoutId) => {
        Swal.fire({
          title: 'Confirm Delete',
          text: 'Are you sure you want to delete this workout?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) {
            deleteWorkout(workoutId);
          }
        });
      }
      
      const deleteWorkout = (workoutId) => {
        dispatch({
          type: 'DELETE_WORKOUT',
          payload: workoutId
        });
      }

      const editPage = (workoutId) => {
        dispatch({
          type: 'GET_START',
          payload: workoutId
        });
        history.push(`/edit/${workoutId}`);
      }


    return (
        <>
            {hometable.map((data) => (
                <div className="workout-table" key={data.workout_id}>
                    <div className="graybox">
                        <div className="purplebox">
                            <p>{data.workout_name}</p>
                            <div>
                                <button onClick={() => startPage(data.workout_id)}>Start</button>
                                <button onClick={() => editPage(data.workout_id)}>Edit</button>
                                <button onClick={() => confirmDelete(data.workout_id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default TableList;