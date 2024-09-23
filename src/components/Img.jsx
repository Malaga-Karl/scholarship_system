export default function Img({src, alt, title}){

    return(
        <div className="image--container">
            <img src={src} alt={alt} />
            <h3 >{title}</h3>
        </div>
    )
}