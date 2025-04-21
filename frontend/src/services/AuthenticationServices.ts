import axios from "axios";

import { BACKEND_BASE_URL } from "../utils/constants";
import { LoginData } from "../types/LoginData";

const LOCAL_BASE_URL = 'useraccount';

export const login = async (credentials: LoginData) => {
    return await axios.post(`${BACKEND_BASE_URL}/${LOCAL_BASE_URL}/login`, credentials);
}