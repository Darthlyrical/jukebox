import db from "#db/client";
import { createTrack } from "#db/queries/tracks";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlist_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const tracksToCreate = [
    { name: "Neon Skyline", durationMs: 184000 },
    { name: "Slow Orbit", durationMs: 201000 },
    { name: "Static Bloom", durationMs: 176000 },
    { name: "Velvet Signal", durationMs: 223000 },
    { name: "Golden Transit", durationMs: 196000 },
    { name: "Signal to Shore", durationMs: 209000 },
    { name: "Moonlit Avenue", durationMs: 188000 },
    { name: "Paper Thunder", durationMs: 214000 },
    { name: "Glass Harbor", durationMs: 172000 },
    { name: "Midnight Arcade", durationMs: 207000 },
    { name: "Highline Echo", durationMs: 193000 },
    { name: "Afterglow Drive", durationMs: 229000 },
    { name: "Silver Weather", durationMs: 182000 },
    { name: "Parallel Hearts", durationMs: 199000 },
    { name: "Crimson Current", durationMs: 221000 },
    { name: "Open Frequency", durationMs: 205000 },
    { name: "Hollow Sun", durationMs: 174000 },
    { name: "Southbound Lights", durationMs: 212000 },
    { name: "Riverline", durationMs: 186000 },
    { name: "City in Stereo", durationMs: 217000 },
  ];

  const playlistsToCreate = [
    {
      name: "Morning Focus",
      description: "Steady tracks for getting work started.",
    },
    {
      name: "Late Night Drive",
      description: "Synth-heavy songs for roads after midnight.",
    },
    {
      name: "Gym Push",
      description: "High-energy tracks for hard training blocks.",
    },
    {
      name: "Coffee Shop Calm",
      description: "Warm background tracks for conversation and study.",
    },
    {
      name: "Rainy Day Mix",
      description: "Moody tracks for cloudy afternoons.",
    },
    {
      name: "Summer Windows Down",
      description: "Upbeat songs for bright weather and traffic.",
    },
    {
      name: "Deep Work Loop",
      description: "Minimal-vocal tracks to stay in flow.",
    },
    {
      name: "Weekend Reset",
      description: "Easy listening tracks to unwind and reset.",
    },
    {
      name: "Party Warmup",
      description: "Gradual build from chill to energetic.",
    },
    {
      name: "Sunset Walk",
      description: "Light groove tracks for evening walks.",
    },
  ];

  const tracks = [];
  for (const track of tracksToCreate) {
    tracks.push(await createTrack(track));
  }

  const playlists = [];
  for (const playlist of playlistsToCreate) {
    playlists.push(await createPlaylist(playlist));
  }

  const playlistTrackPairs = [
    [0, 0],
    [0, 6],
    [1, 1],
    [1, 9],
    [2, 3],
    [2, 10],
    [3, 2],
    [3, 8],
    [4, 4],
    [4, 16],
    [5, 5],
    [5, 19],
    [6, 11],
    [6, 13],
    [7, 7],
    [7, 12],
    [8, 14],
    [8, 15],
    [9, 17],
    [9, 18],
  ];

  for (const [playlistIndex, trackIndex] of playlistTrackPairs) {
    await createPlaylistTrack({
      playlistId: playlists[playlistIndex].id,
      trackId: tracks[trackIndex].id,
    });
  }
}
