// Answer checking and the built-in (offline) math generators.
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

export function toNum(s){
  s=String(s).trim().toLowerCase().replace(/[$,]/g,"").replace(/\s*[a-z°]+$/,"").replace(/−/g,"-");
  let m;
  if((m=s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/))){const w=+m[1];const v=Math.abs(w)+(+m[2])/(+m[3]);return w<0?-v:v}
  s=s.replace(/\s+/g,"");
  if(s==="")return null;
  let pct=false;if(s.endsWith("%")){pct=true;s=s.slice(0,-1)}
  if((m=s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/)))return (+m[2])?(+m[1])/(+m[2]):null;
  if(/^-?\d*\.?\d+(e-?\d+)?$/.test(s)){const v=+s;return pct?v/100:v}
  return null;
}
export function normText(s){return String(s).trim().toLowerCase().replace(/\s+/g," ").replace(/[.!]$/,"").replace(/^(x|y|n|a)\s*=\s*/,"")}
export function isCorrect(given,prob){
  const targets=[prob.answer,...(prob.accept||[])].map(String);
  const g=String(given).trim(); if(!g)return false;
  const gns=[toNum(g),toNum(g.replace("%",""))].filter(x=>x!==null);
  for(const t of targets){
    const tn=toNum(t);
    if(tn!==null&&gns.some(gn=>Math.abs(gn-tn)<=1e-6*Math.max(1,Math.abs(tn))))return true;
    if(normText(g)===normText(t))return true;
    if(normText(g).replace(/[^a-z0-9.\/:-]/g,"")===normText(t).replace(/[^a-z0-9.\/:-]/g,"")&&normText(t).replace(/[^a-z0-9]/g,"").length>0)return true;
  }
  return false;
}


export function localProblems(op,lvl,n=5){
  const out=[];for(let i=0;i<n;i++)out.push(localOne(op,lvl));return out;
}
export function localOne(op,lvl){
  let a,b,q,ans,steps;
  switch(op){
    case"add10":a=rnd(0,5+lvl);b=rnd(0,10-a);q=`${a} + ${b} = ?`;ans=a+b;steps=[`Start at ${a}.`,`Count up ${b} more: ${Array.from({length:b},(_,i)=>a+i+1).join(", ")||"(nothing to add)"}.`,`You land on ${ans}.`];break;
    case"sub10":a=rnd(3,10);b=rnd(0,a);q=`${a} − ${b} = ?`;ans=a-b;steps=[`Start with ${a}.`,`Take away ${b}, counting back: ${Array.from({length:b},(_,i)=>a-i-1).join(", ")||"(nothing to take)"}.`,`${ans} are left.`];break;
    case"add20":a=rnd(4,12);b=rnd(3,20-a);q=`${a} + ${b} = ?`;ans=a+b;{const t=10-a;steps=t>0&&t<b?[`Make a ten: ${a} needs ${t} more to reach 10.`,`Split ${b} into ${t} and ${b-t}.`,`10 + ${b-t} = ${ans}.`]:[`Start at ${a} and count up ${b}.`,`${a} + ${b} = ${ans}.`]}break;
    case"sub20":a=rnd(11,20);b=rnd(2,9);q=`${a} − ${b} = ?`;ans=a-b;{const t=a-10;steps=b>t?[`Take ${t} away first to get to 10: ${a} − ${t} = 10.`,`You still need to take ${b-t} more.`,`10 − ${b-t} = ${ans}.`]:[`Ones: ${t} − ${b} = ${t-b}.`,`Keep the ten: 10 + ${t-b} = ${ans}.`]}break;
    case"add100":if(Math.random()<.5){a=rnd(12,60);b=rnd(11,99-a);q=`${a} + ${b} = ?`;ans=a+b;steps=[`Add the tens: ${a-a%10} + ${b-b%10} = ${a-a%10+b-b%10}.`,`Add the ones: ${a%10} + ${b%10} = ${a%10+b%10}.`,`Put them together: ${a-a%10+b-b%10} + ${a%10+b%10} = ${ans}.`]}else{a=rnd(40,99);b=rnd(11,a-5);q=`${a} − ${b} = ?`;ans=a-b;steps=[`Take away the tens: ${a} − ${b-b%10} = ${a-(b-b%10)}.`,`Take away the ones: ${a-(b-b%10)} − ${b%10} = ${ans}.`]}break;
    case"mulfacts":a=rnd(2,lvl>1?12:9);b=rnd(2,lvl>2?12:9);q=`${a} × ${b} = ?`;ans=a*b;steps=[`${a} × ${b} means ${b} groups of ${a}.`,b>5?`Split it: ${a} × 5 = ${a*5} and ${a} × ${b-5} = ${a*(b-5)}.`:`Skip count by ${a}: ${Array.from({length:b},(_,i)=>a*(i+1)).join(", ")}.`,`${a} × ${b} = ${ans}.`];break;
    case"divfacts":b=rnd(2,lvl>1?12:9);ans=rnd(2,lvl>2?12:9);a=b*ans;q=`${a} ÷ ${b} = ?`;steps=[`Ask: how many groups of ${b} make ${a}?`,`Think of the fact family: ${b} × ? = ${a}.`,`${b} × ${ans} = ${a}, so ${a} ÷ ${b} = ${ans}.`];break;
    case"multimul":a=rnd(12,lvl>1?99:49)*(lvl>2?10:1)+rnd(0,9)*(lvl>2?1:0);b=rnd(3,lvl>1?19:9);q=`${a} × ${b} = ?`;ans=a*b;{const t=a-a%10,o=a%10;steps=[`Break ${a} into ${t} + ${o}.`,`${t} × ${b} = ${t*b}.`,`${o} × ${b} = ${o*b}.`,`Add them: ${t*b} + ${o*b} = ${ans}.`]}break;
    case"longdiv":b=rnd(3,9);ans=rnd(12,lvl>1?99:40);a=b*ans;q=`${a} ÷ ${b} = ?`;{const t=Math.floor(ans/10)*10;steps=[`Find a big chunk: ${b} × ${t} = ${b*t}.`,`What is left: ${a} − ${b*t} = ${a-b*t}.`,`${a-b*t} ÷ ${b} = ${ans-t}.`,`Add the parts: ${t} + ${ans-t} = ${ans}.`]}break;
    case"int":default:a=rnd(-12,12);b=rnd(-12,12);if(Math.random()<.5){q=`${a} + (${b}) = ?`;ans=a+b;steps=[`Start at ${a} on the number line.`,b>=0?`Adding ${b} moves ${b} steps right.`:`Adding ${b} moves ${-b} steps left.`,`You land on ${ans}.`]}else{q=`${a} − (${b}) = ?`;ans=a-b;steps=[`Subtracting a number is the same as adding its opposite.`,`${a} − (${b}) = ${a} + (${-b}).`,`Start at ${a} and move ${Math.abs(b)} steps ${-b>=0?"right":"left"}: ${ans}.`]}
  }
  return {question:q,answer:String(ans),accept:[],type:"number",steps,hint:steps[0]};
}

