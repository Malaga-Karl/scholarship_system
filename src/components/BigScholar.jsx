export default function BigScholar({image, title, description}){
    return(
        <div className='bigscholar--container shadow'>
            <img src={image} alt="scholarship image"/>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}