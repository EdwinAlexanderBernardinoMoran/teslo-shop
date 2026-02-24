import { tesloApi } from "@/api/teslo.api"
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', { fullName, email, password });
        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}