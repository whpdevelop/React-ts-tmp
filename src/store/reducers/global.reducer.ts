
import { Dispatch } from 'redux';
import { IAction,IGlobalReducer } from '../types'
import { axios, baseUrl } from '../request'


const TOGGLE_LANGUAGE = 'TOGGLE_LANGUAGE'

const initState:IGlobalReducer = {
    locale: localStorage.getItem('locale') || 'cn',
    testData:null
}

export default function  globalReducer (state = initState,action:IAction) {
    switch(action.type){
        case TOGGLE_LANGUAGE:
            return { ...state, locale:action.payLoad }
        default:
            return state
    }
}

// 设置语言
export function toggleLanguageAction(locale:string):IAction{
    localStorage.setItem('locale',locale)
    return {type:TOGGLE_LANGUAGE, payLoad:locale}
}

