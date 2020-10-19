
import React , { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'


const  Loading = ()=> {
    return <div style={{height:'400px'}}>
        加载中···
        {/* <img
         className="flex"
         style={{margin:'200px auto'}}
         width="80"
         height = "80"
         src={require('../../assets/imgs/loading.svg')} alt=""/> */}
    </div>
}
const routes = [
    {
        id:1,
        path:'/index',
        component:lazy(() => import('@/Pages/Index')),
        authed:false
    }
]

const Main = () => {
    return (
        <div className="main">
            <Header />
                <div style={{minHeight:'400px'}}>
                    <Suspense fallback={Loading()}>
                        <Switch>
                            {
                                routes.map(item=>{
                                    return (
                                        <Route exact key={item.id} path={item.path}>
                                            {
                                                <item.component />
                                            }
                                        </Route>
                                        // item.authed?
                                        //     <PrivateRoute 
                                        //     isLogin = {false}
                                        //     key={item.id} 
                                        //     >
                                        //         {
                                        //             <item.component />
                                        //         }
                                        //     </PrivateRoute>:
                                        //     <Route exact key={item.id} path={item.path}>
                                        //         {
                                        //             <item.component />
                                        //         }
                                        //     </Route>
                                    )
                                })
                            }
                            <Redirect to="/index"></Redirect>
                        </Switch>
                    </Suspense>
                </div>
            <Footer />
        </div>
    )
}
// interface PrivateRouteProps {
//     isLogin:boolean,
//     children:ReactElement
// }
// function PrivateRoute({children,isLogin,...rest}:PrivateRouteProps){
//     return <Route 
//                 {...rest} 
//                 render={({location}) => {
//                     return (
//                         isLogin?
//                         children: 
//                         <Redirect
//                             to={{
//                             pathname: "/sign/login",
//                             state: { from: location }
//                             }}
//                         />
//                     )
//                 }}
//             />
// }

export default Main;
