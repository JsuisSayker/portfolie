export const GetPinnedRepositories = `
    query {
        viewer {
            pinnedItems(first: 10, types: REPOSITORY) {
                nodes {
                    ... on Repository {
                        name
                        description
                        url
                        stargazerCount
                        forkCount
                        primaryLanguage {
                            name
                            color
                        }
                        repositoryTopics(first: 10) {
                            edges {
                                node {
                                    topic {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export interface PinnedRepositoryData {
  id: number
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
      name: string;
      color: string;
  };
  repositoryTopics: {
      edges: {
          node: {
              topic: {
                  name: string;
              };
          };
      }[];
  };
}