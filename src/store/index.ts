import RepoService from "@/services/api.service";
import { action, makeAutoObservable, configure } from "mobx";

// Фикс (Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed)
configure({
    enforceActions: "never",
})
export default class Store {
    repositories: any[] = [];
    isLoading = false;
    page = 1;
    perPage = 8;
    sort: string = "stars";
    order: string = "desc";

    constructor() {
        makeAutoObservable(this, {
            repos: action,
        });
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    resetData() {
        this.page = 1;
        this.repositories = [];
    }

    setSort(field: string, order = "desc" ) {
        this.sort = field;
        this.order = order;
        this.resetData();
        this.repos();
    }

    async repos() {
        this.setLoading(true);

        try {
            const response = await RepoService.getRepos(this.page, this.perPage, this.sort, this.order);

            if (response.data?.items) {
                const newReps = response.data.items.filter(
                    (newRep: any) => !this.repositories.some(oldRep => oldRep.id === newRep.id)
                );
                this.repositories = [...this.repositories, ...newReps];
                this.page += 1;
            }
        }catch(e: any) {
            console.log(e.response?.data?.message);
        }finally {
            this.setLoading(false);
        }
    }

    deleteRepoById(id: number) {
        this.repositories = this.repositories.filter(rep => rep.id !==id);
    }

    addFavouriteById(id: number) {
        this.repositories = this.repositories.map(rep => {
            if (rep.id == id) {
                return {...rep, favorite: !rep.favorite}
            }
            return rep;
        })
    }
}