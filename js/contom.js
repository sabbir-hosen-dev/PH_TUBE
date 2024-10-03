
const catagory = async () => {
  try{
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await res.json();
    catagoryBtn(data.categories )
  }
  catch (err) {
    console.error(err)
  }
}



const catagoryBtn = (data) => {
  const btnContainer = document.getElementById("catagory");
  data.map( btn => {
    
    const button = document.createElement("button");
    button.innerHTML = `
      <button class="btn" >${btn.category} </button>
    `
    btnContainer.appendChild(button)
  });
}

const displayVedios = (vedios) => {
  console.log(vedios)
}


const loadVedios = ( ) => {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
  .then(res => res.json())
  .then(data => displayVedios(data))
  .catch(err => console.error(err))
}



catagory()
loadVedios()