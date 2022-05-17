import { useState } from "react";
import { useRef } from "react";

export default function RecipeTitle() {
  const [title, setTitle] = useState("Título da Receita");

  const form = useRef(null);

  const handleSubmit = async (event) => {
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
    form.current.remove();
  };

  return (
    <div>
      <div>{title}</div>
      <div>
        <form ref={form} onSubmit={handleSubmit}>
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
  );
}
