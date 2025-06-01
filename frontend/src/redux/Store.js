import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer,persistStore } from "redux-persist";
const persistConfig={
    key:"root",
    storage
}
const persistedReducer=persistReducer(persistConfig,authReducer)
export const store=configureStore({
    reducer:{
        // auth:authReducer//isse refresh ph chala jata tha data
        auth:persistedReducer
    }
})
export const persistor=persistStore(store)
//refresh hone pr sara Redux ka data udd na jaye isliye persist use karahe hn,isse jh dispatch sh humne login mein user data h wh udega nhi refresh ph