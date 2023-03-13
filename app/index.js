let editingItem;
let cancelItem;

const listing = document.querySelector(".listing");
// Filter Form inputs
const itemTitle = document.querySelector("#itemTitle");
const selectArtist = document.querySelector("#artistSelect");
const minPrice = document.querySelector("#minPrice");
const maxPrice = document.querySelector("#maxPrice");
const byTypeSelect = document.querySelector("#typeSelect");
// Add New item Form inputs
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const type = document.querySelector("#type");
const price = document.querySelector("#price");
const imageURL = document.querySelector("#url");
const isPublished = document.querySelector("#isPublished");

function handleRoute() {
    let hash = location.hash;
    const allSections = document.querySelectorAll("section");
    const headerVisitor = document.querySelector(".visitor");
    const headerArtist = document.querySelector(".artist");
    const allHeaders = document.querySelectorAll(".header");
    currentlyLoggedUser = localStorage.getItem("selectedArtist");

    allSections.forEach((section) => (section.style.display = "none"));
    allHeaders.forEach((header) => (header.style.display = "none"));

    if (currentlyLoggedUser === "" && hash !== "") {
        headerVisitor.style.display = "block";
        headerVisitor.innerHTML = `<header class="d-flex justify-content-between align-items-start py-2">
        <a href="#" class="logoHeader d-flex align-items-center">
            <span class="rectangle"></span>
            <img src="Images/logo.png" alt="logo" class="logoPic" />
        </a>
        <p class="titleHeader w-50">Street ARTist</p>
        <a href="#auctionPage" id="gavel">
            <i class="fa fa-gavel" aria-hidden="true"></i>
        </a>
    </header>`;
    } else if (currentlyLoggedUser !== "" && hash !== "") {
        headerArtist.style.display = "block";
        headerArtist.innerHTML = `<header class="d-flex justify-content-between align-items-start py-2">
       <a href="#" class="logoHeader d-flex align-items-center">
           <span class="rectangle"></span>
           <img src="Images/logo.png" alt="logo" class="logoPic" />
       </a>
       <p id="artistNameHeader" class="w-50">Street ARTist</p>
       <i
           class="fa-solid fa-bars hamburgerIcon navbar-toggler navbar-toggler-icon"
           data-toggle="collapse"
           data-target="#hambMenu"
       ></i>
   </header>
   <ul class="col-12 text-center hamburger-menu collapse" id="hambMenu">
       <a href="#artistHomePage"><li>Home</li></a>
       <a href="#artistItemsPage"><li>Items</li></a>
       <a href="#auctionPage"><li>Auction</li></a>
   </ul>`;

        document.querySelector("#artistNameHeader").innerHTML =
            currentlyLoggedUser;
    }

    if (hash) {
        document.querySelector(hash).style.display = "block";
    }

    switch (hash) {
        case "#visitorHomePage":
            break;
        case "#visitorListingPage":
            initVisitorListing();
            break;
        case "#visitorFilterPage":
            initVisitorFilterPage();
            break;
        case "#artistHomePage":
            initArtistHomePage();
            break;
        case "#artistItemsPage":
            document.querySelector("#artistItemsPage .artist-items").innerHTML =
                "";
            initArtistItemsPage();
            break;
        case "#artistAddNewItemPage":
            initArtistAddNewItemPage();
            break;
        case "#artistCaptureImage":
            initArtistCaptureImage();
            break;
        case "#auctionPage":
            initAuctionPage();
            break;
        default:
            initLandingPage();
            document.querySelector("#landingPage").style.display = "block";
    }
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);
