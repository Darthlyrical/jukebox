import express from 'express';
import * as playlistsQueries from '../db/queries/playlists.js';

const router = express.Router();
export default router;

router.get('/', async (req, res) =>{
    const playlists = await playlistsQueries.getPlaylists();
    res.send(playlists);
})