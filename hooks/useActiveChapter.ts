import { useEffect, useState } from 'react'
export function useActiveChapter(){
  const [a,setA]=useState(0)
  useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setA(+(e.target as HTMLElement).dataset.i!)}),{rootMargin:'-45% 0px -45% 0px'})
    document.querySelectorAll('main>section').forEach(s=>io.observe(s));return()=>io.disconnect()},[])
  return a
}
