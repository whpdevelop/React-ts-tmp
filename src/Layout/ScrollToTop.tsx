import { useEffect, ReactElement} from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
    children:ReactElement
}
const ScrollToTop = (props:IProps) => {
    let { children, location} = props
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[location.pathname])
    return children
}
export default withRouter(ScrollToTop);