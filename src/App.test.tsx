import * as React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('should render the App', () => {
    const { getByText } = render(<App />);

    expect(getByText('Twitter')).toBeInTheDocument();
  });
});
