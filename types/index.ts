export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    topics?: string[];
    stargazers_count: number;
    forks_count: number;
  }
