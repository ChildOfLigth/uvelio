import { useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

export function ProductsCatalog() {
  useTitle("Jewelry Catalog");
  const { filter } = useParams();

  return <h1>Catalog filter: {filter}</h1>;
}
