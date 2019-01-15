import React from 'react';
import ReactDOM from 'react-dom';

import gql from 'graphql-tag';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const MEMBER_DUMMY_QUERY = gql`
    {
      me {
        id
      }
    }
  `;

  const mocks = [
    {
      request: {
        query: MEMBER_DUMMY_QUERY,
      },
      result: {
        data: {
          me: { id: '1234' },
        },
      },
    },
  ];

  // Wraps Header with BrowserRouter as it uses react-router-dom
  ReactDOM.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </MockedProvider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
