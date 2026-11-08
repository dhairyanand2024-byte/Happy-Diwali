import { trackFor } from '../../data/chapters'
import m from '../../assets/audio/meditation.mp3'
import s from '../../assets/audio/sitar.mp3'
import c from '../../assets/audio/indiachill.mp3'
import b from '../../assets/audio/bollywood.mp3'
import w from '../../assets/audio/welcome.mp3'
const urls=[m,s,c,b,w]
let on=false,ctx:AudioContext|undefined,tr:HTMLAudioElement[]=[],ti=-1,cur=0
type A=HTMLAudioElement&{_f?:number}
export function bell(f=880,d=2.2,v=.12){if(!on)return;try{const AC=window.AudioContext||(window as any).webkitAudioContext;ctx=ctx||new AC();const o=ctx!.createOscillator(),g=ctx!.createGain();o.frequency.value=f;g.gain.setValueAtTime(v,ctx!.currentTime);g.gain.exponentialRampToValueAtTime(.0001,ctx!.currentTime+d);o.connect(g).connect(ctx!.destination);o.start();o.stop(ctx!.currentTime+d)}catch{}}
function fade(a:A,to:number,stop?:boolean){clearInterval(a._f);a._f=window.setInterval(()=>{const d=to-a.volume;if(Math.abs(d)<.03){a.volume=to;clearInterval(a._f);if(stop)a.pause()}else a.volume=Math.max(0,Math.min(1,a.volume+Math.sign(d)*.03))},80)}
export function track(n:number){cur=n;const k=trackFor[n];if(!on||k===ti)return;ti=k;tr.forEach((a,i)=>{if(i===k){a.volume=0;a.play().catch(()=>{});fade(a,.5)}else fade(a,0,true)})}
export function setSound(v:boolean){on=v;if(v){if(!tr.length)tr=urls.map(u=>{const a=new Audio(u);a.loop=true;return a});ti=-1;track(cur);bell(660,1.5)}else tr.forEach(a=>fade(a,0,true))}
