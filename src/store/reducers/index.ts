import {combineReducers} from "redux"

import usersReducer from "./users"
import ayahsReducer from "./ayahs"
import statusReducer from "./status"
import profileReducer from "./profile"
import demographicDataReducer from "./demographicData"
import evaluatorReducer from "./evaluator"

export default combineReducers({
  users: usersReducer,
  ayahs: ayahsReducer,
  status: statusReducer,
  profile: profileReducer,
  demographicData: demographicDataReducer,
  evaluator: evaluatorReducer,
})
