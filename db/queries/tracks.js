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
    const { rows:track } = await db.query(text, [id])
    return track;
}