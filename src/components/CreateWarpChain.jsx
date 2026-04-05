import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";

export default function CreateWarpChain({ idealEndsPerChain, chainCount}) {
    const { register, handleSubmit, reset, getValues,setValue} = useForm({ mode: "onChange" });
    
    const onSubmit = () => {
        reset();
    }

    useEffect(() => {
        // remove ideal ends per chain when it changes
        const currentValues = getValues("warpChains");
        currentValues.forEach((_, index) => {
            setValue(`warpChains.${index}.ends`, null);
        });
    }, [chainCount]);

    return (
        <div>
            {/* Warp Chains */}
            <form onSubmit={handleSubmit(onSubmit)}>
            
            <p>Idealt <strong>{idealEndsPerChain}</strong> trådar på {chainCount} kedjor
            <button type="button"
                className="printHidden btnWarpingToggle"
                title="Fyll automatiskt i idealantal trådar per kedja"
                onClick={() => {
                const crossCount = getValues("sharedCrossCount");
                reset({
                    warpChains: Array.from({ length: chainCount }, () => ({
                    ends: idealEndsPerChain,
                    }))
                });
                
                }}
                >
                ✓
                </button>
            </p>
            <label>
                Kors (gäller alla kedjor)<br />
                <select
                    className="opt printHidden"
                    {...register("sharedCrossCount")}
                    defaultValue="1x1"
                >
                    {Array.from({ length: 20 }, (_, i) => {
                    const value = `${i + 1}x${i + 1}`;
                    return (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    );
                    })}
                </select>
                 {/* Printable value */}
                  <span className="opt printOnly">
                    {watch("sharedCrossCount")}
                  </span>
                </label>

            <div>
            {Array.from({ length: chainCount }).map((_, index) => (
                <div className="chainCount" key={index}>
                <p>{index + 1}:{" "}
                    <input
                    className="opt optHalf"
                    name={`chain-${index + 1}`}
                    id={`chain-${index + 1}`}
                    {...register(`warpChains.${index}.ends`, {required:true, valueAsNumber:true})}
                    />
                </p>
                </div>
            ))}
           

            </div>

        </form>
        </div>
    )
}
    
    
    
