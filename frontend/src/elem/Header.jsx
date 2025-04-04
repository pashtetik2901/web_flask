import {Link} from 'react-router-dom'
import './style/Header.css'

function Header(){
    return(
        <header>
            <Link to="/" className='link'>Home</Link>
            <Link to="/admin" className='link'>Adminka</Link>
        </header>
    )
}

export default Header;