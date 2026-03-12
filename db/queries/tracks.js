import db from '../client.js';

export async function createTrack({name, durationMs}){
    const text = `
    INSERT INTO tracks(name,duration_ms)
    VALUES($1,$2)
    RETURNING *`;
    const values = [name,durationMs];
    const { rows:[track] } = await db.query(text,values);
    return track;
}

export async function getTracks() {
    const text = `SELECT * FROM tracks`;
    const { rows:tracks } = await db.query(text);
    return tracks;
}

export async function getTrackById(id){
    const text = `
    SELECT * FROM tracks
    WHERE id = $1`;
    const { rows:[track] } = await db.query(text, [id])
    return track;
}

export async function getTracksByPlaylistId(id){
    const text = `
    SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
    WHERE playlists_tracks.playlist_id = $1
    ORDER BY tracks.id`;

    const { rows:tracks } = await db.query(text, [id]);
    return tracks;
}

export async function addTrackToPlaylist({playlistId, trackId}){
    const text = `
    INSERT INTO playlists_tracks(playlist_id, track_id)
    VALUES ($1,$2)
    RETURNING *;
    `;

    const values = [playlistId,trackId];
    const { rows:[playlistTrack] } = await db.query(text, values);
    return playlistTrack;
}