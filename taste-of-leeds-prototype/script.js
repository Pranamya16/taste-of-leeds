const spots = [
  {id:"tharavadu",name:"Tharavadu",cuisine:"South Asian",area:"City Centre",address:"7–8 Mill Hill, Leeds LS1 5DQ",dish:"Meen Koottan",story:"Kerala cuisine in Leeds city centre. The restaurant describes Meen Koottan as a fish curry inspired by a Keralan family recipe.",emoji:"🍛",tag:"Kerala cuisine",bg:"linear-gradient(135deg,#f6c85b,#ef8b58)",note:"The restaurant’s menu describes Meen Koottan as a Keralan fish curry and lists it as a popular main. Check the current menu before visiting.",website:"https://www.tharavadurestaurants.com/",source:"https://www.tharavadurestaurants.com/qrmenu/"},
  {id:"bundobust",name:"Bundobust Leeds",cuisine:"South Asian",area:"City Centre",address:"6 Mill Hill, Leeds LS1 5DQ",dish:"Okra Fries",story:"Indian street food and craft beer at Bundobust’s original Leeds venue. Its menu includes shareable small plates such as Okra Fries.",emoji:"🥘",tag:"Indian street food",bg:"linear-gradient(135deg,#b9d9c9,#65a89b)",note:"Okra Fries appear on Bundobust’s current food menu. Menu items can change, so check the restaurant’s site before visiting.",website:"https://bundobust.com/locations/leeds/",source:"https://bundobust.com/menu/"},
  {id:"littletokyo",name:"Little Tokyo",cuisine:"Japanese",area:"City Centre",address:"24 Central Road, Leeds LS1 6DE",dish:"Japanese soup noodles",story:"Little Tokyo serves Japanese food, including bento boxes and soup noodles in a homemade miso-based broth.",emoji:"🍜",tag:"Japanese dining",bg:"linear-gradient(135deg,#d5e8d8,#65a89b)",note:"The restaurant’s menu describes its soup noodles as Japanese noodles served in a homemade miso-based broth.",website:"https://littletokyoleeds.co.uk/",source:"https://littletokyoleeds.co.uk/menu/"},
  {id:"piassa",name:"Piassa Bar and Restaurant",cuisine:"Ethiopian",area:"Harehills",address:"83 Roundhay Road, Leeds LS8 5AQ",dish:"Beyaynetu",story:"Piassa serves Ethiopian cuisine. Its menu describes Beyaynetu as a combination of chickpea stew, lentil stew, vegetables and salad.",emoji:"🥘",tag:"Ethiopian cuisine",bg:"linear-gradient(135deg,#eaa5a5,#c96c55)",note:"Beyaynetu is listed on Piassa’s menu as a combination platter. Check the restaurant’s current menu for availability.",website:"https://www.piassaleeds.co.uk/",source:"https://www.piassaleeds.co.uk/menu/"},
  {id:"lupes",name:"Lupe’s Cantina Mexicana",cuisine:"Mexican",area:"Burley",address:"204–206 Cardigan Road, Leeds LS6 1LF",dish:"Tacos al Pastor",story:"A family-run Mexican restaurant on Cardigan Road. Its menu lists Tacos al Pastor with achiote-rubbed pork and grilled pineapple.",emoji:"🌮",tag:"Mexican cooking",bg:"linear-gradient(135deg,#f2b36b,#e66c4d)",note:"Tacos al Pastor appear on the restaurant’s menu. Menu items can change; check before visiting.",website:"https://www.lupescantinamexicana.co.uk/",source:"https://www.lupescantinamexicana.co.uk/wp-content/uploads/2019/12/Lupes-menu-A3.pdf"},
  {id:"hoiana",name:"Hoiana Restaurant",cuisine:"Vietnamese",area:"Holbeck",address:"1 Saw Mill Yard, Leeds LS11 5WH",dish:"Phở bò đặc biệt",story:"Hoiana serves Vietnamese food. Its menu lists pho noodle soups, including a beef special with brisket, garlic beef and beef balls.",emoji:"🍜",tag:"Vietnamese cuisine",bg:"linear-gradient(135deg,#d6a2b9,#9c7198)",note:"The restaurant’s menu lists Phở bò đặc biệt as a beef pho with brisket, garlic beef and beef balls. Check the current menu before visiting.",website:"https://hoianarestaurant.co.uk/",source:"https://hoianarestaurant.co.uk/our-menu-copy"}
];
let activeCuisine = "All";
let activeArea = "All";
const grid = document.getElementById("spot-grid");
const searchInput = document.getElementById("search-input");
const areaFilter = document.getElementById("area-filter");
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

