import { combineReducers } from "redux";
// import engineerProjectList from "./Engineer/Project/engineerProjectList";
// import engineerProfile from "./Engineer/Profile/engineerProfile";
// import engineerSkill from "./Engineer/Profile/engineerSkill";
// import assignedProject from "./Company/Project/engineerProjectList";
// import companyProfile from "./Company/Profile/companyProfile";
// import engineerList from "./Company/Data/engineerList";

import loginReducer from './Login/login'

const reducers = combineReducers({
  loginReducer
  // engineerProjectList,
  // engineerProfile,
  // engineerSkill,
  // assignedProject,
  // companyProfile,
  // engineerList
});

export default reducers;