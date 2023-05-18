import React, { createContext } from "react";

// NOTE for jest mocking to work and access these out-of-scope variables. Variable names must be prefixed with "mock"

const MockCompanyContext = createContext();

const companyName = "The Data Life";
const employee = "Niccolo Lampa";

const MockCompanyProvider = ({ children }) => (
  <MockCompanyContext.Provider
    value={{
      companyName,
      employee,
    }}
  >
    {children}
  </MockCompanyContext.Provider>
);

// eslint-disable-next-line react/display-name
const MockCompanyConsumer = (Child) => (props) =>
  (
    <MockCompanyContext.Consumer>
      {(context) => <Child {...props} {...context} />}
    </MockCompanyContext.Consumer>
  );

export { MockCompanyProvider, MockCompanyConsumer };
