import { atomWithStorage } from "jotai/utils";

// Default LoomProject object matching the C# LoomProject class structure
export const defaultLoomProject = {
  // Identifiers
  id: '',
  name: '',
  description: null,

  // Weaving dimensions (units clarified in property names)
  weavingWidthCm: 0,                    // width of the woven fabric, in centimeters
  widthInput: true,                     // true if width is specified, false if left to be calculated
  warpLengthMeters: 0,                  // planned warp length, in meters
  
  inputEndsInWarp: 0,                   // number of ends (threads) in the warp, if specified directly
  endsInput: false,                     // true if ends is specified, false if left to be calculated

  // Thread density
  endsPerCm: 0,                         // ends (warp threads) per centimeter
  picksPerCm: 0,                        // picks (weft picks) per centimeter

  // Administrative metadata
  status: 0,                            // ProjectStatus.Planned = 0
  createdAt: new Date().toISOString(),
  startedAt: null,
  lastUpdatedAt: new Date().toISOString(),
  finishedAt: null,
};

export const currentProjectAtom = atomWithStorage('project', defaultLoomProject);