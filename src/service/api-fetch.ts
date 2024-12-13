export async function apiFetch(endPoint:string) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api${endPoint}`, {
            method: "GET"
        });

        const result = await response.json();

        if (!result) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return result
    } catch (error) {
        console.error("Error fetching data:", error);
        return error
    }
}