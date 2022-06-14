import { useState } from "react";
import { useRef } from "react";

export default function RecipePart() {
  const [count, setCount] = useState(0);
  const [listaDeIngrediente, setListaDeIngrediente] = useState([]);
  const form = useRef(null);

  function handleClick() {
    setCount(count + 1);
    //console.log(count);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      ing: event.target.ing.value,
      qtd: event.target.qtd.value,
      metrica: event.target.metrica.value,
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
    //console.log(result.data);

    if (result.data != null)
      setListaDeIngrediente([...listaDeIngrediente, result.data]);
    //console.log(listaDeIngrediente);
    form.current.remove();
  };

  return (
    <div>
      <h2>Ingredientes</h2>

      <div>
        <ul>
          {listaDeIngrediente.map((a, index) => {
            return <li key={a}>{a}</li>;
          })}
        </ul>
      </div>
      <button onClick={handleClick}>Adicionar ingrediente</button>
      <div id="listinha">
        {Array.from(Array(count)).map((c, index) => {
          return (
            <form key={c} ref={form} onSubmit={handleSubmit}>
              <label htmlFor="ing"></label>
              <input id="ing" name="ing" type="text"></input>;
              <input id="qtd" type="number" min="0"></input>
              <select id="metrica">
                <option value="unidades">unidades</option>
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="xícaras">xícaras</option>
              </select>
              <button type="submit">Adicionar</button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
