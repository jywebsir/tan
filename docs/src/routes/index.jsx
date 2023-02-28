import App from '../app'
import HomePage from '../pages/home-page'

const routes = [
	{
    path: "/",
    element: <App />,
    children: [
			{
				index: true,
				element: <HomePage />	
			}
    ]
  }
]

export default routes