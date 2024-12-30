export default function Cards(props){
    return(
        <div className="country-card">
                <img src={props.flag} alt="" />
            <h4>{props.name}</h4>
            <p>{props.population}</p>
        </div>
    )
}