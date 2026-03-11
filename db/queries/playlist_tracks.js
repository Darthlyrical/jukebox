import db from "../client.js";

export async function createPlaylistTrack({playlistId, trackId}){
    const text =`
    INSERT INTO playlists_tracks(playlist_id,track_id)
    VALUES($1,$2)
    RETURNING *`;

    const values = [playlistId,trackId];
    const { rows:[playlistTrack] } = await db.query(text,values);
    return playlistTrack;
}