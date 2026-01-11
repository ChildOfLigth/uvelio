import { Link } from "react-router-dom";

export default function NavToCatalog({ children, href }) {
  return <Link to={href}>{children}</Link>;
}
