import { createContext, useContext } from "react";
import { character } from "../entities/charecter";
import { apiFetch } from "./api-fetch";

export interface ApiServices {
    getCharacterList: () => Promise<character[]>;
    getCharacter: (id: string) => Promise<character>;
}

class ApiServiceImplementation implements ApiServices {
    async getCharacterList() {
        const data = await apiFetch("/character")
        if(!data) throw new Error("Not Found Error")
        return data.results;
    };
    async getCharacter(id: string) {
        const data = await apiFetch(`/character/${id}`)
        if(!data) throw new Error("Not Found Error")

        return data;
    };
}

const APIServicesContext = createContext<ApiServices>(
    new ApiServiceImplementation(),
);

export function useAPIService() {
    return useContext(APIServicesContext);
}
