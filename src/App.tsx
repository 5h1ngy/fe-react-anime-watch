import { RouteObject, RouterProvider, useRouteError } from "react-router-dom"
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

import { Provider } from 'react-redux';
import { HiBars3, HiHome, HiBookmark, HiMagnifyingGlass } from "react-icons/hi2";

import ThemeProvider from "@/providers/ThemeProvider"
import withDynamicImport from "@/hocs/withDynamicImport";
import store, { actions } from '@/store';

const imgUrl = new URL('/public/vite.svg', import.meta.url).href

function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return <div>Dang!!</div>;
}

const routes: RouteObject[] = [
    {
        id: "root",
        path: "/",
        element: withDynamicImport('Landing', <h1> Loading </h1>).pages({
            children: <Outlet />,
            navbarItems: [
                { icon: <HiHome />, label: 'Newset', value: 'newset', default: true },
                { icon: <HiMagnifyingGlass />, label: 'Search', value: 'search', default: false },
                { icon: <HiBookmark />, label: 'My List', value: 'myList', default: false }
            ]
        }),
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />
            },
            {
                id: "home",
                path: 'home',
                loader: async () => store.dispatch(actions.pageLanding.setHistory({ id: 'home', label: 'Newset', current: true })),
                element: withDynamicImport('Home', <h1> Loading </h1>).containers(),
                errorElement: <ErrorBoundary />,
            }
        ]
    }
];

export default function App() {

    return <Provider store={store}>
        <ThemeProvider>
            <Helmet>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href={imgUrl} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Anime Watch</title>
            </Helmet>
            <RouterProvider router={createBrowserRouter(routes, {
                // https://reactrouter.com/en/main/routers/create-browser-router#optsfuture
                future: {
                    v7_fetcherPersist: true,
                    v7_normalizeFormMethod: true,
                    v7_partialHydration: true,
                    v7_relativeSplatPath: true,
                    v7_skipActionErrorRevalidation: true,
                },
            })} />
        </ThemeProvider>
    </Provider>
}