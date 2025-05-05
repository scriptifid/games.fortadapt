import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Game() {
  const router = useRouter()
  const { code, name } = router.query
  const [players, setPlayers] = useState([])
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/status?code=${code}`)
      const data = await res.json()
      setPlayers(data.players)
      setStarted(data.started)
    }, 1000)
    return () => clearInterval(interval)
  }, [code])

  const startGame = async () => {
    await fetch('/api/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
  }

  if (!code || !name) return <p className="text-white">Invalid game link</p>

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Lobby: {code}</h1>
      <p className="mb-2">Players:</p>
      <ul className="mb-4">
        {players.map((p, i) => <li key={i} className="text-sm">- {p}</li>)}
      </ul>
      {!started ? (
        <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700" onClick={startGame}>Start Game</button>
      ) : (
        <p className="text-yellow-400">Game started!</p>
      )}
    </div>
  )
}
