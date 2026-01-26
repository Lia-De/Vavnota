export default function YarnInfoShort({ yarn, warpAsWeft=false }) {
    if (!yarn) return ('');
    return (
        <>
        <p className={warpAsWeft ? "italics" : ""}>{yarn.brand? yarn.brand : ""}</p>
        <p className={warpAsWeft ? "italics" : ""}>{yarn.color? yarn.color : ""} 
          {yarn.colorCode ? "(" + yarn.colorCode + ") " : " "} 
          {yarn.dyeLot && "Färgbad: "+yarn.dyeLot}</p>
        
        <p className={warpAsWeft ? "italics" : ""}>{(yarn.thicknessNM && yarn.ply) ? `${yarn.thicknessNM}/${yarn.ply} Nm` : ''}</p>
        <p className={warpAsWeft ? "italics" : ""}>{yarn.weightPerSkeinGrams} g</p>
        <p className={warpAsWeft ? "italics" : ""}>{yarn.lengthPerSkeinMeters} m</p>
        {/* <p className={warpAsWeft ? "italics printHidden" : "printHidden"}>Nystan: {yarn.numberOfSkeins}</p> */}
        
        </>
        )
};
