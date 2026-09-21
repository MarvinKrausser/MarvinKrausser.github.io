export function setCookie(name, value, maxAge) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}

export function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (let c of cookies) {
        const [key, value] = c.split("=");
        if (key === name) return value;
    }

    return null;
}
