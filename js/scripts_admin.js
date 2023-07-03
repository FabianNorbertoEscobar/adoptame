/* FOOTER */

$(document).ready(function() {
    $("#footer_admin").load("footer_admin.html footer");

    $('.logout-btn').on('click', function() {
        logout();
    });

    function logout(){
        this.isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        location.href = 'login.html';
    }
});

/* end FOOTER */

/* HEADER */

document.getElementById("header_admin").innerHTML = `
<header>
    <nav class="navbar">
        <div class="container-icon">
            <a href="admin.html">
                <img class="primary-icon" src="img/isotipo icono.png" alt="isotipo adoptame">
            </a>
            <a href="admin.html">
                <img class="secondary-icon" src="img/logotipo naranja.png" alt="logotipo adoptame">
            </a>
        </div>
        <button class="logout-btn">
            Cerrar sesi&oacute;n
        </button>
    </nav>
</header>
`;

/* end HEADER */
