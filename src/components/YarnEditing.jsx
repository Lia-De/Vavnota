import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import styles from './LoomProjectForm.module.css';
import YarnForm from "./YarnForm";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export default function YarnEditing({yarn, hide, onChange, warpAsWeft, useWarpAsWeft}) {

    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm();

// console.log(yarn);

    useEffect(() => {
        if (yarn) {
            reset(yarn);
        }
    }, [yarn, reset]);

    const onSubmit = (data) => {
        if (isDirty) {
            onChange(data);
        }
            hide();
    }
    
    return (
        <div className="yarnEditingContainer">
        <form className={styles.createForm} onSubmit={handleSubmit(onSubmit)}>
            <h3>Redigera {yarn?.brand ? yarn.brand : 'fyll i namn'}   
                <button type="submit" 
                    className="printHidden btnWarpingToggle" 
                    title="Spara ändringar och stäng">✓</button>
                <button
                    type="button"
                    className="btnWarpingToggle"
                    title="Återställ ändringar"
                    onClick={() => reset()}
                    disabled={!isDirty}
                    >
                    ↺
                </button>
            </h3>
                <button type="button" className="btnWarpingToggle" style={{cursor:"default"}}
                    onClick={() => useWarpAsWeft(!warpAsWeft)}>
                    {warpAsWeft 
                    ? <><MdOutlineCheckBox className="icon" /> Varp används som inslag</>
                    : <><MdOutlineCheckBoxOutlineBlank /> Använd varpgarn som inslag</>}
                </button>
            
            <YarnForm
                register={register}
                errors={errors}
                styles={styles}
            />

            </form>
        </div>
    )
}