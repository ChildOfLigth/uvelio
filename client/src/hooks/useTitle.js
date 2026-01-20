import { useEffect } from "react";

export default function useTitle(customTitle) {
    useEffect(() => {
        document.title = customTitle;
    }, []);
}