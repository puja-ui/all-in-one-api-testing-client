export const GRAPHQL_QUERIES = {
  getCountries: `
query getCountries($codes: [String!]) {
    countries(filter: { code: { in: $codes } }) {
        name
        capital
        emoji
    }
}
`,
  getMyProfile: `
query {
    viewer {
        login
        bio
        repositories(first: 28) {
            nodes {
                name
                description
            }
        }
    }
}
`,
  createPost: `
mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
        id
        title
        body
    }
}
`,
};
