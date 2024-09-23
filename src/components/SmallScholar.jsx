export default function SmallScholar({image, title, description}){
    return(
        <div className="smallscholar--container shadow">
            <img src={image} alt="image"/>
            <div className="smallscholar--details">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );

}