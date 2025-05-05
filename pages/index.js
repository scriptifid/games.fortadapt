import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Lobby() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const router = useRouter()

  const joinGame = async () => {
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, code })
    })
    const data = await res.json()
    if (data.success) router.push(`/game?code=${code}&name=${name}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-center">Join Lobby</h1>
        <input className="w-full p-2 rounded bg-gray-700" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full p-2 rounded bg-gray-700" placeholder="Lobby Code" value={code} onChange={e => setCode(e.target.value)} />
        <button className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700" onClick={joinGame}>Join</button>
      </div>
    </div>
  )
}
