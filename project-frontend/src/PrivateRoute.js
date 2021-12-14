import { Route, Redirect} from "react-router-dom"

const PrivateRoute = ({component: Component, isAuthentiacted,...rest}) => {
    

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthentiacted ?
                <Component {...props} />
            : 
            <Redirect to="/" />
        )} />
    );
};

export default  PrivateRoute