import db from '../client.js';

export async function createPlaylist({name, description}){
    const text = `
    INSERT INTO playlists(name, description)
    VALUES($1, $2)
    RETURNING *`
    const values = [name,description]
    const { rows:[playlist]} = await db.query(text,values)
    return playlist;
}

export async function getPlaylists() {
    const text = `
    SELECT * FROM playlists`;
    const { rows:playlists } = await db.query(text);
    return playlists;
    
}