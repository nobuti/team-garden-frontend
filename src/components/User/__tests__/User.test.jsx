import React from 'react';
import * as Auth0 from '@auth0/auth0-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import User from '~/components/User';

let mock;
const context = {
  isAuthenticated: false,
  loginWithRedirect: jest.fn(),
  user: null,
};

describe('User', () => {
  beforeEach(() => {
    mock = jest.spyOn(Auth0, 'useAuth0').mockReturnValue(context);
  });

  test('it should render login button if not authenticated', () => {
    render(<User />);

    expect(screen.getByText('Login with GitHub')).toBeInTheDocument();

    userEvent.click(screen.getByText('Login with GitHub'));
    expect(context.loginWithRedirect).toHaveBeenCalled();
  });

  test('it should render user details if authenticated', () => {
    const user = {
      name: 'Buti',
      picture: 'https://avatars.githubusercontent.com/u/1366843?v=4',
    };
    const logout = jest.fn();

    mock.mockReturnValue({
      ...context,
      isAuthenticated: true,
      user,
      logout,
    });

    render(<User />);

    expect(screen.queryByText('Login with GitHub')).not.toBeInTheDocument();
    expect(screen.queryByText('Log out')).toBeInTheDocument();
    expect(screen.getByAltText(user.name)).toBeInTheDocument();

    userEvent.click(screen.getByText('Log out'));
    expect(logout).toHaveBeenCalled();
  });
});
