import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function TableList() {
    const dispatch = useDispatch();
    const hometable = useSelector(store => store.homeTableReducer);
    const history = useHistory();
    useEffect(() => {
        dispatch({ type: 'GET_WORKOUT_HOME' });
    }, []);
    

    const startPage = () => {
        dispatch({
            type: 'SELECT_WORKOUT',
            payload: workout.id
        });
        history.push(`/start/${workout.id}`);
    }

    return (
        <>
            {hometable.map((data) => (
                <div className="workout-table">
                    <div className="graybox">
                        <div className="purplebox">
                            <p key={data.user_id}>
                                {data.workout_name}</p>
                            <div>
                                <button key={data.workout_id} onClick={startPage}>Start</button>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default TableList;