function renderSpots(){
  const q = searchInput.value.trim().toLocaleLowerCase();
  const filtered = spots.filter(s => (activeCuisine === "All" || s.cuisine === activeCuisine) && (activeArea === "All" || s.area === activeArea) && [s.name,s.cuisine,s.area,s.address,s.dish,s.story].join(" ").toLocaleLowerCase().includes(q));
  document.getElementById("result-count").textContent = `${filtered.length} ${filtered.length===1?"spot":"spots"}${filtered.some(s=>s.pending)?" · includes pending suggestions":""}`;
  if(!filtered.length){grid.innerHTML='<div class="empty-state"><div style="font-size:32px">🍽️</div><h3>No matches just yet</h3><p>Try another search or clear a filter to see more ideas.</p></div>';return;}
  grid.innerHTML = filtered.map(s=>{const mapHref=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name}, ${s.address}`)}`;return `<article class="spot-card"><div class="spot-art" style="background:${s.bg}"><span class="spot-tag">${escapeHTML(s.pending?"Pending review":s.tag)}</span><span class="dish-emoji" aria-hidden="true">${escapeHTML(s.emoji)}</span></div><div class="spot-body"><h3>${escapeHTML(s.name)}</h3><div class="spot-meta">${escapeHTML(s.cuisine)} · ${escapeHTML(s.area)}</div><p>${escapeHTML(s.address)}</p><p>${escapeHTML(s.story)}</p><div class="spot-foot"><span>${escapeHTML(s.dish)}</span><div class="spot-actions"><a class="card-link" href="${mapHref}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(s.name)} at ${escapeHTML(s.address)} in Google Maps">Map ↗</a><button class="card-link" type="button" data-open-spot="${escapeHTML(s.id)}">Details</button></div></div></div></article>`;}).join("");
}
document.querySelectorAll(".cuisine-chip").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".cuisine-chip").forEach(b=>{b.classList.remove("active");b.setAttribute("aria-pressed","false");});
  btn.classList.add("active");btn.setAttribute("aria-pressed","true");activeCuisine=btn.dataset.cuisine;renderSpots();
}));
searchInput.addEventListener("input",renderSpots);
areaFilter.addEventListener("change",()=>{activeArea=areaFilter.value;renderSpots();});
document.getElementById("clear-filters").addEventListener("click",()=>{activeCuisine="All";activeArea="All";areaFilter.value="All";searchInput.value="";document.querySelectorAll(".cuisine-chip").forEach(b=>{const on=b.dataset.cuisine==="All";b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));});renderSpots();searchInput.focus();});

const dialog=document.getElementById("submit-dialog");
function openDialog(){dialog.showModal();}
document.getElementById("open-submit").addEventListener("click",openDialog);
document.getElementById("open-submit-bottom").addEventListener("click",openDialog);
document.getElementById("close-submit").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
const spotDialog=document.getElementById("spot-dialog");
grid.addEventListener("click",event=>{
  const button=event.target.closest("[data-open-spot]");if(!button)return;
  const spot=spots.find(item=>item.id===button.dataset.openSpot);if(!spot)return;
  const mapQuery=encodeURIComponent(`${spot.name}, ${spot.address}`);
  const mapHref=`https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  document.getElementById("spot-detail").innerHTML=`<div class="detail-art" style="background:${spot.bg}"><span>${escapeHTML(spot.emoji)}</span></div><p class="eyebrow">${spot.pending?"COMMUNITY SUGGESTION · PENDING REVIEW":"LEEDS FOOD SPOT"}</p><h2 id="detail-title">${escapeHTML(spot.name)}</h2><p class="detail-meta">${escapeHTML(spot.cuisine)} · ${escapeHTML(spot.area)}</p><p class="detail-address">${escapeHTML(spot.address)}</p><a class="button button-dark map-link" href="${mapHref}" target="_blank" rel="noopener noreferrer">Open this address in Google Maps ↗</a>${spot.website?`<a class="official-link" href="${escapeHTML(spot.website)}" target="_blank" rel="noopener noreferrer">Restaurant website ↗</a>`:""}<div class="detail-dish"><span class="eyebrow">${spot.pending?"SUGGESTED DISH":"A DISH ON THE MENU"}</span><h3>${escapeHTML(spot.dish)}</h3><p>${escapeHTML(spot.note)}</p>${spot.source?`<a class="source-link" href="${escapeHTML(spot.source)}" target="_blank" rel="noopener noreferrer">View menu source ↗</a>`:""}</div><p class="detail-story">${escapeHTML(spot.story)}</p><p class="detail-footnote">${spot.pending?"This suggestion is only in the current browser session and has not been verified or published.":"Address and menu details are linked to the restaurant’s website or local listing. Please confirm current details before travelling."}</p>`;
  spotDialog.showModal();
});
document.getElementById("close-spot").addEventListener("click",()=>spotDialog.close());
spotDialog.addEventListener("click",event=>{if(event.target===spotDialog)spotDialog.close();});
document.getElementById("recommendation-form").addEventListener("submit",event=>{
  event.preventDefault();const data=new FormData(event.currentTarget);
  const name=String(data.get("name")||"").trim();if(!name)return;
  const cuisine=String(data.get("cuisine")||"Other");
  const area=String(data.get("area")||"Leeds").trim().replace(/\s+/g," ");
  const newSpot={id:`suggestion-${Date.now()}`,name,cuisine,area:area.replace(/,?\s*Leeds$/i,""),address:String(data.get("address")||"").trim(),dish:String(data.get("dish")||"Dish recommendation to come").trim(),story:String(data.get("story")||"A community suggestion awaiting moderator review.").trim(),emoji:"🍽️",tag:"Pending review",bg:"linear-gradient(135deg,#e8d8b9,#cfad81)",note:"This suggestion is pending review. A moderator would check its relevance, tone, privacy and factual details before publication.",pending:true};
  spots.unshift(newSpot);event.currentTarget.reset();dialog.close();renderSpots();
  const toast=document.getElementById("toast");toast.textContent=`Thanks for sharing ${name}. Your suggestion is marked pending review in this demo.`;toast.classList.add("show");window.setTimeout(()=>toast.classList.remove("show"),4000);
  document.getElementById("food-spots").scrollIntoView({behavior:"smooth"});
});
const menuToggle=document.getElementById("menu-toggle");
menuToggle.addEventListener("click",()=>{const nav=document.querySelector(".desktop-nav");const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".desktop-nav").classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.querySelectorAll(".cuisine-chip").forEach(b=>b.setAttribute("aria-pressed",String(b.classList.contains("active"))));
renderSpots();
