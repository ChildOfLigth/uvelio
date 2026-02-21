import { Link } from "react-router-dom";

export default function NavToCatalog({ children, filter, styles }) {
  return <Link to={`/uvelio/catalog/:${filter}`} className={`wrap-break-word hyphens-none ${styles}`}>{children}</Link>;
}
