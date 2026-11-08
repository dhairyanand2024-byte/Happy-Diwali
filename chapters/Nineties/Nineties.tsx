import { useEffect, useRef } from 'react'
import StorySection from '../../components/StorySection/StorySection'
import { useCtx } from '../../features/interactions/ctx'
import { bell } from '../../features/interactions/audio'
type Pt={x:number;y:number;vx:number;vy:number;l:number;c:string}
export default function Nineties(){
  const {P}=useCtx();const cv=useRef<HTMLCanvasElement>(null);const ps=useRef<Pt[]>([]);const run=useRef(false)
  const ctx=()=>cv.current!.getContext('2d')!
  useEffect(()=>{const f=()=>{const d=Math.min(devicePixelRatio||1,2),r=cv.current!.getBoundingClientRect();cv.current!.width=r.width*d;cv.current!.height=r.height*d;ctx().setTransform(d,0,0,d,0,0)};f();addEventListener('resize',f);return()=>removeEventListener('resize',f)},[])
  const tick=()=>{const g=ctx(),r=cv.current!.getBoundingClientRect();g.fillStyle='rgba(30,10,20,.18)';g.fillRect(0,0,r.width,r.height);ps.current=ps.current.filter(p=>p.l>0)
    ps.current.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.l-=.025;g.globalAlpha=Math.max(p.l,0);g.fillStyle=p.c;g.beginPath();g.arc(p.x,p.y,1.8,0,7);g.fill()});g.globalAlpha=1
    if(ps.current.length)requestAnimationFrame(tick);else{run.current=false;g.clearRect(0,0,r.width,r.height)}}
  const emit=(x:number,y:number,n=3)=>{const m=Math.min(n,matchMedia('(max-width:700px)').matches?3:5);for(let i=0;i<m;i++)ps.current.push({x,y,vx:(Math.random()-.5)*2.4,vy:(Math.random()-.9)*2,l:1,c:Math.random()<.5?'#FFB52E':'#F5E9D0'});if(!run.current){run.current=true;requestAnimationFrame(tick)}}
  const at=(e:React.PointerEvent):[number,number]=>{const r=cv.current!.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]}
  const write=()=>{const r=cv.current!.getBoundingClientRect(),o=document.createElement('canvas');o.width=r.width;o.height=r.height;const x=o.getContext('2d')!;x.font=`700 ${Math.min(r.height*.8,220)}px Georgia,serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(P.receiverName[0].toUpperCase(),r.width/2,r.height/2)
    const d=x.getImageData(0,0,o.width,o.height).data,pts:number[][]=[];for(let y=0;y<o.height;y+=7)for(let xx=0;xx<o.width;xx+=7)if(d[(y*o.width+xx)*4+3]>128)pts.push([xx,y]);pts.sort((a,b)=>a[0]-b[0]||a[1]-b[1])
    let i=0;const t=setInterval(()=>{for(let k=0;k<4&&i<pts.length;k++,i++)emit(pts[i][0],pts[i][1],2);if(i>=pts.length)clearInterval(t)},30);bell(1200,.6,.05)}
  return(<StorySection i={4} label="The 1990s"><div className="top rv"><p className="era">The 1980s – 1990s</p><h2>The Good Old Days.</h2><p className="line">Back then, the only notification was your mom shouting that the diyas were ready.</p></div>
    <div className="bot"><p className="hint">Wave a sparkler · or let it write</p><canvas className="cv" ref={cv} aria-label="Sparkler canvas" onPointerMove={e=>emit(...at(e))} onPointerDown={e=>{emit(...at(e),12);bell(1400,.25,.04)}}/>
      <div style={{display:'flex',gap:14,alignItems:'center',flexWrap:'wrap',justifyContent:'center'}}><button className="btn" onClick={write}>Write my initial</button><span className="card">Shubh Deepavali, {P.receiverName}!</span></div></div></StorySection>)
}
