// Declaramos una URL base que es la de la API
const baseURL = 'https://platzi-avo.vercel.app/api/avo';
const appURL = 'https://platzi-avo.vercel.app';

// Creamos la función asíncrona para ir a buscar una única palta
const getAvocado = async (id) => {
    console.log(`${baseURL}/${id}`)
    const res = await fetch(`${baseURL}/${id}`);
    const data = await res.json(); // sacamos el body de la respuesta
    return data;
}

// Creamos la función asíncrona para ir a buscar todas las paltas
const getAvocados = async () => {
    const res = await fetch(`${baseURL}`);
    const data = await res.json(); // sacamos el body de la respuesta
    return data;
}

export { getAvocado, getAvocados, appURL };
