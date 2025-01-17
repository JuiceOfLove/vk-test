import $api from "../http";

export default class RepoService {
    static getRepos(page: number, perPage: number, sort: string, order: string) {
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