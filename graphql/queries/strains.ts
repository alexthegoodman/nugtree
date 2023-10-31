export const GET_STRAINS = gql`
  query getStrains {
    getStrains {
      id
      name
      notes
      links
      category {
        id
        name
      }
      femaleParent {
        id
        name
      }
      maleParent {
        id
        name
      }
      updatedAt
      createdAt
    }
  }
`;
