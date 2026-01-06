import { Link } from "react-router-dom";

export default function NavLink({ children }) {
  return <Link part="/uvelio/catalog:category">{children}</Link>;
}
