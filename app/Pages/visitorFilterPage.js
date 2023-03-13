function initVisitorFilterPage() {
    const checkIcon = document.querySelector("#confirmIcon");

    byTypeSelect.innerHTML = `<option value="">Choose</option>`;

    itemTypes.forEach((item) => {
        let optionType = document.createElement("option");
        optionType.innerHTML = item;
        optionType.setAttribute("value", `${item}`);
        byTypeSelect.appendChild(optionType);
    });

    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((users) => {
            selectArtist.innerHTML = `<option value="">Choose</option>`;
            users.forEach((user) => {
                selectArtist.innerHTML += `<option>${user.name}</option>`;
            });
        });

    checkIcon.addEventListener("click", function () {
        listing.innerHTML = "";
        localStorage.setItem(
            "filteredItem",
            JSON.stringify({
                title: itemTitle.value,
                byArtists: selectArtist.value,
                minPrice: minPrice.value,
                maxPrice: maxPrice.value,
                byTypeSelect: byTypeSelect.value,
            })
        );
    });
}
