/* FOOTER */

$(document).ready(function() {
    $("#footer").load("footer.html footer");
    
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable) {
                return pair[1];
            }
        }
        return null;
    }
    
    var petname = getQueryVariable("petname");
    
    if(petname != null){
        $("#petname").val(petname);
        
        var pettype = getQueryVariable("pettype");
        
        if(pettype == 0){
            $("#cat").prop("checked", true);
        } else if(pettype == 1){
            $("#dog").prop("checked", true);
        }
    }
    
});

/* end FOOTER */

/* HEADER */

document.getElementById("header").innerHTML = `
<header>
    <nav class="navbar">
        <div class="container-icon">
            <a href="index.html">
                <img class="primary-icon" src="img/isotipo icono.png" alt="isotipo adoptame">
            </a>
            <a href="index.html">
                <img class="secondary-icon" src="img/logotipo naranja.png" alt="logotipo adoptame">
            </a>
        </div>
        <ul class="nav-list" id="navi-list">
            <li class="list-item">
                <a href="index.html" class="nav-link">Inicio</a>
            </li>
            <li class="list-item">
                <a href="nosotros.html" class="nav-link">Nosotros</a>
            </li>
            <li class="list-item">
                <a href="faq.html" class="nav-link">FAQ</a>
            </li>
            <li class="list-item">
                <a href="contacto.html" class="nav-link">Contacto</a>
            </li>
        </ul>
        <div class="menu" id="toggle-button">
            <a class="icon">
                <i class="fa-solid fa-bars"></i>
            </a>
        </div>
    </nav>
</header>
`;

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

/* end HEADER */

/* CONTACTO */

let tabs = document.querySelectorAll(".tabs h3");
let tabContents = document.querySelectorAll(".tab-content .form");
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

const expresiones = {
    name: /^[a-zA-ZÀ-ÿ]*\s{1}[a-zA-ZÀ-ÿ]*$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    street: /^[a-zA-Z]/,
    number: /^\d{1,8}$/,
    birthdate: /^\d{2}[/]\d{2}[/]\d{4}$/,
    petname: /^[a-zA-Z]/,
}

const campos = {
    name: false,
    email: false,
    street: false,
    number: false,
    birthdate: false,
    petname: false,
}

const form = document.getElementById("adopcion");
const inputs = document.querySelectorAll("#adopcion input");

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "name":
        validarCampo(expresiones.name, e.target, "name");
        break;
        case "email":
        validarCampo(expresiones.email, e.target, "email");
        break;
        case "street":
        validarCampo(expresiones.street, e.target, "street");
        break;
        case "number":
        validarCampo(expresiones.number, e.target, "number");
        break;
        case "birthdate":
        validarCampo(expresiones.birthdate, e.target, "birthdate");
        validarCumpleaños();
        break;
        case "petname":
        validarCampo(expresiones.petname, e.target, "petname");
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-check");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-xmark");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-xmark");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-check");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}

const validarCumpleaños = () => {
    const birthdate = document.getElementById("birthdate");
    
    if (birthdate.value < 18 ){
        document.getElementById("grupo__birthdate").classList.add("formulario__grupo-incorrecto");
        document.getElementById("grupo__birthdate").classList.remove("formulario__grupo-correcto");
        document.querySelector("#grupo__birthdate i").classList.add("fa-circle-xmark");
        document.querySelector("#grupo__birthdate i").classList.remove("fa-circle-check");
        document.querySelector("#grupo__birthdate .formulario__input-error").classList.add("formulario__input-error-activo");
        campos["birthdate"] = false;
    }else{
        document.getElementById("grupo__birthdate").classList.remove("formulario__grupo-incorrecto");
        document.getElementById("grupo__birthdate").classList.add("formulario__grupo-correcto");
        document.querySelector("#grupo__birthdate i").classList.add("fa-circle-check");
        document.querySelector("#grupo__birthdate i").classList.remove("fa-circle-xmark");
        document.querySelector("#grupo__birthdate .formulario__input-error").classList.remove("formulario__input-error-activo");
        campos["birthdate"] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(campos.name && campos.email && campos.street && campos.number && campos.birthdate && campos.petname){
        form.reset();
        
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
        
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});

const expresionesCon = {
    name: /^[a-zA-ZÀ-ÿ]*\s{1}[a-zA-ZÀ-ÿ]*$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const camposCon = {
    name: false,
    email: false,
}

const consulta = document.getElementById("consulta");
const inputsCon = document.querySelectorAll("#consulta input");

const validarConsulta = (e) => {
    switch (e.target.name) {
        case "name":
        validarCampoCon(expresiones.name, e.target, "name");
        break;
        case "email":
        validarCampoCon(expresiones.email, e.target, "email");
        break;
    }
}

const validarCampoCon = (expresionCon, inputCon, campoCon) => {
    if(expresionCon.test(inputCon.value)){
        document.getElementById(`grupo__${campoCon}__consulta`).classList.remove("consulta__grupo-incorrecto");
        document.getElementById(`grupo__${campoCon}__consulta`).classList.add("consulta__grupo-correcto");
        document.querySelector(`#grupo__${campoCon}__consulta i`).classList.add("fa-circle-check");
        document.querySelector(`#grupo__${campoCon}__consulta i`).classList.remove("fa-circle-xmark");
        document.querySelector(`#grupo__${campoCon}__consulta .consulta__input-error`).classList.remove("consulta__input-error-activo");
        camposCon[campoCon] = true;
    }else{
        document.getElementById(`grupo__${campoCon}__consulta`).classList.add("consulta__grupo-incorrecto");
        document.getElementById(`grupo__${campoCon}__consulta`).classList.remove("consulta__grupo-correcto");
        document.querySelector(`#grupo__${campoCon}__consulta i`).classList.add("fa-circle-xmark");
        document.querySelector(`#grupo__${campoCon}__consulta i`).classList.remove("fa-circle-check");
        document.querySelector(`#grupo__${campoCon}__consulta .consulta__input-error`).classList.add("consulta__input-error-activo");
        camposCon[campoCon] = false;
    }
}

inputsCon.forEach((inputCon) => {
    inputCon.addEventListener("keyup", validarConsulta);
    inputCon.addEventListener("blur", validarConsulta);
});

async function handleSubmit(event) {
    event.preventDefault();
    
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: consulta.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok && camposCon.name && camposCon.email) {
            consulta.reset();
            document.getElementById('consulta__mensaje-exito').classList.add('consulta__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('consulta__mensaje-exito').classList.remove('consulta__mensaje-exito-activo');
            }, 5000);
            
            document.querySelectorAll('.consulta__grupo-correcto').forEach((icono) => {
                icono.classList.remove('consulta__grupo-correcto');
            });
            
        } else {
            document.getElementById('consulta__mensaje').classList.add('consulta__mensaje-activo');
        }
    }) ;
}
consulta.addEventListener("submit", handleSubmit);

/* end CONTACTO */
