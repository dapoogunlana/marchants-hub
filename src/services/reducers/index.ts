import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { cartReducer } from "./cart-reducer";
import { productReducer } from "./product-reducer";
import { sessionReducer } from "./session-reducer";


export const rootReducer = combineReducers({
    session: sessionReducer,
    activeProduct: productReducer,
    cart: cartReducer,
});

const config = {
    key: 'whitelisted-reducers',
    storage
}

export const persistedRootReducer = persistReducer(config, rootReducer);