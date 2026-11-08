import { useState } from 'react'
import StorySection from '../../components/StorySection/StorySection'
import { useCtx } from '../../features/interactions/ctx'
import { bell } from '../../features/interactions/audio'
export default function TretaYuga(){
  const {P,setDiya,pulse}=useCtx();const [on,setOn]=useState<boolean[]>(Array(5).fill(false));const n=on.filter(Boolean).length
  const light=(k:number)=>{if(on[k])return;setOn(o=>o.map((v,j)=>j===k||v));bell(520+(n+1)*90,1.6,.08);pulse();if(n+1===5)setDiya('intensifying')}
  return(<StorySection i={1} label="Treta Yuga"><div className="top rv"><p className="era">Treta Yuga</p><h2>The Night Ayodhya Became a Sky of Stars.</h2><p className="line">An entire kingdom waited for one homecoming. And when it came, the night became light.</p></div>
    <svg className={`vim${n===5?' go':''}`} viewBox="0 0 150 60" aria-hidden="true"><path d="M5 38c20-4 30-18 60-18s50 8 80 18c-30 10-60 14-80 14S25 48 5 38z" fill="#D9A441"/><path d="M60 22c4-14 24-14 30 0z" fill="#F5E9D0"/><path d="M30 38h90" stroke="#793D46" strokeWidth="3"/></svg>
    <div className="bot" style={{['--lit' as string]:n/5}}><p className="hint">{n===5?'The Pushpak Vimana returns.':`Tap the rooftops · ${n}/5`}</p><p className="line" style={{margin:0}}>{P.receiverName} stands among the citizens, a lamp in hand.</p>
      <div className="city"><div className="ayo-glow"/>{on.map((v,k)=><button key={k} className={`roof${v?' on':''}`} aria-label={`Light rooftop lamp ${k+1}`} onClick={()=>light(k)}><b/></button>)}</div></div></StorySection>)
}
