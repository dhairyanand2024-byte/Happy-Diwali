import { useEffect, useRef, useState } from 'react'
import StorySection from '../../components/StorySection/StorySection'
import { useCtx } from '../../features/interactions/ctx'
import { bell } from '../../features/interactions/audio'
export default function Today(){
  const {P,setDiya,pulse}=useCtx();const [shown,setShown]=useState<[string,boolean][]>([]);const ref=useRef<HTMLDivElement>(null);const sent=useRef(false)
  const msgs:[string,boolean][]=[['Happy Diwali!',false],[`Wish you were here, ${P.receiverName}.`,false],['Sending a little light your way.',false],[P.customWish||(P.belated?'Belated Happy Diwali! Sorry I’m a day late — the light took its time to reach you.':'May this light find you, wherever you are.'),true]]
  useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(!e.isIntersecting||sent.current)return;sent.current=true
    msgs.forEach((m,k)=>setTimeout(()=>{setShown(s=>[...s,m]);bell(1320,.5,.05);pulse();setDiya('passing')},900+k*1500));setTimeout(()=>setDiya('burning'),900+msgs.length*1500+600)},{threshold:.5});io.observe(ref.current!);return()=>io.disconnect()},[])
  return(<StorySection i={5} label="Today"><div className="top rv"><p className="era">Today</p><h2>Miles Apart, Never Far Away.</h2><p className="line">Distances grew. The world changed. But the light still finds the people we love.</p></div>
    <div className="bot" ref={ref}><div className="phone" aria-live="polite">{shown.map(([t,me],k)=><div key={k} className={`msg${me?' me':''}`}>{t}</div>)}</div></div></StorySection>)
}
