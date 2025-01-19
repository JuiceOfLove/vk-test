import { AxiosResponse } from "axios";
import $api from "../http";
import { IGitHubSearchResponse } from "@/types/github";

export default class RepoService {
    static getRepos(page: number, perPage: number, sort: string, order: string): Promise<AxiosResponse<IGitHubSearchResponse>> {
        return $api.get('/search/repositories', {
            params: {
                q: "react",
                sort: sort,
                order,
                page,
                per_page: perPage,
            },
        })
    }
}