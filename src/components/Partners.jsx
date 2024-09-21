import logo_cfcb from '../assets/partners/cfbc.png';
import logo_charity_first from '../assets/partners/charity_first.png';
import logo_cibak from '../assets/partners/cibak.png';
import logo_dost from '../assets/partners/dost.png';
import logo_green from '../assets/partners/green.png';
import logo_L from '../assets/partners/L.png';
import logo_lcck from '../assets/partners/lcck.png';
import logo_megaworld from '../assets/partners/megaworld.png';
import logo_sm from '../assets/partners/sm.png';

function PartnerImage({image}){
    return(
        <img src={image} alt="Partner Logo" className='partnerLogo'/>
    );
}

export default function Partners(){
    return(
        <div className='partnerlogos'>
            <PartnerImage image={logo_charity_first}/>
            <PartnerImage image={logo_lcck}/>
            <PartnerImage image={logo_sm}/>
            <PartnerImage image={logo_green}/>
            <PartnerImage image={logo_dost}/>
            <PartnerImage image={logo_megaworld}/>
            <PartnerImage image={logo_cibak}/>
            <PartnerImage image={logo_cfcb}/>
            <PartnerImage image={logo_L}/>
        </div>
    );
}