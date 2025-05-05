let lobbies = global.lobbies || (global.lobbies = {})

export default function handler(req, res) {
  const { code } = req.body
  if (lobbies[code]) lobbies[code].started = true
  res.json({ success: true })
}
