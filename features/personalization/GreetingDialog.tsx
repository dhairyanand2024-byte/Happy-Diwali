import { forwardRef, useState } from 'react'
import { clean } from '../../hooks/usePersonalization'
const GreetingDialog=forwardRef<HTMLDialogElement>((_,ref)=>{
  const [f,setF]=useState(''),[t,setT]=useState(''),[w,setW]=useState(''),[out,setOut]=useState(''),[cp,setCp]=useState(false)
  const link=()=>{const p=new URLSearchParams();const a=clean(f,40),b=clean(t,40),c=clean(w,160);if(a)p.set('from',a);if(b)p.set('to',b);if(c)p.set('wish',c);const u=`${location.origin}${location.pathname}?${p}`;setOut(u);return u}
  const canShare=typeof navigator!=='undefined'&&!!navigator.share
  return(<dialog ref={ref} aria-labelledby="dt"><form method="dialog"><h3 id="dt">Pass the Light Forward</h3>
    <label htmlFor="iF">Your name</label><input id="iF" maxLength={40} value={f} onChange={e=>setF(e.target.value)}/>
    <label htmlFor="iT">Their name</label><input id="iT" maxLength={40} value={t} onChange={e=>setT(e.target.value)}/>
    <label htmlFor="iW">Your personal wish</label><textarea id="iW" rows={3} maxLength={160} value={w} onChange={e=>setW(e.target.value)}/>
    <div className="pv" aria-live="polite">Dear {clean(t,40)||'Friend'}, {clean(w,160)||'this light has travelled through centuries to reach you.'} With love, {clean(f,40)||'you'}.</div>
    <div className="acts"><button type="button" className="btn" onClick={link}>Generate link</button>
      <button type="button" className="btn" onClick={async()=>{const u=link();try{await navigator.clipboard.writeText(u);setCp(true);setTimeout(()=>setCp(false),2000)}catch{}}}>{cp?'Copied ✓':'Copy'}</button>
      {canShare&&<button type="button" className="btn" onClick={()=>navigator.share({title:'A light for you',text:'This light has travelled through centuries to reach you.',url:link()}).catch(()=>{})}>Share</button>}
      <button className="btn" value="x">Close</button></div><p className="out">{out}</p></form></dialog>)
})
export default GreetingDialog
