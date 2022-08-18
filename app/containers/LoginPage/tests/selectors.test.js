// import { selectLoginPageDomain } from '../selectors';

import makeSelectLoginPage, {
  makeSelectAuth,
  makeSelectLoginScenarioString,
  makeSelectLoginUserCred
} from "../selectors";

describe("selectLoginPageDomain", () => {

  const mockParameters = {
    userCred:{
      userID:"",
      password:"",
      role:""
    },
    IsAuth: false,
    Scenario_String:{},
  }

  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("Expect makeSelectLoginPage to return state", () => {
    const selected = makeSelectLoginPage().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters)
  });

  it("Expect makeSelectAuth to return state", () => {
    const selected = makeSelectAuth().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.IsAuth)
  });

  it("Expect makeSelectLoginUserCred to return state", () => {
    const selected = makeSelectLoginUserCred().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.userCred)
  });

  it("Expect makeSelectLoginScenarioString to return state", () => {
    const selected = makeSelectLoginScenarioString().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.Scenario_String)
  });

});
