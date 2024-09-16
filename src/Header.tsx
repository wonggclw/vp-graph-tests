import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='nav-container'>
        <nav>
          <NavLink to="/card">Card</NavLink>
          <NavLink to="/barchart">BarChart</NavLink>
        </nav>
    </header>
  )
}

export default Header