const express = require('express');
const router = express.Router();
const axios = require('axios');

// router.get('/', (req, res) => {
//     const wgerUrl = `https://wger.de/api/v2/exerciseimage/?api_key=${process.env.WGER_API_KEY}`

//     axios.get(wgerUrl)
//         .then((response) => {
//             const exerciseImages = response.data.results.map((result) => ({
//                 id: result.id,
//                 exercisebase: result.exercise_base,
//                 image: result.image,
//             }));

router.get('/', (req, res) => {
    const wgerUrl = `https://wger.de/api/v2/exercise/?language=2&api_key=${process.env.WGER_API_KEY}&limit=8`

    axios.get(wgerUrl)
        .then((response) => {
            const exerciseImages = response.data.results.map((result) => ({
                id: result.id,
                exercisebase: result.exercise_base,
                name: result.name,
                description: result.description,
                muscles: result.muscles,
                muscles_secondary: result.muscles_secondary,
            }));
            res.send(exerciseImages)
        })
        .catch((err) => {
            console.log('GET wgerUrl error:', err);
            res.sendStatus(500);
        })
})

module.exports = router;