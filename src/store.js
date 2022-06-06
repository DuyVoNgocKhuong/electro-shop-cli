import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { persistor, store };
// export default store;
