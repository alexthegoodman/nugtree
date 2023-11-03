const STRAIN_FRAGMENT = gql`
  fragment StrainFragment on Strain {
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
`;

export const GET_STRAINS = gql`
  query getStrains($query: String, $page: Int, $limit: Int) {
    getStrains(query: $query, page: $page, limit: $limit) {
      ...StrainFragment
    }
  }
  ${STRAIN_FRAGMENT}
`;

export const GET_STRAIN_BY_ID = gql`
  query getStrainById($id: String!) {
    getStrainById(id: $id) {
      ...StrainFragment
    }
  }
  ${STRAIN_FRAGMENT}
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

export const UPDATE_STRAIN_BY_ID = gql`
  mutation updateStrainById(
    $id: String!
    $name: String
    $categoryId: String
    $femaleParentId: String
    $maleParentId: String
    $notes: String
  ) {
    updateStrainById(
      id: $id
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
