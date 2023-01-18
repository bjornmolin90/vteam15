import React from 'react';
import { Menu } from './Menu';
import '../style/Navbar.css';
  
class Navbar extends React.Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className='navbar-logo'>Kundsidan<i className="fab fa-react"></i></h1>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' :
                'nav-menu'}>
                    {Menu.map((item, index) => {
                    return ( 
                    <li key={index}>
                        <a className={item.cName} href={item.url}>
                       {item.title} </a>
                    </li>)
        })}

                   
                </ul>
            </nav>
        )
    }
}

export default Navbar;