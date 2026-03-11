import express from "express";
import morgan from "morgan";
import tracksRouter from './api/tracks.js'
import playlistsRouter from './api/playlists.js'


const app = express();
export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use('/tracks', tracksRouter);

