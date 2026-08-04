
const PASSWORD="05.08.2016";
const VIDEO_URL="https://drive.google.com/file/d/1IoP-NoLq9qpe8f0IwHhyxscEq-Ry-aIs/view?usp=drivesdk";
const views=["login","validation","access","certificate"].reduce((a,id)=>(a[id]=document.getElementById(id),a),{});
const dateInput=document.getElementById("date"),error=document.getElementById("login-error"),log=document.getElementById("log");
function show(id){Object.values(views).forEach(v=>v.classList.remove("active"));views[id].classList.add("active");scrollTo({top:0,behavior:"smooth"})}
function fmt(v){const d=v.replace(/\D/g,"").slice(0,8);if(d.length<=2)return d;if(d.length<=4)return d.slice(0,2)+"."+d.slice(2);return d.slice(0,2)+"."+d.slice(2,4)+"."+d.slice(4)}
dateInput.addEventListener("input",e=>{e.target.value=fmt(e.target.value);error.textContent=""});
document.getElementById("login-form").addEventListener("submit",e=>{e.preventDefault();if(dateInput.value!==PASSWORD){error.textContent="Authentication failed. Certificate access denied.";return}show("validation");validate()});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function validate(){const s=[["Authenticating credentials","Credentials verified"],["Building certificate chain","Trusted Root found"],["Checking certificate integrity","Signature valid"],["Reviewing revocation status","Certificate not revoked"],["Running 10-year infrastructure audit","Audit passed"],["Loading secure document","Certificate ready"]];log.innerHTML="";for(const [a,b] of s){log.innerHTML+=`<div>> ${a}...</div>`;await wait(380);log.innerHTML+=`<div class="log-ok">✓ ${b}</div>`;await wait(260)}await wait(450);show("access")}
document.getElementById("open-cert").addEventListener("click",()=>show("certificate"));

const overlay=document.getElementById("decrypt-overlay"),status=document.getElementById("decrypt-status"),bar=document.getElementById("progress-bar"),attachment=document.getElementById("attachment");
attachment.addEventListener("click",async()=>{
  overlay.classList.add("show");overlay.setAttribute("aria-hidden","false");bar.style.width="12%";status.textContent="Decrypting attachment...";
  await wait(1100);bar.style.width="38%";status.textContent="Signature verified...";
  await wait(1100);bar.style.width="68%";status.textContent="Integrity check passed...";
  await wait(1100);bar.style.width="100%";status.textContent="Opening personal message...";
  await wait(900);
  window.open(VIDEO_URL,"_blank","noopener");
  overlay.classList.remove("show");overlay.setAttribute("aria-hidden","true");bar.style.width="0";
});
