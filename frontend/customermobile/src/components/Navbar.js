import React, { useState } from "react"
import '../style/Navbar.css';
import '../style/Responsive.css';
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import { Menu } from './Menu';



function Navbar (){
    const [navbarOpen, setNavbarOpen] = useState(false)
    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
      }
    return (
        <nav className="navBar">
         <button onClick={handleToggle}>
  {navbarOpen ? (
    <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
  ) : (
    <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
  )}
</button>
         <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
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
export default Navbar;