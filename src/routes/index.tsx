import React from 'react'

import asyncComponent from '../components/Async/Async'

/*
All pages that rely on 3rd party components (other than Material-UI)
are loaded asynchronously, to keep the initial JS bundle to a minimum size,
like so:

const Page = asyncComponent( () => import('./pages/Page/Page') )

Pay attention: Layouts do not fall under this requirement.
*/

// Auth components
import Page404 from '../pages/Page404/Page404'

// Layouts
import MainLayout from '../layouts/MainLayout/MainLayout'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'

// Page components
const Home = asyncComponent( () => import('../pages/Home/Home') )
const FavoriteRepos = asyncComponent( () => import('../pages/FavoriteRepos/FavoriteRepos') )
const RepositoryDetails = asyncComponent( () => import('../pages/RepositoryDetails/RepositoryDetails') )


const appRoutes = [
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: '/favorites',
				element: <FavoriteRepos />,
			},
			{
				path: '/user/:login/repo/:name',
				element: <RepositoryDetails />,
			},
		],
	},
	{
		path: '*',
		element: <AuthLayout />,
		children: [
			{
				path: '*',
				element: <Page404 />,
			},
		],
	},
]

export default appRoutes
