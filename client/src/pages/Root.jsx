// import { Outlet, NavLink } from "react-router-dom";
// import MainNavigation from "../components/MainNavigation";


// function RootLayout(){

//     return (
//         <>
//             <MainNavigation/>
//             <main className="content">
//                 <Outlet />
//             </main>
//         </>
//     )
// }

// export default RootLayout;




import { Outlet, NavLink, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";
function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post' });
            return;
        }

        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);

        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' });
        }, tokenDuration);
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main className="content">
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;
