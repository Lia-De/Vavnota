import { useForm } from "react-hook-form";
import { GrEdit } from "react-icons/gr";
import { updateProjectParameters } from "../services/projectHelpers";
import { currentProjectAtom } from "../atoms/currentProjectAtom";
import { useAtom } from "jotai";

export default function UpdateProjectInfo ({project, setUiState, name=false, description=false}) {
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
    function InfoForm({ label, fieldName, defaultValue, onSubmit }) {
        const { register, handleSubmit, reset, watch,  
                formState: { errors, isDirty }} = useForm({
                            defaultValues: {[fieldName]: defaultValue}});

        const submit = (data) => {
            onSubmit(data);
            reset({ [fieldName]: data[fieldName] });
        };
        const placeholder = () =>{
            return name ? "Projektnamn" : "Beskrivning";
        }
        const value = watch(fieldName);
        return (
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder={placeholder()}
                    className={name? "updateNameInput" : "updateDescInput desc"}
                {...register(fieldName, {required: "Fältet är obligatoriskt"})}
                />
                <button type="submit" className="submitBtn printHidden"  disabled={!isDirty}>
                    <GrEdit />
                </button>
                
                {errors[fieldName] && (
                <p className="error"> 
                    {errors[fieldName].message}
                </p>
                )}
            </form>
        );
    }
    const handleInfoSubmit = async (payload) => {  
        const updatedProject = updateProjectParameters(project, payload);
        setCurrentProject(updatedProject.data);
    };

   return name ? (
        <div className="updateInfoContainer">
        <InfoForm
            label="Namn"
            fieldName="name"
            defaultValue={project.name ? project.name : ''}
            projectId={project.id}
            onSubmit={handleInfoSubmit}
        />
        </div>
    ) : (
    description ? (
            <div className={"updateInfoContainer " + 
            ((!project?.description || project.description.length === 0) ? 'printHidden' : '')}>
        <InfoForm
            label="Beskrivning"
            fieldName="description"
            defaultValue={project.description ? project.description : ''}
            projectId={project.id}
            onSubmit={handleInfoSubmit}
        />
        </div>
    ) : (
        <>
            <p className="desc printHidden">Okänd information</p>
        </>
    ));
}