import { IMatch } from "../../types"
import { GameStats } from "../../types";
import dotenv from "dotenv"
dotenv.config()

const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:3000"

async function fetchData(input: RequestInfo, init?: RequestInit) {
    let response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else if (response.status === 401) {
        const refreshResponse = await refreshAccessToken();
        if (refreshResponse.ok) {
            response = await fetch(input, init)
            if (response.ok) {
                return response;
            }
        }
    }
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw new Error(`Request failed: ${response.status} message ${errorMessage}`)
}

export const signup = async (credentials: IMatch) => {
    const response = await fetchData(`${backendUrl}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials),
        credentials: "include"
    })
    return response.json()
}

export const login = async (credentials: IMatch) => {
    const response = await fetchData(`${backendUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials),
        credentials: "include"
    })
    return response.json();
}

export const updateGameStats = async (matchId: string, gameStats: GameStats): Promise<GameStats> => {
    const response = await fetchData(`${backendUrl}/api/gameStats/${matchId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameStats),
        credentials: "include"
    });
    return response.json()
}

export const getPairMatches = async (matchId: string): Promise<GameStats> => {
    const response = await fetchData(`${backendUrl}/api/pairMatches/${matchId}`, {
        method: "GET",
        credentials: "include"
    })
    return response.json();
}

const refreshAccessToken = async () => {
    const response = await fetchData(`${backendUrl}/api/refresh`, {
        method: "GET",
        credentials: "include"
    })
    return response;
}