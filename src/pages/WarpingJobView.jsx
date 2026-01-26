import { useAtomValue } from "jotai";
import WarpingHelp from "../components/WarpingHelp";
import { currentProjectAtom } from "../atoms/currentProjectAtom";
import { Link } from "react-router";
import { LoomProject } from "../services/projectHelpers";
import { useState } from "react";

export default function WarpingJobView(){
    const projectData = useAtomValue(currentProjectAtom);
    const project = new LoomProject(projectData);
    return (
        <>
            <p>
               <Link to="/">&lt;&lt; Tillbaka</Link>
            </p>
            
            {project && 
                <WarpingHelp 
                endsInWarp={project?.endsInWarp}
                warping={true}
                />}
        </>
    )
}