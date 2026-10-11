import { Link } from "react-router-dom";

export default function NavToCatalog({ children, filter, styles }) {

  return (
    <Link
      to={`/catalog/${filter}`}
      className={`wrap-anywhere ${styles}`}
    >
      {children}
    </Link>
  );
}
