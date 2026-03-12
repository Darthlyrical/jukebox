import express from 'express';
import * as playlistsQueries from '../db/queries/playlists.js';
import * as tracksQueries from '../db/queries/tracks.js';


const router = express.Router();
export default router;

router.get('/', async (req, res) => {
    const playlists = await playlistsQueries.getPlaylists();
    res.send(playlists);
})

router.post('/', async (req,res,next)=>{
  if (!req.body) return res.status(400).send("Request body required.");

  const { name, description } = req.body;
  if (!name || !description){
    return res.status(400).send('Request body needs: name and description.')
  }

  const playlist = await playlistsQueries.createPlaylist({ name, description });

  res.status(201).send(playlist);
})

router.param('id', async (req, res, next, id) => {
    const playlist = await playlistsQueries.getPlaylistById(id);
    if (!playlist) return res.status(404).send('Playlist not found.');

    req.playlist = playlist;
    next();
})

router.get('/:id', async (req, res) => {
    res.send(req.playlist);
})

router.get('/:id/tracks', async (req, res, next) => {
    try {
        const tracks = await tracksQueries.getTracksByPlaylistId(req.playlist.id);
        res.send(tracks);
    } catch (err) {
        next(err);
    }
})

function requireTrackId(req, res, next) {
    if (!req.body || req.body.trackId === undefined) {
        return res.status(400).send("trackId is required.");
    }

    const trackId = Number(req.body.trackId);
    if (!Number.isInteger(trackId)) {
        return res.status(400).send("trackId must be a number.");
    }

    req.trackId = trackId;
    next();
}

async function requireTrackExists(req, res, next) {
    const track = await tracksQueries.getTrackById(req.trackId);
    if (!track) return res.status(400).send("Track not found.");
    next();
}

router.post('/:id/tracks', requireTrackId, requireTrackExists, async (req, res, next) => {
    try {
        const playlistTrack = await tracksQueries.addTrackToPlaylist({
            playlistId: req.playlist.id,
            trackId: req.trackId,
        });
        res.status(201).send(playlistTrack);
    } catch (err) {
        if (err.code === "23505") return res.status(400).send("Track already in playlist.");

        next(err);

    }
})
