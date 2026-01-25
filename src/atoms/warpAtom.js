import { atomWithStorage } from "jotai/utils";
import { defaultWarp } from "../constants/yarnConstants";


export const warpAtom = atomWithStorage('warp', defaultWarp);