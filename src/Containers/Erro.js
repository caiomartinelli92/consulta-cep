function Erro(props) {
  const goTo = props.goTo
  return (
    <>
      <p>Erro na consulta</p>
      <p>{props.errorMessage}</p>
      <button onClick={() => goTo('PESQUISA')}>VOLTAR</button>
    </>
  )
}

export default Erro
