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

const catagoryBtn = (data) => {
  const btnContainer = document.getElementById("catagory");
  data.map((btn) => {
    const button = document.createElement("button");
    button.innerHTML = `
      <button class="btn">${btn.category} </button>
    `;
    button.onclick = () => loadCategoryVideos(btn.category_id);
    btnContainer.appendChild(button);
  });
};

const loadCategoryVideos = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  );
  const data = await res.json();
  displayVedios(data.category);
};

// {
//   "status": true,
//   "message": "successfully fetched all the videos",
//   "videos": [
//     {
//       "category_id": "1001",
//       "video_id": "aaaa",
//       "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//       "title": "Shape of You",
//       "authors": [
//         {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//         }
//       ],
//       "others": {
//         "views": "100K",
//         "posted_date": "16278"
//       },
//       "description": ""
//     }
//   ]
// }

const displayVedios = (data) => {
  const vediosDiv = document.getElementById("vedios");
  vediosDiv.innerHTML = ""; 

  if (data.length === 0) {
    const emtydiv = document.createElement("div");
    vediosDiv.classList.remove("grid")
    const emty = `
      <div class="flex justify-center items-center flex-col w-full min-h-[60vh] text-center"> 
          <img src="../images/Icon.png" />
          <h2 class="font-bold text-2xl"> Oops!! Sorry, There is no </br> content here </h2>
      </div>
    `;
    emtydiv.innerHTML = emty;
    vediosDiv.appendChild(emtydiv)
  } else {
    vediosDiv.classList.add("grid")
    data.map((item) => {
      const card = `
  <div class="card card-compact bg-base-100 w-96 shadow-xl">
    <figure class="">
      <img
        class="w-full max-h-[200px]"
        src="${item.thumbnail}"
        alt="Thumbnail Image" />
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
            <p class="text-indigo-600 text-end underline cursor-pointer">view details</p>
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

catagory();
loadALlVedios();
