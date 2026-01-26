import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { warpAtom } from "../atoms/warpAtom.js";
import { weftAtom } from "../atoms/weftAtom.js";
import { currentProjectAtom, defaultLoomProject } from "../atoms/currentProjectAtom.js";
import { defaultWarp, defaultWeft } from "../constants/yarnConstants.js";
import { LoomProject } from "../services/projectHelpers.js";
import { useClearAtoms } from "../services/projectHelpers.js";

import YarnInfoShort from "../components/YarnInfoShort.jsx";
import UpdateProjectMetrics from "../components/UpdateProjectMetrics.jsx";
import UpdateProjectInfo from "../components/UpdateProjectInfo.jsx";
import WarpingHelp from "../components/WarpingHelp.jsx";
import YarnEditing from "../components/YarnEditing.jsx";
import PrintButton from "../components/PrintButton.jsx";

import "../css/ProjectView.css";
import { RiExpandLeftFill } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { MdInfoOutline } from "react-icons/md";
import logo from '../assets/weave-svgrepo-com.svg';


export default function ProjectView() {
  
  const [projectData, setProjectData] = useAtom(currentProjectAtom);
  const [project, setProject] = useState(projectData ? new LoomProject(projectData) : new LoomProject(defaultLoomProject))
  
  const projectId=project.id ? project.id : null;
  const [warp, setWarp] = useAtom(warpAtom);
  const [weft, setWeft] = useAtom(weftAtom);
  const [uiState, setUiState] = useState({
    isLoading: false,
    loadingError: null,
    showMeta: false,
    forceReload: false,
    warpAsWeft: false,
    yarnEditing: false,
    addYarn: false,
    yarnToEdit: null
  });
  
  const clearAtoms = () => {
      useClearAtoms();
      setProjectData(defaultLoomProject);
      setWarp(defaultWarp);
      setWeft(defaultWeft);
  }
const onYarnChanges = async (editedYarn) => {
    if (editedYarn.usageType==0) {
      setWarp(prev => ({...prev, ...editedYarn}))
      uiState.warpAsWeft && setWeft(_=> ({...warp, usageType: 1}))
    } else {
      uiState.warpAsWeft 
        ? setWeft({...warp, usageType: 1}) 
        : setWeft(prev => ({...prev, ...editedYarn}))
    }
    setUiState(prev => ({...prev, forceReload: true}))
  }

  useEffect(() => {
    if (uiState.warpAsWeft) {
      setWeft({...warp, usageType: 1});
    }
  }, [uiState.warpAsWeft, warp])

  useEffect(()=>{
    if (projectData) {
      setProject(new LoomProject(projectData));
    }
  },[projectData])


  if (!projectData && projectId) return (
    uiState.loadingError 
    ? <p>{uiState.loadingError} <Link to="/"><RiExpandLeftFill /> Tillbaka till framsidan</Link></p> 
    : <p>Laddar projekt... {uiState.loadingError}</p>);

return (
  <>
  <h1 className="headerfontBold printHidden">
      Lias <img src={logo} alt="logo" height="36px" /> Vävnota
  </h1>
    
  <button className="printHidden" onClick={()=> clearAtoms()}>Rensa data</button>

  <PrintButton label="Skriv ut projekt" />

  <section id="projectDetail">
    <h2 className="visuallyHidden">{project?.name || 'Nytt projekt'}</h2>
    
    <UpdateProjectInfo project={project} setUiState={setUiState} name={true}/>
    <UpdateProjectInfo project={project} setUiState={setUiState} description={true}/>
    
    {uiState.yarnEditing &&
      <YarnEditing 
        yarn={uiState.yarnToEdit} 
        hide={()=> setUiState(prev => ({...prev, yarnEditing: false}))}
        onChange={onYarnChanges} 
        warpAsWeft={uiState.warpAsWeft}
        useWarpAsWeft={ (value) => {setUiState(p => ({...p, warpAsWeft:value}))}}
      />}

    {!uiState.yarnEditing &&
    <>
    <div className="yarnMetricsWarp">
      <h2>Varpgarn 
        <button className="submitBtn printHidden" onClick={() => 
          setUiState(prev => ({...prev, yarnEditing: true, yarnToEdit: warp}))} >
              <GrEdit />
        </button>
      </h2>
      <YarnInfoShort yarn={warp}/>
    </div>

        
    <div className={'yarnMetricsWeft ' + (uiState.warpAsWeft ? 'printHidden' : '')}>
      <h2>Inslag {uiState.warpAsWeft ? 
        (<MdInfoOutline className="icon" title="Varpgarn används även som inslag" />) 
        : <button className={'submitBtn printHidden'} onClick={() => 
          setUiState(prev => ({...prev, yarnEditing: true, yarnToEdit: weft}))} >
              <GrEdit />
        </button>}
      </h2>
      <YarnInfoShort yarn={weft} warpAsWeft={uiState.warpAsWeft} />
    </div>
    </>
    }

    <div className="yarnCalculations">
      <div id="warpMetricsGrid" >
        <p>Vävbredd (cm)</p>
        <p>EPC </p>
        <p>Längd (m)</p>
        <p>Trådar</p>
        <UpdateProjectMetrics project={project} setUiState={setUiState} warp={true}/>

        <p className="col3">Åtgång varp (m)</p>
        <p>Åtgång nystan</p>
        <p className="opt optComputed col3">{project?.calculatedWarpLengthMeters || 0} </p>
        <p className="opt optComputed">{warp?.lengthPerSkeinMeters ? (project?.calculatedWarpLengthMeters / warp?.lengthPerSkeinMeters).toFixed(2) : '-'}</p>

        
        <p className="col2"> PPC </p>
        <p>Åtgång inslag (m)</p>
        <p>Åtgång nystan</p>
        <UpdateProjectMetrics project={project} setUiState={setUiState} warp={false}/>
        <p className="opt optComputed">{project?.totalWeftLengthMeters || 0} </p>
        <p className="opt optComputed"> {weft?.lengthPerSkeinMeters ? (project?.totalWeftLengthMeters / weft?.lengthPerSkeinMeters).toFixed(2) : '-'} </p>
      </div>  
      
    </div>
    <hr />     
  </section>
    
  {project.endsInWarp ? <section>
      <h3>Varpa - räkning

      <button className="printHidden">
        <Link to="/warping" >Till varpning</Link>
      </button>

      </h3>
    <WarpingHelp endsInWarp={project.endsInWarp} warping={false} />
  </section>: ''}

  </>
);
}
