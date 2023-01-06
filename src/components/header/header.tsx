

import image from '../../assets/logo.svg';
import { FiLogOut } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';

import '../header/header.css';

const Header = ( ) => { 
return (
  <header>
    <nav>
      <div className='logo'>
        <img src={ image } alt='image' />
      </div>

      <div className='user'>
        <BiUserCircle />
        <b> Joao Paulo Gardiano </b>
        <button> <FiLogOut /> </button>
      </div>
    </nav>
  </header>
  );
}

export default Header;