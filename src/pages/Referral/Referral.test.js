import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Referral from './Referral';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Referral />);
});
