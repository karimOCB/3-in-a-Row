import { IMatch } from "../../types"
import { GameStats } from "../../types";
const backendUrl = "http://localhost:3000"

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw new Error(`Request failed: ${response.status} message ${errorMessage}`)
    }
}

export const signup = async (credentials: IMatch): Promise<IMatch> => {
    const response = await fetchData(`${backendUrl}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
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

export const updateGameStats = async (matchId: string, gameStats: GameStats): Promise<GameStats> => {
    const response = await fetchData(`${backendUrl}/api/gameStats/${matchId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameStats)
    });
    return response.json()
}

export const getPairMatches = async (matchId: string): Promise<GameStats> => {
    const response = await fetchData(`${backendUrl}/api/pairMatches/${matchId}`, {
        method: "GET"
    })
    return response.json();
}