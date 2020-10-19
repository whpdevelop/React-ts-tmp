
export interface IAction {
    type:string,
    payLoad:any
}

/**
 * global.reducer.ts 
 */

export interface IGlobalReducer {
    locale:string,
    testData:any
}

export interface IGlobalState {
    globalReducer: IGlobalReducer;
}