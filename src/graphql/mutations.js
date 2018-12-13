import gql from 'graphql-tag';

const SIGN_UP = gql`
  mutation SignUpMutation($input: MemberMutationInput!) {
    signUp(input: $input) {
      id
      firstName
      clientMutationId
      errors {
        messages
        field
      }
    }
  }
`;

const UPDATE_MEMBER_SHIPPING_ADDRESS = gql`
  mutation UpdateMemberShippingAddress($input: ShippingAddressInput!) {
    updateMemberShippingAddress(input: $input) {
      shippingAddress {
        id
        firstName
        lastName
        company
        line1
        line2
        postcode
        contactNumber
        city
        state
        country {
          id
        }
        addressUnavailableInstruction {
          id
        }
      }
      errors {
        messages
        field
      }
    }
  }
`;

const UPDATE_MEMBER_ACCOUNT_DETAILS = gql`
  mutation UpdateMemberAccountDetails($input: MemberMutationInput!) {
    updateMember(input: $input) {
       id
      email
      birthDate
      mobileNumber
      gender
      firstName
      lastName
      errors {
        messages
        field
      }
    }
  }
`;

export {
  SIGN_UP,
  UPDATE_MEMBER_SHIPPING_ADDRESS,
  UPDATE_MEMBER_ACCOUNT_DETAILS,
};
