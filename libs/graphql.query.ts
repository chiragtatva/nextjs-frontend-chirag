import { gql } from '@apollo/client';

export const GET_APPLICATIONS = gql`
  query SmeApplications {
    smeApplications {
      id
      companyUEN
      companyName
      fullName
      position
      email
    }
  }
`;
