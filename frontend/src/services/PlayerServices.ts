import axios, { AxiosRequestConfig } from "axios";

import { BACKEND_BASE_URL } from "../utils/constants";
import { PlayerData } from "../types/PlayerData";
import { generateHTTPHeaderWithToken } from "../utils/authenticationUtils";

const authenticationHeader: AxiosRequestConfig = generateHTTPHeaderWithToken();

export const getPlayersForClub = async (clubId: number): Promise<PlayerData[]> => {
    const response = await axios.get(`${BACKEND_BASE_URL}/club/${clubId}/players`, authenticationHeader);
    return response.data;
}