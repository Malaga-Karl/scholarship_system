import logo_plm from '../assets/plm_iconlogo.png';
import logo_haribon from '../assets/haribon_logo.png';
import logo_bp from '../assets/bagongpilipinas_logo.png';

export default function Footer() {
    return (
        <>
        <div className='prefooter'>
            <div className="site_desc">
                <h3>PLM Scholarship System</h3>
                <p>The PLM Scholarship System is a web-based platform of the Resource Generation Office for Pamantasan ng Lungsod ng Maynila that streamlines scholarship applications. Students can apply online, track their status, and stay updated on opportunities, promoting efficiency and supporting academic growth through accessible technology.</p>
            </div>
            <div className="images">
                <img src={logo_plm} alt="" />
                <img src={logo_haribon} alt="" />
                <img src={logo_bp} alt="" />
            </div>
        </div>
        <div className="footer">
            <hr />
            <p className='center'>Copyright &copy; 2024 Pamantasan ng Lungsod ng Maynila. All Rights Reserved</p>
        </div>
        </>

    );
}