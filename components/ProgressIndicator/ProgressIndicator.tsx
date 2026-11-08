import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
gsap.registerPlugin(ScrollTrigger)
export default function ProgressIndicator(){
  const r=useRef<HTMLDivElement>(null)
  useEffect(()=>{const st=ScrollTrigger.create({start:0,end:'max',onUpdate:s=>{if(r.current)r.current.style.width=s.progress*100+'%'}});return()=>st.kill()},[])
  return <div className="prog" ref={r}/>
}
