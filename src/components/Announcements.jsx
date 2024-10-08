import image_plmScholar from '../assets/announcements/plmscholar.png'
import Announce from './Announce'
import image_dost from '../assets/announcements/small_dost.png'
// import small_anak from '../assets/announcements/small_anak.png'
// import small_megaworld from '../assets/announcements/small_megaworld.png'
// import small_lamudi from '../assets/announcements/small_lamudi.png'


export default function Announcements(){
    return(
        <div className='announcements'>
            <h3 className="banner">Announcements</h3>
            <div className="announce--content">
                <Announce size="big" image={image_plmScholar} title="The PLM Scholars Foundation Inc. is now accepting applications" desc="Attention aspiring PLM Students! If you're passionate about your education and eager to make a difference, here’s your chance to unlock endless possibilities."/>
                <div className="vl"></div>
                <div>
                    <Announce size="small" image={image_dost} title="DOST Scholarship is doing something" desc="The DOST something is doing anyhting"/>
                    <Announce size="small" image={image_dost} title="DOST Scholarship is doing something" desc="The DOST something is doing anyhting"/>
                    <Announce size="small" image={image_dost} title="DOST Scholarship is doing something" desc="The DOST something is doing anyhting"/>

                </div>
            </div>
        </div>
    )
}