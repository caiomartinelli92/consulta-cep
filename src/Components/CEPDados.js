export default function CEPDADOS(props) {
  const cepDados = props.cepDados
  const keys = Object.keys(cepDados)
  return (
    <>
      {keys.map(key => (
        <span key={key}>
          <b>{key}: </b>
          {cepDados[key]}
        </span>
      ))}
    </>
  )
}
