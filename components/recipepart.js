import { useState } from "react";
import { useRef } from "react";
export default function RecipePart({ part }) {
  const [count, setCount] = useState(0);
  const [listaDeIngrediente, setListaDeIngrediente] = useState([]);
  const form = useRef(null);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      ing: event.target.ing.value,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/partform";

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
    setListaDeIngrediente([...listaDeIngrediente, result.data]);
    console.log(listaDeIngrediente);
    form.current.reset();
  };

  return (
    <div>
      <h2>{part}</h2>

      <button onClick={handleClick}>Adicionar ingrediente</button>
      <div>
        <ul>
          {listaDeIngrediente.map((a, index) => {
            return <li>{a}</li>;
          })}
        </ul>
      </div>
      <div>
        {Array.from(Array(count)).map((c, index) => {
          return (
            <form key={c} ref={form} onSubmit={handleSubmit}>
              <label htmlFor="ing"></label>
              <input id="ing" name="ing" type="text"></input>;
              <button type="submit">Adicionar</button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
