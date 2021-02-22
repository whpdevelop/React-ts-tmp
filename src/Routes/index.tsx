import React ,{ lazy } from 'react';
import { Route } from 'react-router-dom'

export interface IRoutes {
    path:string
    component:any
    routes?:IRoutes[]
}
export const routes:IRoutes[] = [
    {
        path:'/index',
        component:lazy(() => import('@/Pages/Index'))
    }
]
export const RouteWithSubRoutes = (route:IRoutes) => {
    return (
        <Route
            path={route.path}
            render={(props:any) => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    )
}
