import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import Diya, { type DiyaState } from '../components/Diya/Diya'
import EraDial from '../components/EraDial/EraDial'
import ProgressIndicator from '../components/ProgressIndicator/ProgressIndicator'
import AudioController from '../components/AudioController/AudioController'
import { AppCtx } from '../features/interactions/ctx'
import { bell, track } from '../features/interactions/audio'
import { usePersonalization } from '../hooks/usePersonalization'
import { useActiveChapter } from '../hooks/useActiveChapter'
import Prologue from '../chapters/Prologue/Prologue'
import TretaYuga from '../chapters/TretaYuga/TretaYuga'
import RoyalIndia from '../chapters/RoyalIndia/RoyalIndia'
import Village1950 from '../chapters/Village1950/Village1950'
import Nineties from '../chapters/Nineties/Nineties'
import Today from '../chapters/Today/Today'
import Finale from '../chapters/Finale/Finale'
export default function App(){
  const P=usePersonalization();const active=useActiveChapter()
  const [ds,setDs]=useState<DiyaState>('unlit'),[ign,setIgn]=useState(false),[lit,setLit]=useState(false),[pk,setPk]=useState(0)
  const pulse=useCallback(()=>setPk(k=>k+1),[])
  const ctx=useMemo(()=>({P,setDiya:setDs,pulse}),[P,pulse])
  useEffect(()=>{document.body.classList.toggle('lock',!lit);document.body.classList.toggle('lit',lit);document.body.classList.toggle('warm',active===3)},[lit,active])
  useEffect(()=>{track(active);if(!lit)return;setDs(active===6?'finale':'burning');pulse()},[active,lit,pulse])
  useEffect(()=>{document.title=P.receiverName!=='Friend'?`A light for ${P.receiverName} — One Night, Many Ages`:document.title},[P])
  const ignite=()=>{if(ign)return;setIgn(true);bell(1046,2.6,.14);setDs('igniting');setTimeout(()=>{setDs('burning');setLit(true)},900)
    setTimeout(()=>document.getElementById('c1')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'}),3200)}
  return(<AppCtx.Provider value={ctx}>
    <ProgressIndicator/><div className="bgs" aria-hidden="true">{[0,1,2,3,4,5,6].map(i=><div key={i} className={`bg b${i}${active===i?' on':''}`}/>)}</div><div className="grain" aria-hidden="true"/>
    <Diya state={ds} pulseKey={pk} ignited={ign} onLight={ignite}/><EraDial active={active}/><AudioController/>
    <main><Prologue/><TretaYuga/><RoyalIndia/><Village1950/><Nineties/><Today/><Finale/></main></AppCtx.Provider>)
}
