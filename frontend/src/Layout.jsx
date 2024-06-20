import { Navbar, Footer} from './components/components.index.js'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout