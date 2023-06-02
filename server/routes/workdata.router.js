const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('eq.user.id ----', req.user.id);
  const userId = req.user.id;
  const query = `SELECT
    "user"."id" AS "user_id",
    "user"."username",
    "workout"."id" AS "workout_id",
    "workout"."name" AS "workout_name",
    "exercise"."id" AS "exercise_id",
    "exercise"."name" AS "exercise_name",
    TO_CHAR("exercise_data"."date", 'DD Mon YYYY') AS "exercise_data_date",
    "exercise_data"."sets",
    "exercise_data"."reps",
    "exercise_data"."weight",
    "exercise_data"."rest"
  FROM "user"
  JOIN "workout" ON "user"."id" = "workout"."user_id"
  JOIN "exercise" ON "workout"."id" = "exercise"."workout_id"
  LEFT JOIN "exercise_data" ON "exercise"."id" = "exercise_data"."exercise_id"
  WHERE "user"."id" = $1
  ORDER BY exercise_data.id;`;
  pool.query(query, [userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: workdata get router', err);
      res.sendStatus(500)
    })
});

router.get('/start/:id', (req, res) => {
  console.log('/start info----', req.params, '---');
  const userId = req.user.id;
  const workoutId = req.params.id;
  const query = `SELECT
    "user"."id" AS "user_id",
    "workout"."id" AS "workout_id",
    "workout"."name" AS "workout_name",
    "exercise"."id" AS "exercise_id",
    "exercise"."name" AS "exercise_name"

  FROM "user"
  JOIN "workout" ON "user"."id" = "workout"."user_id"
  JOIN "exercise" ON "workout"."id" = "exercise"."workout_id"
  WHERE "user"."id" = $1 AND "workout_id" = $2 ;`;
  pool.query(query, [userId, workoutId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: workdata/start/:id get router', err);
      res.sendStatus(500)
    })

});

router.get('/workout', (req, res) => {
  console.log('/workout----', req.user.id);
  const userId = req.user.id;
  const query = `SELECT
    "user"."id" AS "user_id",
    "user"."username",
    "workout"."id" AS "workout_id",
    "workout"."name" AS "workout_name"
  FROM "user"
  JOIN "workout" ON "user"."id" = "workout"."user_id"
  WHERE "user"."id" = $1;`;
  pool.query(query, [userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: workdata/workout get router', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  const workout = req.body.workout_name;
  const userId = req.user.id;
  const exerciseNames = req.body.exercise_name;
  const sqlValues = [workout, userId];

  const insertExerciseQuery = `
    INSERT INTO "exercise" ("name", "workout_id")
    SELECT unnest($1::text[]), $2
    RETURNING "id";
  `;

  pool
    .query('INSERT INTO "workout" ("name", "user_id") VALUES ($1, $2) RETURNING "id"', sqlValues)
    .then((result) => {
      const workoutId = result.rows[0].id;
      const exerciseValues = [exerciseNames, workoutId];
      return pool.query(insertExerciseQuery, exerciseValues);
    })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Insertion failed:', err);
      res.sendStatus(500);
    });
});

router.post('/exercise', (req, res) => {
  const workout = req.body.workout_id;
  const userId = req.user.id;
  const exerciseNames = req.body.exercise_name;
  const sqlValues = [exerciseNames, workout];
  console.log('sql values----', sqlValues);

  const insertExerciseQuery = `INSERT INTO "exercise" ("name", "workout_id")
    VALUES ($1, $2);
  `;

  pool
    .query(insertExerciseQuery, sqlValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Insertion failed:', err);
      res.sendStatus(500);
    });
});

