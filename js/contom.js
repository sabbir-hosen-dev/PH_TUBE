const catagory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await res.json();
    catagoryBtn(data.categories);
  } catch (err) {
    console.error(err);
  }
};
let btnLength = 0;

const catagoryBtn = (data) => {
  const btnContainer = document.getElementById("catagory");
  data.map((btn) => {
    const button = document.createElement("button");
    button.innerHTML =  btn.category
    button.classList.add("btn", "catagory")
    ;
    button.onclick = () =>{ 
      for(let i = 0; i < btns.length; i++){
        btns[i].classList.remove("active");
      }
      loadCategoryVideos(btn.category_id)
      button.classList.add("active")
    };
    btnContainer.appendChild(button);
    
  });
};

const btns = document.getElementsByClassName("catagory");



const loadCategoryVideos = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  );
  const data = await res.json();
  displayVedios(data.category);
};

const convertTime = (seconds) => {
  const years = Math.floor(seconds / (365 * 24 * 60 * 60)); // 1 year = 365 days
  seconds %= 365 * 24 * 60 * 60;

  const months = Math.floor(seconds / (30 * 24 * 60 * 60)); // 1 month = 30 days
  seconds %= 30 * 24 * 60 * 60;

  const days = Math.floor(seconds / (24 * 60 * 60)); // 1 day = 24 hours
  seconds %= 24 * 60 * 60;

  const hours = Math.floor(seconds / (60 * 60)); // 1 hour = 60 minutes
  seconds %= 60 * 60;

  const minutes = Math.floor(seconds / 60); // 1 minute = 60 seconds
  seconds %= 60;

  // Create an array with non-zero values only
  const timeArray = [
    years ? `${years} year${years > 1 ? "s" : ""}` : "",
    months ? `${months} month${months > 1 ? "s" : ""}` : "",
    days ? `${days} day${days > 1 ? "s" : ""}` : "",
    hours ? `${hours} hour${hours > 1 ? "s" : ""}` : "",
    minutes ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "",
    seconds ? `${seconds} second${seconds > 1 ? "s" : ""}` : "",
  ].filter(Boolean); // Filter out empty strings

  // Join the remaining time parts with spaces
  return timeArray.length ? timeArray.join(" ") : "0 seconds";
};


const showDetels = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(
        "modal-container"
      ).innerHTML = `<dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">${data.video.title}</h3>
      <p class="py-1">${data.video.description}</p>

          <div class="flex justify-between"> 
            <p>${data.video.others.views}</p>
            <p">${convertTime(data.video.others.posted_date)}</p>
          </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
    </dialog>`;
      my_modal_1.showModal();
    });
};

const displayVedios = (data) => {
  const vediosDiv = document.getElementById("vedios");
  vediosDiv.innerHTML = "";
  if (data.length === 0) {
    const emtydiv = document.createElement("div");
    vediosDiv.classList.remove("grid");
    const emty = `
      <div class="flex justify-center items-center flex-col w-full min-h-[60vh] text-center"> 
          <img src="../images/Icon.png" />
          <h2 class="font-bold text-2xl"> Oops!! Sorry, There is no </br> content here </h2>
      </div>
    `;
    emtydiv.innerHTML = emty;
    vediosDiv.appendChild(emtydiv);
  } else {
    vediosDiv.classList.add("grid");
    data.map((item) => {
      const card = `
  <div class="card card-compact bg-base-100 shadow-xl">
    <figure class="relative">
      <img
        class="w-full max-h-[300px] md:max-h-[200px]"
        src="${item.thumbnail}"
        alt="Thumbnail Image" />
        <span class="absolute bottom-1 right-3 text-white bg-[#00000065] px-2 rounded-sm"> ${convertTime(
          item.others.posted_date
        )}</span>
    </figure>
    <div class="card-body">
      <div class="flex gap-3">
        <div>
          <img class="w-[50px] h-[50px] rounded-full" src="${
            item.authors[0].profile_picture
          }" alt="Profile Picture">
        </div>
        <div class="details flex-1">
          <h4 class="card-title">${item.title}</h4>
          <p class="inline">${item.authors[0].profile_name}</p>
          ${
            item.authors[0].verified
              ? `<img class="w-5 h-5 inline-block" src="https://img.icons8.com/?size=100&id=2sZ0sdlG9kWP&format=png" alt="Verified Badge">`
              : ""
          }
          <div class="flex justify-between"> 
            <p>${item.others.views}</p>
            <p id="detels"  onClick="showDetels('${
              item.video_id
            }')" class="text-indigo-600 text-end underline cursor-pointer">view details</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

      const div = document.createElement("div");
      div.innerHTML = card;
      vediosDiv.appendChild(div);
    });
  }
};

const loadALlVedios = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      displayVedios(data.videos);
    });
};

const input = document.getElementById("search");
input.addEventListener("keyup", (e) => {
  e.preventDefault();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${e.target.value}`
  )
    .then((res) => res.json())
    .then((data) => displayVedios(data.videos));
});

const allBtn = document.getElementById("allBtn");
allBtn.addEventListener("click", () => {
  loadALlVedios();

  for(let i = 0; i < btns.length; i++){
    btns[i].classList.remove("active");
    btns[i].addEventListener("click",() => {
      console.log("hi")
    })
    console.log(i)
  }
  allBtn.classList.add("active")
})

catagory();
loadALlVedios();
