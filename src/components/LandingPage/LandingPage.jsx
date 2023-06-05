import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <div className="heading-container">
        <h2>{heading}</h2>
      </div>
      <div className="grid">
        <div className="grid-col">
          <p>
            Workout Planner is a fitness app that allows you to
            create personalized workouts with ease. Where you can
            choose exercises, set reps, weights, and rest times, and
            store them in a database to track your progress. Workout
            Planner simplifies the process of crafting custom routines
            while ensuring your progress is conveniently tracked over time.
            Say goodbye to the hassle of carrying notebooks and pencils in the
            gym for manual record-keeping, and embark on a seamless fitness journey
            with Workout Planner.
          </p>
        </div>
        <div className="grid-col">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
