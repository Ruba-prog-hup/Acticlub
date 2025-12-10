
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Home from "../components/Home";


jest.mock("react-router-dom", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
}));

const mockStore = configureStore([]);

const store = mockStore({
  activities: {
    list: [
      {
        _id: "1",
        title: "Cooking Course",
        category: "Cooking",
        eventDate: "2026-04-20",
      },
      {
        _id: "2",
        title: "Photography",
        category: "Photography",
        eventDate: "2025-01-01",
      },
    ],
    isLoading: false,
  },
});

const renderHome = () =>
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );


test("Home renders main heading", () => {
  renderHome();
  expect(screen.getByText(/Develop Your Skills/i)).toBeInTheDocument();
});


test("Home filters activities by search text", () => {
  renderHome();

  const input = screen.getByPlaceholderText(/Search for activity/i);
  fireEvent.change(input, { target: { value: "cook" } });


  expect(
    screen.getByRole("link", { name: /Cooking Course/i })
  ).toBeInTheDocument();


  expect(
    screen.queryByRole("link", { name: /Photography/i })
  ).not.toBeInTheDocument();
});
