let lobbies = global.lobbies || (global.lobbies = {})

export default function handler(req, res) {
  const { code } = req.query
  const lobby = lobbies[code]
  if (!lobby) return res.status(404).json({ success: false })
  res.json({ players: lobby.players, started: lobby.started })
}
