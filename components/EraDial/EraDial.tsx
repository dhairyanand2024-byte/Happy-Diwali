import { eras } from '../../data/chapters'
export default function EraDial({active}:{active:number}){
  return(<nav className="dial" aria-label="Eras">{eras.map(([n,i])=>(
    <button key={i} className={active===i?'on':''} aria-label={`Go to ${n}`} onClick={()=>document.getElementById('c'+i)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}><span>{n}</span><i/></button>))}</nav>)
}
