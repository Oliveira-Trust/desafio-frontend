import React, { useEffect, useState } from 'react';
import { list } from './apis/user'

export default function App() {
  const [teste, setTeste] = useState()

  useEffect(() => {
    ;(async () => {
      await list({ page: 1, limit: 12, search: { nome: "dor", sobrenome: 'po', email: 'adsasda' } })
    })()
  }, [])

  return (
    <h1 className="text-3xl font-bold  text-pink-500">
      Hello world!
    </h1>
  )
}