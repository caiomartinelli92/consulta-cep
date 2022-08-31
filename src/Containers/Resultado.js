import CEPDADOS from '../Components/CEPDados'

function Resultado(props) {
  const goTo = props.goTo
  const result = props.result

  return (
    <>
      <p>Resultados para o CEP {Resultado.cep}</p>
      <CEPDADOS cepDados={result} />
      <button onClick={() => goTo('PESQUISA')}>NOVA CONSULTA</button>
    </>
  )
}

export default Resultado
