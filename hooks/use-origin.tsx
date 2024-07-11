import { useState, useEffect } from "react"

// safely access the window object in next14.
// next14 is serverside and most of the things are not available on the browser

export const useOrigin = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    const origin = typeof window !== "undefined" && window.location.origin
        ? window.location.origin : "";

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return "";
    }

    return origin;
}

