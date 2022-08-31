import { useState, useEffect } from 'react'
import consultarCep from 'cep-promise'
import CEPDADOS from '../Components/CEPDados'

function mascaraCep(str) {
  let numeroFormatado = str.replace(/[^\d]/g, '')
  numeroFormatado = numeroFormatado.replace(/^(\d{5})(\d{3})/, '$1-$2')
  return numeroFormatado
}

function translate(cepDados) {
  return {
    ESTADO: cepDados.state,
    CIDADE: cepDados.city,
    BAIRRO: cepDados.neighborhood,
    LOGRADOURO: cepDados.street
  }
}

function Pesquisar(props) {
  const goTo = props.goTo
  const ticket = props.ticket
  const setResultado = props.setResultado
  const [cepNumber, setCepNumber] = useState('')
  const [cepFavorito, setCepFavorito] = useState('')
  const [cepDados, setCepDados] = useState('')

  useEffect(() => {
    const storedCep = localStorage.getItem('cepFavorito') || ''
    setCepFavorito(storedCep)
  }, [])

  useEffect(() => {
    if (!cepFavorito) {
      return
    }
    localStorage.setItem('cepFavorito', cepFavorito)
    consultarCep(cepFavorito)
      .then(resultado => setCepDados(resultado))
      .catch(err => setCepDados({ ERRO: err.message }))
  }, [cepFavorito])

  function handleChange(evt) {
    const value = evt.target.value
    setCepNumber(mascaraCep(value))
  }
  function clear() {
    setCepNumber('')
  }
  function handleSucess(cepDados) {
    const resultado = translate(cepDados)
    setResultado(resultado)
    goTo('RESULTADO')
  }
  function handleError(err) {
    const errorMessage = err.message
    props.setErrorMessage(errorMessage)
    goTo('ERRO')
  }
  function handleSearch() {
    ticket.current++
    const currentTicket = ticket.current
    goTo('CARREGANDO')
    consultarCep(cepNumber.replace(/[^\d]/g, ''))
      .then(result => currentTicket == ticket.current && handleSucess(result))
      .catch(err => currentTicket == ticket.current && handleError(err))
  }
  function handleAdicionarFavorito() {
    setCepFavorito(cepNumber)
  }
  return (
    <>
      <p>Qual o CEP deseja pesquisar?</p>
      <input
        value={mascaraCep(cepNumber)}
        onChange={handleChange}
        maxLength={9}
      ></input>
      <button onClick={handleSearch}>CONSULTAR</button>
      <button onClick={handleAdicionarFavorito}>SALVAR FAVORITO</button>
      <br />
      <p>Favorito: {cepFavorito}</p>
      <CEPDADOS cepDados={translate(cepDados)} />
    </>
  )
}
export default Pesquisar
