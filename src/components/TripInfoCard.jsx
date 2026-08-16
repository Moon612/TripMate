
function TripInfoCard({label, value}){
    return(
        <div className="trip-info-card">
            <p className="trip-info-label">{label}</p>
            <p className="trip-info-value">{value}</p>
        </div>
    );
}

export default TripInfoCard;

