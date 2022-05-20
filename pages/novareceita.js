import RecipeDos from "../components/recipedos";
import RecipePart from "../components/recipepart";
import RecipeTitle from "../components/recipetitle";

export default function NovaReceita(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataTit = {
      titulo: event.target.titulo.value,
    };

    const dataIng = {
      ing: event.target.ing.value,
      qtd: event.target.qtd.value,
      metrica: event.target.metrica.value,
    };

    const dataMod = {
      modos: event.target.modos.value,
    };

    const JSONdataTit = JSON.stringify(dataTit);
    const JSONdataIng = JSON.stringify(dataIng);
    const JSONdataMod = JSON.stringify(dataMod);
    const endpoint = "/api/recipebook";

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: { JSONdataTit, JSONdataIng, JSONdataMod },
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();

    console.log(response.json);
  };

  return (
    <div>
      <h1>Criar Receita</h1>
      <h3>
        <RecipeTitle />
      </h3>
      <h4>
        <RecipePart />
      </h4>
      <h4>
        <RecipeDos />
      </h4>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Anotar Receita</button>
        </form>
      </div>
      <div></div>
    </div>
  );
}
