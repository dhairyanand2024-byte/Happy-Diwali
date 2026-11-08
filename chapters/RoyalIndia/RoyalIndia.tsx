import { useRef, useState } from 'react'
import StorySection from '../../components/StorySection/StorySection'
import { useCtx } from '../../features/interactions/ctx'
export default function RoyalIndia(){
  const {pulse}=useCtx();const rv=useRef<HTMLDivElement>(null),lp=useRef<HTMLDivElement>(null),last=useRef(0);const [drag,setDrag]=useState(false);const [val,setVal]=useState(10)
  const move=(x:number)=>{const r=rv.current!.getBoundingClientRect(),p=Math.max(0,Math.min(1,(x-r.left-27)/(r.width-54)));lp.current!.style.left=p*(r.width-54)+'px';setVal(Math.round(p*100))
    if(Date.now()-last.current>90){last.current=Date.now();const s=document.createElement('span');s.className='rip';s.style.left=p*(r.width-54)+27+'px';s.style.top=lp.current!.offsetTop+44+'px';s.onanimationend=()=>s.remove();rv.current!.appendChild(s)}}
  return(<StorySection i={2} label="Royal India"><div className="top rv"><p className="era">Royal India</p><h2>The Light Finds a River.</h2><p className="line">Kingdoms changed. Rivers flowed. But the light always found its way.</p></div>
    <div className="bot"><p className="hint">Drag the floating lamp across the river</p><div className="river" ref={rv}>
      {[[30,20,0],[58,70,-1],[80,30,-2]].map(([l,t,d],k)=><span key={k} className="fl2" style={{left:l+'%',top:t+'%',animationDelay:d+'s'}}/>)}
      <div className="lamp" ref={lp} role="slider" tabIndex={0} aria-label="Floating lamp" aria-valuemin={0} aria-valuemax={100} aria-valuenow={val} style={{cursor:drag?'grabbing':'grab'}}
        onPointerDown={e=>{setDrag(true);e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>drag&&move(e.clientX)} onPointerUp={()=>{setDrag(false);pulse()}}
        onKeyDown={e=>{const c=lp.current!.getBoundingClientRect();if(e.key==='ArrowRight')move(c.left+57);if(e.key==='ArrowLeft')move(c.left-3)}}/></div></div></StorySection>)
}
