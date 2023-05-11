/*header html*/
document.getElementById("idheader").innerHTML = `

<nav class="navbar">
            <div class="container-icon">
                <a href="#"> <!-- si clickean en el icono tambien deberia llevar al index -->
                    <img class="primary-icon" src="img/logo_image.png">
                </a>
            </div>
            <ul class="nav-list" id="navi-list">
                <li class="list-item">
                    <a href="#" class="nav-link">Home</a>
                </li>
                <li class="list-item">
                    <a href="#" class="nav-link">Nosotros</a>
                </li>
                <li class="list-item"> 
                    <a href="#" class="nav-link">Contacto</a>
                </li>
                <li class="list-item">
                    <a href="#" class="nav-link">Adoptados</a>
                </li>
                <li class="list-item">
                    <a href="#" class="nav-link">F.A.Q.</a>
                </li>
            </ul>
            <div class="menu" id="toggle-button">
                <a class="icon">
                    <i class="fa-solid fa-bars"></i>
                </a>
            </div>
            </nav>
`
/*hamburguer icon hace que el click muestre el menu en pantalla de tamaño chico*/ 
const hamburguer = document.querySelector(".menu");
const navList = document.querySelector(".nav-list");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active");
    navList.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburguer.classList.remove("active");
    navList.classList.remove("active");
}))

/* lo que deja cambiar entre las tabs formulario y consulta */
let tabs = document.querySelectorAll(".tabs h3");
let tabContents = document.querySelectorAll(".tab-content div");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) => {
      content.classList.remove("working");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("working");
    });
    tabContents[index].classList.add("working");
    tabs[index].classList.add("working");
  });
});

/*validaciones*/
