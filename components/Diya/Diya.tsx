import { useEffect, useState } from 'react'
const ST={unlit:[0,0],igniting:[.45,.5],burning:[1,1],intensifying:[1.2,1.35],passing:[1.1,1.15],finale:[1.45,1.9]} as const
export type DiyaState=keyof typeof ST
interface Props{state:DiyaState;pulseKey:number;ignited:boolean;onLight:()=>void}
export default function Diya({state,pulseKey,ignited,onLight}:Props){
  const [pl,setPl]=useState(false)
  useEffect(()=>{const r=document.documentElement.style;r.setProperty('--f',String(ST[state][0]));r.setProperty('--g',String(ST[state][1]))},[state])
  useEffect(()=>{if(!pulseKey)return;setPl(true);const t=setTimeout(()=>setPl(false),700);return()=>clearTimeout(t)},[pulseKey])
  const tap=state==='unlit'&&!ignited
  return(<div className={`diya${tap?' tap':''}${ignited?' ign':''}${pl?' pulse':''}`} {...(tap?{role:'button',tabIndex:0,'aria-label':'Light the diya',onClick:onLight,onKeyDown:(e:React.KeyboardEvent)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onLight()}}}:{})}>
    <div className="glow"/>
    <svg viewBox="0 0 100 140" aria-hidden="true">
      <g className="fl"><g><path d="M50 8C62 34 76 52 70 82c-3 14-12 20-20 20s-17-6-20-20C24 52 38 34 50 8z" fill="#FFB52E" opacity=".92"/></g><g><path d="M50 30c8 20 16 32 12 50-2 9-7 14-12 14s-10-5-12-14c-4-18 4-30 12-50z" fill="#FFD76A"/></g><g><path d="M50 56c4 10 7 16 5 26-1 5-3 8-5 8s-4-3-5-8c-2-10 1-16 5-26z" fill="#FFF6D6"/></g></g>
      <rect x="48" y="92" width="4" height="12" rx="2" fill="#3a2418"/>
      <path d="M6 102h88c0 22-18 34-44 34S6 124 6 102z" fill="#A65E3E"/>
      <path d="M6 102h88c-2 6-6 10-12 13H18c-6-3-10-7-12-13z" fill="#D9A441" opacity=".9"/>
      <path d="M18 116c20 8 44 8 64 0" stroke="#D9A441" strokeWidth="1.5" fill="none" opacity=".7"/>
    </svg><span className="spark"/></div>)
}
