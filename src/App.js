import logo from './logo.svg'

import { useState, useRef } from 'react'
import './App.css'
import React, { createRef, Fragment } from 'react'
import Carregando from './Containers/Carregando'
import Erro from './Containers/Erro'
import Pesquisar from './Containers/Pesquisar'
import Resultado from './Containers/Resultado'

function App() {
  const [nomeTela, setNomeTela] = useState('PESQUISA')
  const [resultado, setResultado] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const ticket = useRef(1)

  function goTo(nomeTela) {
    setNomeTela(nomeTela)
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          {nomeTela == 'PESQUISA' ? (
            <Pesquisar
              goTo={goTo}
              setResultado={setResultado}
              setErrorMessage={setErrorMessage}
              ticket={ticket}
            />
          ) : null}
          {nomeTela == 'CARREGANDO' ? (
            <Carregando goTo={goTo} ticket={ticket} />
          ) : null}
          {nomeTela == 'ERRO' ? (
            <Erro goTo={goTo} errorMessage={errorMessage} />
          ) : null}
          {nomeTela == 'RESULTADO' ? (
            <Resultado goTo={goTo} result={resultado} />
          ) : null}
        </header>
      </div>
    </div>
  )
}

export default App
