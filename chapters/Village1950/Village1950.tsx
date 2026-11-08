import { useRef, useState } from 'react'
import StorySection from '../../components/StorySection/StorySection'
import { useCtx } from '../../features/interactions/ctx'
import { bell } from '../../features/interactions/audio'
export default function Village1950(){
  const {P}=useCtx();const [oil,setOil]=useState(0);const t=useRef<number>(0);const o=useRef(0)
  const pour=()=>{o.current=Math.min(100,o.current+2);setOil(o.current);const r=document.documentElement.style;r.setProperty('--f',String(1+o.current/250));r.setProperty('--g',String(1+o.current/90));if(o.current%20===0)bell(300+o.current*3,.5,.04)}
  const start=()=>{if(!t.current)t.current=window.setInterval(pour,50)},stop=()=>{clearInterval(t.current);t.current=0}
  return(<StorySection i={3} label="The 1950s"><div className="top rv"><p className="era">The 1950s</p><h2>A Mother’s Light.</h2><p className="line">Some traditions are never taught. They are simply passed from one pair of hands to another.</p><p className="line" style={{fontSize:'1rem'}}>Little {P.receiverName} steadies the lamp while Maa pours the oil.</p></div>
    <div className="bot"><p className="hint">Hold to pour the oil</p><div className="meter" aria-hidden="true"><i style={{width:oil+'%'}}/></div>
      <button className="btn" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onBlur={stop} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();for(let i=0;i<10;i++)pour()}}}>Pour oil</button>
      <div className="house" style={{['--o' as string]:oil/100}}><div className="row"><i/><i/><i/><i/><i/><i/></div></div></div></StorySection>)
}
