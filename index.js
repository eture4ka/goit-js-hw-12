import{a as q,S as B,i as c}from"./assets/vendor-73qhTu8_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const $="ВАШ_КЛЮЧ",E="https://pixabay.com/api/";async function m(n,t){return(await q.get(E,{params:{key:$,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}const y=document.querySelector(".gallery"),h=document.querySelector(".loader"),g=document.querySelector(".load-more"),M=new B(".gallery a",{captionsData:"alt",captionDelay:250});function p(n){const t=n.map(({webformatURL:o,largeImageURL:i,tags:e,likes:r,views:a,comments:v,downloads:P})=>`
      <li class="gallery-item">
        <a href="${i}">
          <img src="${o}" alt="${e}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${r}</p>
          <p><b>Views</b> ${a}</p>
          <p><b>Comments</b> ${v}</p>
          <p><b>Downloads</b> ${P}</p>
        </div>
      </li>
    `).join("");y.insertAdjacentHTML("beforeend",t),M.refresh()}function O(){y.innerHTML=""}function L(){h.classList.remove("is-hidden")}function b(){h.classList.add("is-hidden")}function w(){g.classList.remove("is-hidden")}function l(){g.classList.add("is-hidden")}const f=document.querySelector(".form"),_=document.querySelector(".load-more");let d="",s=1,u=0;const S=15;f.addEventListener("submit",async n=>{n.preventDefault();const t=f.elements["search-text"].value.trim();if(t){d=t,s=1,O(),l(),L();try{const o=await m(d,s);if(u=o.totalHits,o.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}p(o.hits),s*S<u&&w()}catch{c.error({message:"Something went wrong. Please try again!"})}finally{b()}}});_.addEventListener("click",async()=>{s+=1,L(),l();try{const n=await m(d,s);p(n.hits);const t=document.querySelector(".gallery-item");if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}s*S>=u?(l(),c.info({message:"We're sorry, but you've reached the end of search results."})):w()}catch{c.error({message:"Something went wrong. Please try again!"})}finally{b()}});
//# sourceMappingURL=index.js.map
