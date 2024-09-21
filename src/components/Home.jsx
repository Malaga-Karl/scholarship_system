import Partners from './Partners';
import '../styles/Home.css';

export default function Home(){
    return(
        <div className='home'>
            <Partners/>
            <div className='home--content'>
                <h1 className='home--title'>PLM Scholarship System</h1>
                <p>
                Welcome to the PLM Scholarship System, your gateway to educational support and financial aid at Pamantasan ng Lungsod ng Maynila. Easily apply for scholarships, track your application status, and stay updated on important announcements. Empower your academic journey with opportunities that help you achieve your dreams. 
                </p>
            </div>
        </div>
    )
}