import renderer from "react-test-renderer";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Login from "../components/Login";

jest.mock("react-router-dom", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,

  useNavigate: () => jest.fn(),

  useLocation: () => ({
    state: {},
  }),
}));

const mockStore = configureStore([]);

const store = mockStore({
  users: {
    user: null,
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
});

const renderWithProviders = () =>
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

test("Login component matches snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Login />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});


test("Login shows validation errors when form is submitted empty", () => {
  renderWithProviders();

  const button = screen.getByRole("button", { name: /sign in/i });
  fireEvent.click(button);

  expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
});
