import { useAtom } from 'jotai';
import { warpChainsAtom } from '../atoms/warpChainsAtom';
import { warpingBoxesFilledAtom } from '../atoms/warpingBoxesFilledAtom';
import { currentProjectAtom } from '../atoms/currentProjectAtom';
import { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

export default function WarpingEndsBoxes({
  totalEnds,
  boxesPerGroup = 5,
  maxPerRow = 10,
  boxSize = 20,
  warping,
}) {

const [warpingBoxesFilled, setWarpingBoxesFilled] = useAtom(warpingBoxesFilledAtom);
const markedBoxes = new Set(Array.from({length: warpingBoxesFilled}, (_, i) => i));
const [projectData, setProjectData] = useAtom(currentProjectAtom);
const [groupSize, setGroupSize] = useState(projectData.warpingGroupSize);
const warpingGroupOptions = [10, 20, 30, 40, 50];
const [currentChain, setCurrentChain] = useState(0);

const [warpChains, setWarpChains] = useAtom(warpChainsAtom);
const [alreadyWarped, setAlreadyWarped] = useState(0);

// state for custom group size
const [customGroupSize, setCustomGroupSize] = useState(null);

// Handler for custom group size
const handleCustomGroupSize = () => {
  const parsed = parseInt(customGroupSize, 10);

  if (!isNaN(parsed) && parsed > 0) {
    setGroupSize(parsed);
  }
};

useEffect(()=> {
    if (groupSize)
        setProjectData(prev => ({...prev, warpingGroupSize: groupSize}))
},[groupSize])

const handleAddMark = () => {
  if (warpingBoxesFilled < fullBoxes + remainderBoxes) {
    setWarpingBoxesFilled(warpingBoxesFilled + 1);
    setAlreadyWarped(prev=> prev+groupSize);
  }
};

const handleRemoveMark = () => {
  if (warpingBoxesFilled > 0) {
    setWarpingBoxesFilled(warpingBoxesFilled - 1);
    setAlreadyWarped(prev=> prev-groupSize);
  }
};

useEffect(()=> {
  if (warpChains.length > 0) {
    // const count = warpChains.map(chain => chain.warpedEndsInChain);
    const count = warpChains.reduce((sum, chain) => sum + chain.warpedEndsInChain, 0);
    console.log(count);
  }
},[warpChains]);

  if (!groupSize || groupSize <= 0) return null;

  const fullBoxes = Math.floor(totalEnds / groupSize);
  const remainder = totalEnds % groupSize;
  const remainderBoxes = remainder > 0 ? Math.floor(remainder/2) : 0;


  return (
    
    <div className="warpingBoxesBox">

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
          <div className="customGroupSizeBox">
            <input className="opt optHalf"
              type="number"
              value={customGroupSize}
              placeholder="??"
              title="Anpassad gruppstorlek"
              onChange={(e) => setCustomGroupSize(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCustomGroupSize();
                }
              }}
            />
            
            <button 
              title="Sätt anpassad gruppstorlek"
              onClick={handleCustomGroupSize}
              className={groupSize === Number(customGroupSize) ?"btnWarpingToggle":"btnWarpingToggleInactive"}
            >
              <FaCheck />
            </button>

          </div>
      </div>
      {/* Legend */}
      <div
        style={{
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
        }}
      >
        <div
          style={{
            width: boxSize,
            height: boxSize,
            border: '2px solid #000',
          }}
        />
        <span>= {groupSize} trådar</span>

        {remainder > 0 && (
          <>
            <div
              style={{
                width: boxSize,
                height: boxSize,
                borderRadius: '50%',
                border: '1px solid #000',
                marginLeft: 12,
              }}
            />
            <span>= 2 trådar </span>
          </>
        )}
      </div>

      {/* Boxes grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${maxPerRow}, 1.5rem)`,
          // gridTemplateColumns: `repeat(${maxPerRow}, ${boxSize}px)`,
          gap: '4px', justifySelf:"center"
        }}
      >
        {Array.from({ length: fullBoxes }).map((_, index) => {
          const isGroupDivider = (index + 1) % boxesPerGroup === 0;
          const isMarked = markedBoxes.has(index);

          return (
            <div
              key={`box-${index}`}
              style={{
                width: "1.5rem",
                height: "1.5rem",
                // width: boxSize,
                // height: boxSize,
                border: '1px solid #000',
                borderRight: isGroupDivider ? '3px solid #000' : '1px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isMarked ? '#f0f0f0' : 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {isMarked && '✕'}
            </div>
          );
        })}

        {/* Remainder circles */}
        {Array.from({ length: remainderBoxes }).map((_, index) => {
          const boxIndex = fullBoxes + index;
          const isMarked = markedBoxes.has(boxIndex);

          return (
            <div
              key={`rem-${index}`}
              style={{
                width: boxSize,
                height: boxSize,
                borderRadius: '50%',
                border: '1px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isMarked ? '#f0f0f0' : 'white',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
              title="2 ends"
            >
              {isMarked && '✕'}
            </div>
          );
        })}
      </div>
            {/* Button to add mark */}
      {warping && <div className="printHidden" style={{ margin: '2rem 0' }}>
        <button 
        style={{padding: "4rem 1rem"}}
          onClick={handleAddMark}
        >
          ✕ Checka av en ruta <br />
          {currentChain == 0 ? '':`Nuvarande kedja: ${currentChain}`}
          Varpat: {alreadyWarped}
        </button>
        <button className="submitBtn"
          onClick={handleRemoveMark}
        >
          Ångra
        </button>
      </div>}
    </div>
  );
}

