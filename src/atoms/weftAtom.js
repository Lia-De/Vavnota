import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { defaultWeft } from "../constants/yarnConstants";

export const weftAtom = atomWithStorage('weft', defaultWeft)