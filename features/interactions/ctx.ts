import { createContext, useContext } from 'react'
import type { Personal } from '../../hooks/usePersonalization'
import type { DiyaState } from '../../components/Diya/Diya'
export interface Ctx{P:Personal;setDiya:(s:DiyaState)=>void;pulse:()=>void}
export const AppCtx=createContext<Ctx>(null!)
export const useCtx=()=>useContext(AppCtx)
