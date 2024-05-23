import { gql } from '@apollo/client';

export const MUTATION = gql`
  mutation ($files: [Upload!]!, $smeHealthInput: CreateSmeHealthDto1!) {
    uploadFile(files: $files, smeHealthInput: $smeHealthInput) {
      id
      companyUEN
      companyName
      fullName
      position
      email
      reEmail
      contact
      documents
      isConditionsAccepted
    }
  }
`;

