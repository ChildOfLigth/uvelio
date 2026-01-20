import { Link } from "react-router-dom";

export default function NavToCatalog({ children, filter }) {
  return <Link to={`/uvelio/catalog:${filter}`}>{children}</Link>;
}
