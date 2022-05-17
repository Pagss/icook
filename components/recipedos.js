import { useState } from "react";
import { useRef } from "react";

export default function RecipeDos() {
  const [count, setCount] = useState(0);
  const [listaDeDirecoes, setListaDeDirecoes] = useState([]);
  const form = useRef(null);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      modos: event.target.modos.value,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/modosform";

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    console.log(result.data);

    if (result.data != null)
      setListaDeDirecoes([...listaDeDirecoes, result.data]);
    console.log(listaDeDirecoes);
    form.current.remove();
  };

  return (
    <div>
      <h2>Modo de Fazer</h2>

      <div>
        <ol>
          {listaDeDirecoes.map((a, index) => {
            return <li key={a}>{a}</li>;
          })}
        </ol>
      </div>
      <button onClick={handleClick}>Adicionar Instruções</button>
      <div>
        {Array.from(Array(count)).map((c, index) => {
          return (
            <form key={c} ref={form} onSubmit={handleSubmit}>
              <label htmlFor="modos"></label>
              <input id="modos" name="modos" type="text"></input>;
              <button type="submit">Adicionar</button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
