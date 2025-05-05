let lobbies = {}

export default function handler(req, res) {
  const { name, code } = req.body
  if (!code || !name) return res.status(400).json({ success: false })
  if (!lobbies[code]) lobbies[code] = { players: [], started: false }
  if (!lobbies[code].players.includes(name)) lobbies[code].players.push(name)
  res.json({ success: true })
}