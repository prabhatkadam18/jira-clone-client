import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./features/common/dataSlice";
import uiReducer from "./features/common/uiSlice";

export default configureStore({
  reducer: {
    data: dataReducer,
    ui: uiReducer,
  },
});
