import { useState } from "react";
import { useRef } from "react";
import { useSession } from "next-auth/react";

export default function Tentativa() {
  const { data: session, status } = useSession();

  const formTit = useRef(null);
  const formIng = useRef(null);
  const formMod = useRef(null);

  const [title, setTitle] = useState("Título da Receita");

  const handleTitleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      titulo: event.target.titulo.value,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/tituloform";

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

    if (result.data != null) setTitle(result.data);
    console.log(title);

    formTit.current.remove();
  };

  const [countIng, setCountIng] = useState(0);
  const [listaDeIngrediente, setListaDeIngrediente] = useState([]);

  function handleIngClick() {
    setCountIng(countIng + 1);
    console.log(countIng);
  }

  const handleIngSubmit = async (event) => {
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
    console.log(result.data);

    if (result.data != null)
      setListaDeIngrediente([...listaDeIngrediente, result.data]);
    console.log(listaDeIngrediente);
    const ingData = { ...listaDeIngrediente };
    formIng.current.remove();
  };
  const [countMod, setCountMod] = useState(0);
  const [listaDeDirecoes, setListaDeDirecoes] = useState([]);

  function handleModClick() {
    setCountMod(countMod + 1);
    console.log(countMod);
  }

  const handleModSubmit = async (event) => {
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
    const modData = { ...listaDeDirecoes };
    formMod.current.remove();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const chef = session.user.email;

    const newRecipe = {
      title: title,
      ingredientes: listaDeIngrediente,
      modo: listaDeDirecoes,
    };

    const data = { chef: chef, recipe: newRecipe };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/newrecipe";

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

    console.log(chef);
    console.log(newRecipe);
  };
  //Ate aqui

  return (
    <div>
      <h1>Criar Receita</h1>
      <div>
        <div>{title}</div>
        <div>
          <form ref={formTit} onSubmit={handleTitleSubmit}>
            <label htmlFor="titulo"></label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              placeholder="Título da Receita"
            />
            ;<button type="submit">Adicionar Título</button>
          </form>
        </div>
      </div>
      <div>
        <h2>Ingredientes</h2>

        <div>
          <ul>
            {listaDeIngrediente.map((a, index) => {
              return <li key={a}>{a}</li>;
            })}
          </ul>
        </div>
        <button onClick={handleIngClick}>Adicionar ingrediente</button>
        <div id="listinha">
          {Array.from(Array(countIng)).map((c, index) => {
            return (
              <form key={c} ref={formIng} onSubmit={handleIngSubmit}>
                <label htmlFor="ing"></label>
                <input id="ing" name="ing" type="text"></input>;
                <input id="qtd" type="number" min="0"></input>
                <select id="metrica">
                  <option value="unidades">unidades</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="xícaras">xícaras</option>
                  <option value="colheres">colheres</option>
                </select>
                <button type="submit">Adicionar</button>
              </form>
            );
          })}
        </div>
      </div>
      <div>
        <h2>Modo de Fazer</h2>

        <div>
          <ol>
            {listaDeDirecoes.map((a, index) => {
              return <li key={a}>{a}</li>;
            })}
          </ol>
        </div>
        <button onClick={handleModClick}>Adicionar Instruções</button>
        <div>
          {Array.from(Array(countMod)).map((c, index) => {
            return (
              <form key={c} ref={formMod} onSubmit={handleModSubmit}>
                <label htmlFor="modos"></label>
                <input id="modos" name="modos" type="text"></input>;
                <button type="submit">Adicionar</button>
              </form>
            );
          })}
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Anotar Receita</button>
        </form>
      </div>
    </div>
  );
}
