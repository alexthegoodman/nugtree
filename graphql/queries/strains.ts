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

export const CREATE_STRAIN = gql`
  mutation createStrain(
    $name: String!
    $categoryId: String
    $femaleParentId: String
    $maleParentId: String
    $notes: String
  ) {
    createStrain(
      name: $name
      categoryId: $categoryId
      femaleParentId: $femaleParentId
      maleParentId: $maleParentId
      notes: $notes
    ) {
      id
    }
  }
`;
