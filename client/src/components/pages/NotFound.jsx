import useTitle from "../../hooks/useTitle"

export function NotFound() {
    useTitle("Page Not Found :(");
    return (
        <h1>404</h1>
    )
}