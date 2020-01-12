import { combineReducers } from "redux";
// import engineerProjectList from "./Engineer/Project/engineerProjectList";
// import engineerProfile from "./Engineer/Profile/engineerProfile";
// import engineerSkill from "./Engineer/Profile/engineerSkill";
// import assignedProject from "./Company/Project/engineerProjectList";
// import companyProfile from "./Company/Profile/companyProfile";
// import engineerList from "./Company/Data/engineerList";

import loginReducer from './Login/login'
import RegisterReducer from './Login/register'
import engineerList from './Data/Engineer/getAllEngineer'
import engineerProjectList from './Data/Engineer/Project/engineerProjectList'

const reducers = combineReducers({
  loginReducer,
  RegisterReducer,
  engineerList,
  engineerProjectList,
});

export default reducers;