import reducer from "../features/UserSlice";


const test_initialVal = {
  user: null,     
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

test("Checking initial values in UserSlice store", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(test_initialVal);
});
