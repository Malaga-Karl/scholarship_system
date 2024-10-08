export default function Announce({image, title, desc, size}){
    const date_readmore ={
            display:"flex",
            justifyContent:"space-between",
    }
    
    return(
        <div className={"news announce--" + size}>
            <img src={image} alt={image} />
            <div className="text">
                <h4>{title}</h4>
                <p id="desc">{desc}</p>
                <div style={date_readmore}>
                    <p>September 27, 2024</p>
                    <button type="btn">Read More</button>
                </div>
            </div>
        </div>
    )
}