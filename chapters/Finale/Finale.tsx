import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StorySection from '../../components/StorySection/StorySection'
import GreetingDialog from '../../features/personalization/GreetingDialog'
import { useCtx } from '../../features/interactions/ctx'
import { bell } from '../../features/interactions/audio'
const lamps:[string,number][]=[['Treta',12],['Royal',26],['1950s',40],['1990s',60],['Today',74]]
export default function Finale(){
  const {P}=useCtx();const dlg=useRef<HTMLDialogElement>(null);const fa=useRef<HTMLDivElement>(null)
  useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){fa.current!.classList.add('in');bell(784,3,.1)}},{threshold:.4});io.observe(fa.current!)
    const st=ScrollTrigger.create({trigger:'.fb',start:'top 70%',end:'bottom 30%',onToggle:s=>document.documentElement.style.setProperty('--dy',s.isActive?'20%':'50%')});return()=>{io.disconnect();st.kill()}},[])
  return(<StorySection i={6} className="" label="Tomorrow"><div className="fa" ref={fa}><div className="col"/>
    <div className="top rv" style={{position:'absolute',top:'11svh',left:0,right:0,margin:'auto',padding:'0 24px'}}><p className="era">Tomorrow</p><h2>The Light Continues.</h2></div>
    {lamps.map(([n,y],k)=><div key={n} className="ml" style={{top:y+'%',transitionDelay:k*.6+.4+'s'}}><em>{n}</em></div>)}</div>
    <div className="fb"><p className="rv" style={{fontSize:'1rem',color:'var(--gold)',letterSpacing:'.2em',textTransform:'uppercase'}}>The same light. A thousand memories.</p>
      <div className="nm rv">{P.receiverName}</div>
      <p className="rv">This light travelled through centuries, across kingdoms, through childhood memories and across distances.</p>
      <p className="rv">And now, it has reached you.</p>
      {P.belated&&<p className="rv wish">Diwali may have slipped by a night — but light has never kept a calendar, and love has never needed to be on time.</p>}
      {P.customWish&&<p className="rv wish">“{P.customWish}”</p>}
      <p className="rv">May your life always find its way towards happiness, peace, and light.</p>
      <div className="hd rv">{P.belated?'Belated Happy Diwali.':'Happy Diwali.'}</div>
      <p className="rv" style={{color:'var(--amber)'}}>With love, {P.senderName}.</p>
      <button className="btn rv" onClick={()=>dlg.current?.showModal()}>Pass the Light Forward</button><p style={{fontSize:'.7rem',opacity:.55,marginTop:24,lineHeight:1.6}}>Music: “Transcendental Meditation”, “India Chill” and “Welcome To India” by Steve Oxen, via FesliyanStudios.com</p></div>
    <GreetingDialog ref={dlg}/></StorySection>)
}
