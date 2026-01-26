import { useState} from "react";
import WarpingEndsBoxes from "./WarpingEndsBoxes";
import WarpChains from "./WarpChains";

export default function WarpingHelp({ endsInWarp, warping }) {
    const warpingGroupOptions = [10, 20, 30, 40, 50];
    const [groupSize, setGroupSize] = useState(20);


    return (
        <div className="warpingHelp">
            <WarpingEndsBoxes totalEnds={endsInWarp ?? 0} 
                groupSize={groupSize} 
                warping={warping ? warping: false} />
             {/* Toggle */}
            <div className="warpingBoxesToggle" >
                {warpingGroupOptions.map((size) => (
                <button className={groupSize === size ?"btnWarpingToggle":"btnWarpingToggleInactive"}
                key={size}
                onClick={() => setGroupSize(size)}
                >
                    {size}
                </button>
                ))}
            </div>
            <WarpChains totalEnds={endsInWarp ?? 0} warping={warping} />
        </div>
    );
}