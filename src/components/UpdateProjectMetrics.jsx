import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { GrEdit } from "react-icons/gr";
import { updateProjectParameters } from "../services/projectHelpers";
import { useAtom } from "jotai";

import { currentProjectAtom } from "../atoms/currentProjectAtom";
import { FaCheck } from "react-icons/fa";

export default function UpdateProjectMetrics ({project, setUiState, warp}) {

    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

       
    function MetricForm({ label, fieldName, defaultValue, projectId, onSubmit }) {
        const { register, handleSubmit, reset, watch, formState: { errors, isDirty }} = 
            useForm({ defaultValues: { [fieldName]: defaultValue } });

        // Keep form input in sync when upstream defaultValue changes
        useEffect(() => {
            reset({ [fieldName]: defaultValue });
        }, [defaultValue, fieldName, reset]);

    const integerFields = ["inputEndsInWarp", "picksPerCm", "endsPerCm"]; // example names
    const isIntegerField = integerFields.includes(fieldName);

    const submit = (data) => {
            onSubmit({
                projectId,
                [fieldName]: data[fieldName],
            });
             reset({ [fieldName]: data[fieldName] });
        };
        // const value = watch(fieldName);
        return (
            <div className="updateMetricsGrid">
            <form onSubmit={handleSubmit(submit)}>
                <input
                    type="number"
                    step={isIntegerField ? '1': "0.1"}
                    className="updateInput opt"
                    {...register(fieldName, {
                        required: "Fältet är obligatoriskt",
                        min: {value: isIntegerField ? 1: 0.1, message: "Måste vara positivt"}
                    })}
                />
                <button type="submit" className="submitBtn printHidden"  disabled={!isDirty}>
                    {isDirty ? <FaCheck /> : <GrEdit />}
                </button>
                
                {errors[fieldName] && (
                <p className="error">
                    {errors[fieldName].message}
                </p>
                )}
            </form>
            </div>
        );
    }
    const handleMetricSubmit = async (payload) => {
        try {
            const updatedProject = updateProjectParameters(project, payload);
            setCurrentProject(updatedProject.data);
            setUiState(prevState => ({...prevState, isLoading: false}));
        } catch (err) {
            console.error(`Error updating metrics:`, err);
            setUiState(prevState => ({...prevState, loadingError: err.message || "Unknown error"}));
        }
    };

   return warp ?  (
    <>
        <MetricForm
        label="Bredd"
        fieldName="weavingWidthCm"
        defaultValue={project.widthInput ? project.weavingWidthCm : project.effectiveWeavingWidthCm}
        projectId={project.id}
        onSubmit={handleMetricSubmit}
        />

        <MetricForm
        label="EPC"
        fieldName="endsPerCm"
        defaultValue={project.endsPerCm}
        projectId={project.id}
        onSubmit={handleMetricSubmit}
        />

        <MetricForm
        label="Längd"
        fieldName="warpLengthMeters"
        defaultValue={project.warpLengthMeters}
        projectId={project.id}
        onSubmit={handleMetricSubmit}
        />

        <MetricForm
        label="Trådar"
        fieldName="inputEndsInWarp"
        defaultValue={project.endsInWarp}
        projectId={project.id}
        onSubmit={handleMetricSubmit}
        />
    </>
    )
    :  (
        <>
        <span></span>
        <MetricForm
            label="PPC"
            fieldName="picksPerCm"
            defaultValue={project.picksPerCm}
            projectId={project.id}
            onSubmit={handleMetricSubmit}
        />
        </>
    );
    
}