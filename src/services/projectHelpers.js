
export const updateList = (projectList, projectId, updatedProject) => {
  return projectList.map(p => 
    p.id === projectId ? { ...updatedProject } : p
  );
};

/**
 * Updates project parameters with validation (mirrors C# UpdateParameters endpoint)
 * @param {Object} project - The project to update
 * @param {Object} dto - Data transfer object with updates
 * @returns {Object} { success: boolean, data: updatedProject or null, errors: string[] }
 */
export const updateProjectParameters = (project, dto) => {
  const errors = [];
  let anyChange = false;
  const updatedProject = { ...project };

  // Validate DTO
  if (!dto) {
    return { success: false, data: null, errors: ['Request body required.'] };
  }

  if (!project) {
    return { success: false, data: null, errors: ['Project not found.'] };
  }

  // Update Name if provided
  if (dto.name !== undefined && typeof dto.name === 'string') {
    const trimmed = dto.name.trim();
    if (trimmed !== '') {
      updatedProject.name = trimmed;
      anyChange = true;
    }
  }

  // Update Description if provided
  if (dto.description !== undefined && typeof dto.description === 'string') {
    const trimmed = dto.description.trim();
    if (trimmed !== '') {
      updatedProject.description = trimmed;
      anyChange = true;
    }
  }

  // Update WeavingWidthCm if provided
  if (dto.weavingWidthCm !== undefined && dto.weavingWidthCm !== null) {
    const value = Number(dto.weavingWidthCm);
    if (isNaN(value) || value <= 0) {
      errors.push('WeavingWidthCm must be > 0.');
    } else {
      updatedProject.weavingWidthCm = value;
      updatedProject.widthInput = true;
      updatedProject.endsInput = false;
      anyChange = true;
    }
  }

  // Update InputEndsInWarp if provided
  if (dto.inputEndsInWarp !== undefined && dto.inputEndsInWarp !== null) {
    const value = Number(dto.inputEndsInWarp);
    if (isNaN(value) || value <= 0) {
      errors.push('InputEndsInWarp must be > 0.');
    } else {
      updatedProject.inputEndsInWarp = value;
      updatedProject.endsInput = true;
      updatedProject.widthInput = false;
      anyChange = true;
    }
  }

  // Update EndsPerCm if provided
  if (dto.endsPerCm !== undefined && dto.endsPerCm !== null) {
    const value = Number(dto.endsPerCm);
    if (isNaN(value) || value <= 0) {
      errors.push('EndsPerCm must be > 0.');
    } else {
      updatedProject.endsPerCm = value;
      updatedProject.endsInput = false;
      anyChange = true;
    }
  }

  // Update PicksPerCm if provided
  if (dto.picksPerCm !== undefined && dto.picksPerCm !== null) {
    const value = Number(dto.picksPerCm);
    if (isNaN(value) || value < 0) {
      errors.push('PicksPerCm must be >= 0.');
    } else {
      updatedProject.picksPerCm = value;
      anyChange = true;
    }
  }

  // Update WarpLengthMeters if provided
  if (dto.warpLengthMeters !== undefined && dto.warpLengthMeters !== null) {
    const value = Number(dto.warpLengthMeters);
    if (isNaN(value) || value <= 0) {
      errors.push('WarpLengthMeters must be > 0.');
    } else {
      updatedProject.warpLengthMeters = value;
      anyChange = true;
    }
  }

  // Validation: Check for errors
  if (errors.length > 0) {
    return { success: false, data: null, errors };
  }

  // Validation: Ensure at least one change was made
  if (!anyChange) {
    return { success: false, data: null, errors: ['No updatable parameters provided.'] };
  }

  // Update timestamp
  updatedProject.lastUpdatedAt = new Date().toISOString();

  // Return as LoomProject instance so computed properties work
  return { success: true, data: new LoomProject(updatedProject), errors: [] };
}

export const deleteProject = (projectList, projectId) => {
  return projectList.filter(p => p.id !== projectId);
};


// utils/projectHelpers.js
export class LoomProject {
  constructor(data) {
    Object.assign(this, data);
  }

  get effectiveWeavingWidthCm() {
    if (this.widthInput && this.weavingWidthCm > 0) {
      return this.weavingWidthCm;
    }
    if (this.endsInput && this.endsPerCm > 0) {
      return this.inputEndsInWarp / this.endsPerCm;
    }
    return this.weavingWidthCm;
  }

  get endsInWarp() {
    if (this.endsInput && this.inputEndsInWarp > 0) {
      return this.inputEndsInWarp;
    }
    if (this.endsPerCm > 0 && this.effectiveWeavingWidthCm > 0) {
      return Math.round(this.endsPerCm * this.effectiveWeavingWidthCm);
    }
    return 0;
  }

  get calculatedWarpLengthMeters() {
    return this.endsInWarp * Math.ceil(this.warpLengthMeters);
  }

  get totalWeftLengthMeters() {
    if (this.picksPerCm > 0 && this.effectiveWeavingWidthCm > 0 && this.warpLengthMeters > 0) {
      return this.picksPerCm * this.effectiveWeavingWidthCm * this.warpLengthMeters;
    }
    return 0;
  }

  markStarted() {
    return new LoomProject({
      ...this,
      status: 1,
      startedAt: this.startedAt || new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    });
  }

  markFinished() {
    return new LoomProject({
      ...this,
      status: 3,
      finishedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    });
  }

  updateTimestamp() {
    return new LoomProject({
      ...this,
      lastUpdatedAt: new Date().toISOString(),
    });
  }
}

export const useClearAtoms = () => {
      // Clear all localStorage entries used by atomWithStorage
  localStorage.removeItem('projectList');
  localStorage.removeItem('project');
  localStorage.removeItem('warp');
  localStorage.removeItem('weft');
}