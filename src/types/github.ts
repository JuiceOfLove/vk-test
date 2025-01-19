export interface IGitHubRepo {
    id: number
    description: string
    name: string
    favorite?: boolean
  }

  export interface IGitHubSearchResponse {
    items: IGitHubRepo[]
  }