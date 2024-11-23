import { IMatch } from "../../backend/src/types"
const backendUrl = "http://localhost:3000"

async function fetchData(input: RequestInfo, init?:RequestInit) {
    const response = await fetch(input, init);
    if(response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw new Error(`Request failed: ${response.status} message ${errorMessage}`)
    }
}

export const login = async (credentials: IMatch): Promise<IMatch> => {
    const response = await fetchData(`${backendUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json();
}