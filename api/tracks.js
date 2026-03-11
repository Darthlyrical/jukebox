import express from 'express';
import * as tracksQueries from '../db/queries/tracks.js';

const router = express.Router();
export default router;

router.get('/', async (req, res)=>{
    const tracks = await tracksQueries.getTracks();
    res.send(tracks);
});

router.param('id', async (req, res, next, id)=>{
    const track = await tracksQueries.getTrackById(id);
    if(!track) return res.status(404).send('Track not found.');

    req.track = track;
    next();
});

router.get('/:id', async (req,res) =>{
    res.send(req.track)
});