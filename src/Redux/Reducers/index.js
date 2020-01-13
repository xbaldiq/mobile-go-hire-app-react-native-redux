import { combineReducers } from "redux";

import assignedProject from "./Data/Company/assignedProjectList";
import loginReducer from './Login/login'
import RegisterReducer from './Login/register'
import engineerList from './Data/Engineer/getAllEngineer'
import engineerProfile from "./Data/Engineer/engineerProfile";
import engineerProjectList from './Data/Engineer/Project/engineerProjectList'

const reducers = combineReducers({
  loginReducer,
  RegisterReducer,
  engineerList,
  engineerProjectList,
  assignedProject,
  engineerProfile
});

export default reducers;