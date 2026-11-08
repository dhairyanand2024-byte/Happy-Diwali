export interface Personal { senderName:string; receiverName:string; customWish:string; belated:boolean }
export const clean=(s:string|null|undefined,n:number)=>(s||'').replace(/[<>&"`\u0000-\u001f]/g,'').replace(/\s+/g,' ').trim().slice(0,n)
export function usePersonalization():Personal{
  const p=new URLSearchParams(location.search)
  return{senderName:clean(p.get('from'),40)||'Dhairy Anand',receiverName:clean(p.get('to'),40)||'Friend',customWish:clean(p.get('wish'),160),belated:p.get('late')!=='0'}
}
