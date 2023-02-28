import { Outlet } from 'react-router-dom'
import VantLayout from './components/vant-layout'
import './styles/index.scss'

const App = () => {
  return (
		<VantLayout>
			<Outlet />
		</VantLayout>
  )	
}

export default App
