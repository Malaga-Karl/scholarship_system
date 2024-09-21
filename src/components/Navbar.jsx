import plmLogo from '../assets/plm_logo.svg';

export default function Navbar(){
    return (
        <nav>
            <img src={plmLogo} alt="PLM Logo" className='plmLogo'/>
            <ul className='nav--tabs'>
                <li><a href="#">Home</a></li>
                <li><a href="#">Announcements</a></li>
                <li><a href="#">Partnered Foundations</a></li>
            </ul>
            <button type="button" className='signin'>Sign In</button>
        </nav>
    )
};