export const setLocalStorage = (key, value) => {
    const stringVal = JSON.stringify(value)
    return localStorage.setItem(key, stringVal);
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}