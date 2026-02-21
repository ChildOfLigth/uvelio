import { useParams } from "react-router-dom";

export function ProductsCatalog() {
  const { filter } = useParams();

  return <h1>Catalog filter: {filter}</h1>;
}
