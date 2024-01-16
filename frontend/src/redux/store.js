import {combineReducers,configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'
import userReducer from './user/userSlice'
import productReducer from './user/productSlice'
import cartReducer from './user/cartSlice'

const rootReducer= combineReducers({
    user:userReducer,
    product:productReducer,
    cart:cartReducer
})

const persistConfig= {
    key:'root',
    storage,
    version:1
}
const persistedReducer= persistReducer(persistConfig,rootReducer)

export const store= configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})

export const persistor= persistStore(store)