import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as l,i as f}from"./assets/vendor-651d7991.js";const n=document.querySelector("button[data-start]"),h=document.querySelector("[data-days]"),y=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),T=document.querySelector("[data-seconds]");let a;const S=new Date;n.disabled=!0;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:function(t){a=t[0],a.getTime()<=S.getTime()?(f.error({title:"Error",message:"Please choose a date in the future",position:"topCenter"}),n.disabled=!0):n.disabled=!1}};n.addEventListener("click",()=>{n.disabled=!0;const t=setInterval(s=>{const o=a.getTime()-Date.now();if(o<=0){clearInterval(t),c(0);return}const e=D(o);c(e.days,e.hours,e.minutes,e.seconds)},1e3)});function D(t){const i=Math.floor(t/864e5),u=Math.floor(t%864e5/36e5),d=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:u,minutes:d,seconds:m}}function c(t,s,o,e){h.textContent=r(t),y.textContent=r(s),p.textContent=r(o),T.textContent=r(e)}function r(t){return String(t).padStart(2,"0")}l("#datetime-picker",b);
//# sourceMappingURL=commonHelpers.js.map