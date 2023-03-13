function initVisitorListing() {
    let filteredItem = JSON.parse(localStorage.getItem("filteredItem"));
    const publishedItems = items.filter((item) => item.isPublished);

    let filteredItems = publishedItems.filter(
        (item) =>
            (filteredItem && filteredItem.title
                ? item.title.includes(filteredItem.title)
                : true) &&
            (filteredItem && filteredItem.byArtists
                ? item.artist === filteredItem.byArtists
                : true) &&
            (filteredItem && filteredItem.byPriceMin
                ? item.price >= filteredItem.byPriceMin
                : true) &&
            (filteredItem && filteredItem.byPriceMax
                ? item.price <= filteredItem.byPriceMax
                : true) &&
            (filteredItem && filteredItem.byType
                ? item.type === filteredItem.byType
                : true)
    );

    filteredItems.forEach((item, index) => {
        let newCard = document.createElement("div");
        newCard.innerHTML = `
        <div class="row">
            <img
                src="${item.image}"
                alt="item-img"
                class="col-12"
            />
         </div>
        <div class="description">
            <div class="row">
                <div class="col-6">
                    <p class="artist-name">${item.artist}</p>
                </div>
                <div
                    class="col-6 d-flex justify-content-end align-items-center"
                >
                    <span class="price">$${item.price}</span>
                </div>
            </div>
            <div class="row">
                <p class="col-12 item-title">${item.title}</p>
                <p class="col-12 item-info">
                    ${item.description}
                </p>
            </div>
        </div>`;

        if (index % 2 === 0) {
            newCard.classList.add("item-card", "sand");
        } else {
            newCard.classList.add("item-card", "redWine");
        }

        listing.appendChild(newCard);
    });
}
