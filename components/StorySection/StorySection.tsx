import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
interface Props{i:number;children:ReactNode;label?:string;className?:string}
export default function StorySection({i,children,label,className='ch'}:Props){
  const r=useRef<HTMLElement>(null)
  useLayoutEffect(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return
    const c=gsap.context(()=>{r.current!.querySelectorAll('.rv').forEach(el=>gsap.from(el,{opacity:0,y:24,duration:1.3,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}}))},r);return()=>c.revert()},[])
  return <section ref={r} className={className} id={`c${i}`} data-i={i} aria-label={label}>{children}</section>
}
