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
app.use('/playlists', playlistsRouter);

app.use((err, req, res, next) => {
  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }
  
  if (err.code === '22P02') {
    return res.status(400).send(err.detail);
  }

  if (err.code === '22007') {
    return res.status(400).send(err.detail);
  }

  if (err.code === '22008') {
    return res.status(400).send(err.detail);
  }


  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

