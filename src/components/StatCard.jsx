
import "./StatCard.css";
function StatCard(props){
    return(
        <div className="stat-card">
            <p>{props.title}</p>
            <p>{props.value}</p>
        </div>
    );
}

export default StatCard;