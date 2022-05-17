import RecipeDos from "../components/recipedos";
import RecipePart from "../components/recipepart";
import RecipeTitle from "../components/recipetitle";

export default function NovaReceita(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      listinha: event.target.listinha.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/recipebook";

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
        <form>
          <button type="submit">Anotar Receita</button>
        </form>
      </div>
      <div></div>
    </div>
  );
}
