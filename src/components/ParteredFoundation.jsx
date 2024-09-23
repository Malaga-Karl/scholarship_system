import logo_charity_first from '../assets/partners/charity_first.png';
import logo_lcck from '../assets/partners/lcck.png';
import logo_green from '../assets/partners/green.png';
import Img from './Img';

export default function ParteredFoundation(){
    return(
        <div className='partnered'>
            <h3 className="banner">Our Partnered Foundations</h3>
            <div className='partnered--content'>
                <h3 className='than_symbol'>&lt;</h3>
                <div className="partners">
                    <Img src={logo_charity_first} alt="" title="Charity First Foundation Inc."/>
                    <Img src={logo_lcck} alt="" title="Luis Co Chi Kiat Foundation Inc."/>
                    <Img src={logo_green} alt="" title="Buddhist Compassion Relief Tzu Chi Foundation, Philippines"/>
                </div>
                <h3 className='than_symbol'>&gt;</h3>
            </div>
        </div>
    )

}