import BigScholar from './BigScholar';
import SmallScholar from './SmallScholar';
import image_plmScholar from '../assets/announcements/plmscholar.png'
import small_dost from '../assets/announcements/small_dost.png'
import small_anak from '../assets/announcements/small_anak.png'
import small_megaworld from '../assets/announcements/small_megaworld.png'
import small_lamudi from '../assets/announcements/small_lamudi.png'


export default function Announcements(){
    return(
        <div className='announcements'>
            <h3 className="banner">Announcements</h3>
            <div className="announce--content">
                <BigScholar 
                image={image_plmScholar} 
                title="The PLM Scholars Foundation Inc. is now accepting applications."
                description="Eligibility: 
                1. PLM students currently on their sophomore year or higher 
                2. Minimum GWA of 2.5 in the last academic year 
                We're here to support deserving students from economically disadvantaged backgrounds."
                />
                <div className="vl"></div>
                <div className="announce--small">
                    <SmallScholar 
                        image={small_dost} 
                        title="DOST-SEI Undergaduate Scholarship" 
                        description="The DOST-SEI Undergraduate Scholarship is a prestigious program supporting Filipino students aiming for higher education in science and techn..."/>
                    <SmallScholar 
                        image={small_dost} 
                        title="DOST-SEI Undergaduate Scholarship" 
                        description="The DOST-SEI Undergraduate Scholarship is a prestigious program supporting Filipino students aiming for higher education in science and techn..."/>
                    <SmallScholar 
                        image={small_dost} 
                        title="DOST-SEI Undergaduate Scholarship" 
                        description="The DOST-SEI Undergraduate Scholarship is a prestigious program supporting Filipino students aiming for higher education in science and techn..."/>
                    <SmallScholar 
                        image={small_dost} 
                        title="DOST-SEI Undergaduate Scholarship" 
                        description="The DOST-SEI Undergraduate Scholarship is a prestigious program supporting Filipino students aiming for higher education in science and techn..."/>
                </div>
            </div>
        </div>
    )
}