router.post('/complete', async (req, res) => {
  try {
    const { workoutId, exercises } = req.body;
    console.log('Number of exercises:', exercises.length);
    console.log('exercises here-----', exercises);

    // Insert the completed workout into the database
    const completedWorkoutInsertQuery = `
      INSERT INTO "completed_workout" ("date", "workout_id")
      VALUES (CURRENT_DATE, $1)
      RETURNING "id";
    `;
    const completedWorkoutInsertValues = [workoutId];

    const completedWorkoutInsertResult = await pool.query(
      completedWorkoutInsertQuery,
      completedWorkoutInsertValues
    );
    const completed_workout_id = completedWorkoutInsertResult.rows[0].id;
    console.log('===completed_workout_id should equal 6 maybe---', completed_workout_id);

    // Insert the exercise data for each exercise
    const exerciseDataInsertQuery = `
      INSERT INTO "exercise_data" ("date", "sets", "reps", "weight", "exercise_id", "completed_workout_id")
      VALUES (CURRENT_DATE, $1, $2, $3, $4, $5);
    `;
    console.log('made it here');

    for (let i = 0; i < exercises.length; i++) {
      console.log('made it there');
      const exercise = exercises[i];
      console.log('Number of exercises:', exercises.length);
      const { sets, reps, weight, exerciseId } = exercise;

      // Insert the exercise data
      const exerciseDataInsertValues = [
        sets,
        reps,
        weight,
        exerciseId,
        completed_workout_id,
      ];
      console.log('exerciseDataInsertQuery:', exerciseDataInsertQuery);
      console.log('exerciseDataInsertValues:', exerciseDataInsertValues);

      await pool.query(exerciseDataInsertQuery, exerciseDataInsertValues);
    }
    res.sendStatus(201);
  } catch (error) {
    console.error('Insertion failed:', error);
    res.sendStatus(500);
  }
});
router.put('/update', (req, res) => {
  const workoutName = req.body.workout_name;
  const workoutID = req.body.workout_id;
  const sqlValues = [workoutName, workoutID];
  console.log('sql values /update----', sqlValues);
  const insertExerciseQuery = `
  UPDATE "workout"
  SET "name" = $1
  WHERE "id" = $2;
  `;
  pool
    .query(insertExerciseQuery, sqlValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('update failed:', err);
      res.sendStatus(500);
    });
});
router.delete('/:workoutID', (req, res) => {
  console.log('workoutID///--', req.params.workoutID);
  console.log('parmas///--', req.params);
  console.log('req.body///--', req.body);
  const workoutID = req.params.workoutID;

  // Define individual delete queries
  const deleteExerciseDataQuery = `DELETE FROM "exercise_data" WHERE "exercise_id" IN (SELECT "id" FROM "exercise" WHERE "workout_id" = $1)`;
  const deleteExerciseQuery = `DELETE FROM "exercise" WHERE "workout_id" = $1`;
  const deleteCompletedWorkoutQuery = `DELETE FROM "completed_workout" WHERE "workout_id" = $1`;
  const deleteWorkoutQuery = `DELETE FROM "workout" WHERE "id" = $1`;

  // Execute the delete queries separately
  pool.query(deleteExerciseDataQuery, [workoutID])
    .then(() => pool.query(deleteExerciseQuery, [workoutID]))
    .then(() => pool.query(deleteCompletedWorkoutQuery, [workoutID]))
    .then(() => pool.query(deleteWorkoutQuery, [workoutID]))
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: workdata/:workoutID delete router', err);
      res.sendStatus(500);
    });
});

router.delete('/edit/:exerciseID', (req, res) => {
  console.log('exercise_id///--', req.params.exerciseID);
  console.log('parmas///--', req.params);
  console.log('req.body///--', req.body);
  const exerciseID = req.params.exerciseID;

  // Define individual delete queries
  const deleteExerciseDataQuery = `DELETE FROM "exercise_data" WHERE "exercise_id" = $1;`;
  const deleteExerciseQuery = `DELETE FROM "exercise" WHERE "id" = $1;`;

  // Execute the delete queries separately
  pool.query(deleteExerciseDataQuery, [exerciseID])
    .then(() => pool.query(deleteExerciseQuery, [exerciseID]))
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: workdata/:exerciseID delete router', err);
      res.sendStatus(500);
    });
});



module.exports = router;

