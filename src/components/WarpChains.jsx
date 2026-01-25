import { useState } from "react";
import CreateWarpChain from "../components/CreateWarpChain.jsx";


export default function WarpChains({totalEnds}) {
  const [chainCount, setChainCount] = useState(4);
  const [idealEndsPerChain, setIdealEndsPerChain] = useState(Math.floor(totalEnds/chainCount));


  return (
    <div className="warpChainsGrid">
      {/* User input */}
      <h3 className="printHidden">Varpflätor</h3>
      <div className="chainControl">
        <label>
          Antal kedjor: <input
            className="opt optHalf"
            type="number"
            min="0"
            max="50"
            value={chainCount}
            onChange={(e) => {
              setChainCount(Number(e.target.value)); 
              setIdealEndsPerChain(Math.floor(totalEnds/Number(e.target.value)))
            }}
          /> 
        </label>
      </div>

      <CreateWarpChain 
        idealEndsPerChain={idealEndsPerChain}
        chainCount={chainCount}
        />
          
    </div>
  );
}


