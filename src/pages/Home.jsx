import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { MdOutlineLibraryAdd } from "react-icons/md";
import logo from '../assets/weave-svgrepo-com.svg';
import ShowProjectList from "../components/ShowProjectList.jsx";
import { Link } from "react-router";
import { projectListAtom } from "../atoms/projectListAtom.js";
import { currentProjectAtom } from "../atoms/currentProjectAtom.js";
import { warpAtom } from "../atoms/warpAtom.js";
import { weftAtom  } from "../atoms/weftAtom.js";
import { useClearAtoms } from "../services/projectHelpers.js";

export default function Home() {
    const [projectList, setProjectList] = useAtom(projectListAtom);
    const [project, setProject] = useAtom(currentProjectAtom);
    const [warp, setWarp] = useAtom(warpAtom);
    const [weft, setWeft] = useAtom(weftAtom);

    const [uiState, setUiState] = useState({
        yarnCount: 0,
        projectCount: 0,
        projectListView: false,
    });

    // Update UI state when projectList changes
    useEffect(() => {
        if (projectList) {
            if  (projectList.length > 0){
            setUiState(prev => ({
                ...prev, 
                projectCount: projectList.length
            }));
        } else {
            setUiState(prev => ({
                ...prev, 
                projectCount: 0
            }));
            }
        }
    }, [projectList]);
    
    
    const clearAtoms = () => {
        useClearAtoms();

        setProjectList([]);
        setProject(null);
        setWarp(null);
        setWeft(null);

    }

return (
    <div className="homeContainer">
        <h1 className="headerfontBold">
            Lias <img src={logo} alt="logo" height="36px" /> Vävnota
            </h1>
        <section>
            <p>
                Har sparat {uiState.projectCount} projekt
            </p>
            <button onClick={()=> clearAtoms()}>Clear data</button>
            <button>
                <Link to="detail">projekt</Link>
            </button>
        </section>

 
 {/* Buttons to select expanded information */}
         <section>  
            {projectList && projectList.length>0 && <button className="btnToggle" 
            onClick={() => setUiState(prev => ({...prev, projectListView: !prev.projectListView}))}>
                {uiState.projectListView 
                ? (<> <MdExpandLess className="icon"  />Dölj projektlista </>) 
                : (<> <MdExpandMore className="icon" /> Visa projektlista </>)}
            </button>}
        </section>

 {/* Adding section */}
        <section style={{paddingTop:"1rem"}}>
            <button><Link to="create">
                <MdOutlineLibraryAdd className="icon"/>Skapa project</Link></button>
        </section>
        
{/* Display the expanded information checked from the Button section */}
        {projectList && 
            projectList.length>0 && 
            uiState.projectListView  && 
            <ShowProjectList />
        }
    </div>
    );
}