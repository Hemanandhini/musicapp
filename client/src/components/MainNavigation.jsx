
// import { Link, NavLink } from 'react-router-dom';

// function MainNavigation() {
//     return (
//         <div className="navbar">
           
//             <NavLink to="/songs" activeClassName="active" className="nav-link" end="true">
//                 Songs
//             </NavLink>
//             <NavLink to="/playlist" activeClassName="active" className="nav-link" >
//                 Playlist
//             </NavLink>
//             <NavLink to="/auth?mode=register"  activeClassName="active" className="nav-link" >
//               Authentication
//             </NavLink> 
            
//         </div>
//     );
// }

// export default MainNavigation;




import {  NavLink, useRouteLoaderData, redirect, useNavigate } from 'react-router-dom';

function MainNavigation() {
    const token = useRouteLoaderData('root');
    const navigateTo = useNavigate();
    function handleLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        navigateTo('/auth')
        return redirect('/');
    }
    return (
        <div className="navbar">
            <NavLink to="/songs" activeClassName="active" className="nav-link" end="true">
                Songs
            </NavLink>
            <NavLink to="/playlist" activeClassName="active" className="nav-link" >
                Playlist
            </NavLink>
            <NavLink to="/auth?mode=register"  activeClassName="active" className="nav-link" >
              Authentication
            </NavLink> 

            {token && (
             <NavLink to='/logout' activeClassName="active" className="nav-link dropdown" >
                Logout
                <div className="dropdown-content">
                    <button onClick={handleLogout}> Log out </button>
                </div>
            </NavLink>)}   
        </div>
    );
}

export default MainNavigation;
