import { useState } from "react";
import { useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Tentativa() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

    router.push("/");
  };
  //Ate aqui
  if (session) {
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
                pattern="[a-z]"
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
                  <input
                    id="ing"
                    name="ing"
                    type="text"
                    pattern="[a-z]"
                  ></input>
                  ;
                  <input id="qtd" type="number" pattern="[0-9]" min="0"></input>
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
                  <input
                    id="modos"
                    name="modos"
                    type="text"
                    pattern="[a-z0-9]"
                  ></input>
                  ;<button type="submit">Adicionar</button>
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
  {
    return (
      <>
        <main>
          <h1 className="title">iCook</h1>
          <div className="card">
            Seja um Chef
            <br />
            <button onClick={() => signIn()}>Sign in</button>
          </div>
          <style jsx>{`
            .container {
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer img {
              margin-left: 0.5rem;
            }

            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            .title a {
              color: #0070f3;
              text-decoration: none;
            }

            .title a:hover,
            .title a:focus,
            .title a:active {
              text-decoration: underline;
            }

            .title {
              margin: 0;
              line-height: 1.15;
              font-size: 4rem;
            }

            .title,
            .description {
              text-align: center;
            }

            .subtitle {
              font-size: 2rem;
            }

            .description {
              line-height: 1.5;
              font-size: 1.5rem;
            }

            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            }

            .grid {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              max-width: 800px;
              margin-top: 3rem;
            }

            .card {
              margin: 1rem;
              flex-basis: 45%;
              padding: 1.5rem;
              text-align: left;
              color: inherit;
              text-decoration: none;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              transition: color 0.15s ease, border-color 0.15s ease;
            }

            .card:hover,
            .card:focus,
            .card:active {
              color: #0070f3;
              border-color: #0070f3;
            }

            .card h3 {
              margin: 0 0 1rem 0;
              font-size: 1.5rem;
            }

            .card p {
              margin: 0;
              font-size: 1.25rem;
              line-height: 1.5;
            }

            .logo {
              height: 1em;
            }

            @media (max-width: 600px) {
              .grid {
                width: 100%;
                flex-direction: column;
              }
            }
          `}</style>
          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>
        </main>
      </>
    );
  }
}
