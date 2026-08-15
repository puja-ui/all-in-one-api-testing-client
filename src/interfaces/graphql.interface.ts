export interface Country {
  name: string;
  capital: string;
  emoji: string;
}

export interface GraphQLerror {
  message: string;
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: GraphQLerror[];
}

export interface GithubRepo {
  name: string;
  description: string | null;
}

export interface GithubViewer {
  login: string;
  bio: string | null;
  repositories: {
    nodes: GithubRepo[];
  };
}

export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface CreatePostInput {
  title: string;
  body: string;
}
