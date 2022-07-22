//selectors
let email = document.getElementById("email");
let discordId = document.getElementById("discord");
const searchButton = document.getElementById("search");
const card = document.getElementsByClassName("card");

//variables
const url = "https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile";
testEmail = 'actinver7@gmail.com';
testId = '713113842015797349';

//functions
const getProfile = (targetEmail, targetDiscordId) => {
  const config = { headers:{ 'Email': targetEmail,'Discord-Id': targetDiscordId}};
  return new Promise((resolve, reject) => {
    axios.get(url,config)
      .then((res) =>{
        resolve(res);
    })
      .catch((err) =>{
        reject(err);
    })
  })
}

const renderProfile = (res) => {
  console.log(res);
  const name = res.data.user.fullName;
  const avatar = res.data.user.avatar;
  const email = res.data.user.email;
  const level = res.data.level;
  const batch = res.data.batch;
  const create = new Date(res.data.user.createdAt).toLocaleDateString
  ('en-us', { year:"numeric", month:"short"});
  const lastLogin = new Date(res.data.user.lastLogin).toLocaleDateString
  ('en-us',{ year:"numeric", month:"short",weekday:"long"});
  const hobbies = res.data.hobbies;
  card[0].innerHTML =`
    <div class="card__banner">
      <img src="${avatar}" alt="" id="cardAvatar">
    </div>
    <h1 id="name">${name}</h1>
    <div class="card__information">
      <h3>information</h3>
      <h4>level: <span>${level}</span></h4>
      <h4>batch: <span>${batch}</span></h4>
      <h4>correo: <span>${email}</span> </h4>
      <h4>desde: <span>${create} </span></h4>
      <h4>Ultima sesion: <span>${lastLogin} </span></h4>
    <div class="card__hobbies">
      <div class="card__hobbies__information">
        <h4>Hobbies:</h4>
        <span>${hobbies}</span>
      </div>
    </div>
    </div>
    <button class="card__button" id="returnButton"
      onclick="location.reload()">buscar otro usuario</button>
    <div class="card__footer">
      <img src="img/logofooter.svg" alt="">
    </div>`
};

const errorSearch = (error) => {
  console.log(`estamos en el catch`, error);
  if ( error.request.status === 404) {
    alert("No se ha podido encontrar al usuario , intentalo de nuevo");
  }  
};

function searchProfile (button, email, id){
  button.addEventListener("click", () =>{
    getProfile(email.value, id.value)
      .then(renderProfile)
      .catch(errorSearch);
    validateFields (email,id);
  })  
};

function validateFields (email,id) {
  if (email.value === '' || id.value === '' ) {
    alert("No puedes dejar los campos vacios");
  } 
};

//call function
searchProfile(searchButton, email, discordId);

//modificated hobbies
const res = axios.patch(url,{hobbies:
  'Deportes al aire libre , pasar tiempo con la mascota y estudiar javascript',},
  { headers:{ 'Email':testEmail,'Discord-Id':testId}});

