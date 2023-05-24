const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('herherhehrherhehrehr   ----', req.user.id);
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






module.exports = router;



// const query = `SELECT
// "user"."id" AS "user_id",
// "user"."username",
// "workout"."id" AS "workout_id",
// "workout"."name" AS "workout_name",
// "exercise"."id" AS "exercise_id",
// "exercise"."name" AS "exercise_name",
// "completed_workout"."id" AS "completed_workout_id",
// TO_CHAR("completed_workout"."date", 'DD Mon YYYY') AS "completed_workout_date",
// TO_CHAR("exercise_data"."date", 'DD Mon YYYY') AS "exercise_data_date",
// "exercise_data"."sets",
// "exercise_data"."reps",
// "exercise_data"."weight",
// "exercise_data"."rest"
// FROM "user"
// JOIN "workout" ON "user"."id" = "workout"."user_id"
// JOIN "exercise" ON "workout"."id" = "exercise"."workout_id"
// JOIN "completed_workout" ON "workout"."id" = "completed_workout"."workout_id"
// JOIN "exercise_data" ON "completed_workout"."id" = "exercise_data"."completed_workout_id"
// WHERE "user"."id" = $1
// ORDER BY exercise_data.id;`;