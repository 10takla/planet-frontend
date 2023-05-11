export function getCookie(names?: string | string[]): any {
    const cookie = document.cookie.split('; ');

    if (!names) {
        return cookie
    }

    if (typeof names === "string") {
        for (let current of cookie) {
            const [key, value] = current.split('=')
            if (key === names) {
                return value as string
            }
        }
        return null
    }

    if (typeof names === "object") {
        return cookie.reduce((prev, current) => {
            const [key, value] = current.split('=')
            return names.includes(key) ? {...prev, [key]: value} : prev
        }, {})
    }
}