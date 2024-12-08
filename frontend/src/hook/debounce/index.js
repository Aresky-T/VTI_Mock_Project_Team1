import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay)

        return () => clearTimeout(handler);
    }, [value, delay])

    return debounceValue;
}