let selectArtistLanding = document.querySelector(".select-artist-dropdown");
let currentlyLoggedUser;

function initLandingPage() {
    localStorage.setItem("selectedArtist", "");
    currentlyLoggedUser = "";

    let joinAsVisitor = document.querySelector(".p-visitor");
    let joinAsArtist = document.querySelector(".p-artist");

    joinAsVisitor.addEventListener("click", function () {
        location.hash = "#visitorHomePage";
    });

    joinAsArtist.addEventListener("click", function () {
        location.hash = "#artistHomePage";
        totalIncome();
        totalItemsSold();
    });

    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((users) => {
            selectArtistLanding.innerHTML = `<option value="">Choose</option>`;
            users.forEach((user) => {
                selectArtistLanding.innerHTML += `<option>${user.name}</option>`;
            });
        });

    selectArtistLanding.addEventListener("change", function () {
        currentlyLoggedUser = selectArtistLanding.value;
        localStorage.setItem("selectedArtist", currentlyLoggedUser);
    });
}
