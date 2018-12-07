import {createStore, combineReducers} from 'redux'
import {initialState} from './initialState'
import changeCurrency from '../reducers'
import console from '../reducers/console'


const reducer = combineReducers({
    conversion: changeCurrency,
    console
});

let store = createStore(reducer, initialState)

export default store;
