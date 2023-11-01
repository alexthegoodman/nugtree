export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
      description
      updatedAt
      createdAt
    }
  }
`;
