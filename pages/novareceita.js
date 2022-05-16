import RecipePart from "../components/recipepart";

export default function NovaReceita() {
  return (
    <div>
      <h1>Clique para Criar</h1>
      <h3>
        <RecipePart part="Ingredientes" />
      </h3>
    </div>
  );
}
