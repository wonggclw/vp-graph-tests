import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='nav-container'>
        <nav>
          <NavLink to="/card">Card</NavLink>
          <NavLink to="/barchart">BarChart</NavLink>
          <NavLink to="/tidytree">TidyTree</NavLink>
          <NavLink to="/ctree">CardTree</NavLink>
          <NavLink to="/mcircle">MagicCircle</NavLink>
          <NavLink to="/statictree">StaticTree</NavLink>
        </nav>
    </header>
  )
}

export default Header