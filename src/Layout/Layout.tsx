
import React , { Suspense} from 'react';
import { Switch,Redirect } from 'react-router-dom'
import Loading from '@/Layout/Component/Loading'
import {RouteWithSubRoutes,routes} from '@/Routes'
const Main = () => {
    return (
        <>
            <Suspense fallback={Loading()}>
                <Switch>
                    {
                        routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))
                    }
                    <Redirect to="/index"></Redirect>
                </Switch>
            </Suspense>
        </>
    )
}

export default Main;
