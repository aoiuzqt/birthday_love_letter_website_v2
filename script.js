const tracks=[
 {title:"Song 01",artist:"Replace with your song",file:"assets/music/song01.mp3"},
 {title:"Song 02",artist:"Replace with your song",file:"assets/music/song02.mp3"},
 {title:"Song 03",artist:"Replace with your song",file:"assets/music/song03.mp3"}
];
const songs=document.querySelector("#songs"),enter=document.querySelector("#enter"),hint=document.querySelector("#hint"),audio=document.querySelector("#audio");
const site=document.querySelector("#site"),intro=document.querySelector("#intro"),player=document.querySelector("#player");
let selected=null;
tracks.forEach((t,i)=>{const el=document.createElement("div");el.className="song";el.innerHTML=`<span class="no">0${i+1}</span><div><strong>${t.title}</strong><small>${t.artist}</small></div><span class="sel">SELECT</span>`;el.onclick=()=>{document.querySelectorAll(".song").forEach(x=>x.classList.remove("selected"));document.querySelectorAll(".sel").forEach(x=>x.textContent="SELECT");el.classList.add("selected");el.querySelector(".sel").textContent="SELECTED";selected=t;enter.disabled=false;hint.textContent="your soundtrack is ready"};songs.appendChild(el)});
enter.onclick=async()=>{if(!selected)return;audio.src=selected.file;document.querySelector("#track").textContent=`${selected.title} — ${selected.artist}`;try{await audio.play()}catch(e){}intro.style.transition="opacity 1.1s";intro.style.opacity="0";setTimeout(()=>{intro.remove();site.classList.remove("hidden");player.classList.add("show");reveal()},1100)};
document.querySelector("#playPause").onclick=()=>audio.paused?audio.play():audio.pause();
document.querySelector("#mute").onclick=()=>{audio.muted=!audio.muted;document.querySelector("#mute").textContent=audio.muted?"MUTE":"VOL"};
document.querySelector("#musicToggle").onclick=()=>player.classList.toggle("show");
audio.onended=()=>audio.currentTime=0;
audio.ontimeupdate=()=>{if(audio.duration)document.querySelector("#progress").style.width=(audio.currentTime/audio.duration*100)+"%"};
const cursor=document.querySelector(".cursor");window.addEventListener("pointermove",e=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px"});
function reveal(){
 const targets=document.querySelectorAll(".hero-copy,.hero-frame,.exhibit-title,.exhibit-note,.poem-image,.poem-copy,.quiet-copy,.cinema-copy,.mem-title,.memory-grid article,.collage-heading,.collage-card,.video>div,.letter-copy,.request-content,.magic-letter-copy,.ending>*:not(.ending-flower)");
 const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("is-visible");io.unobserve(entry.target)}
 }),{threshold:.14});
 targets.forEach((target,index)=>{target.classList.add("reveal");target.style.setProperty("--reveal-delay",`${(index%4)*110}ms`);io.observe(target)});
 const envelope=document.querySelector(".envelope-link");
 if(envelope){const envelopeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("magic-arrived");envelopeObserver.unobserve(entry.target)}}),{threshold:.35});envelopeObserver.observe(envelope)}
}
document.body.style.overflow="hidden";

// Re-enable scrolling after the intro is dismissed.
enter.addEventListener("click",()=>{
  if(!selected)return;
  setTimeout(()=>{document.body.style.overflow=""},1100);
});

const flowerForm=document.querySelector("#flowerForm");
if(flowerForm){flowerForm.addEventListener("submit",event=>{event.preventDefault();const address=document.querySelector("#address").value.trim();if(!address)return;document.querySelector("#flowerMessage").textContent="A little hint has been tucked away. Flowers may be on their way. ✽";flowerForm.reset()})}
