function initArtistItemsPage() {
    const artistItemsSection = document.querySelector(
        "#artistItemsPage .artist-items"
    );

    let artistTotalItems = items.filter(
        (item) => item.artist === currentlyLoggedUser
    );
    artistItemsSection.innerHTML = "";

    artistTotalItems.forEach((item) => {
        const card = createArtistCard(item);
        artistItemsSection.appendChild(card);
    });
}

function createArtistCard(item) {
    const itemList = document.createElement("div");
    itemList.classList.add("item-card", "sand");

    const cardImage = document.createElement("img");
    cardImage.setAttribute("src", item.image);
    cardImage.alt = "item-img";
    cardImage.classList.add("w-100");

    const contentDesc = document.createElement("div");
    contentDesc.classList.add("description");

    const cardRow1 = document.createElement("div");
    cardRow1.classList.add("row");

    const col_10 = document.createElement("div");
    col_10.classList.add("col-10");

    const cardTitle = document.createElement("p");
    cardTitle.classList.add("item-title", "pt-1");
    cardTitle.textContent = item.title;

    const cardDateCreated = document.createElement("p");
    cardDateCreated.classList.add("item-date");
    cardDateCreated.textContent = formatDate(item.dateCreated);

    col_10.append(cardTitle, cardDateCreated);

    const col_2 = document.createElement("div");
    col_2.classList.add(
        "col-2",
        "d-flex",
        "justify-content-end",
        "align-items-center"
    );

    const cardPrice = document.createElement("span");
    cardPrice.classList.add("price");
    cardPrice.textContent = `$${item.price}`;

    col_2.appendChild(cardPrice);
    cardRow1.append(col_10, col_2);

    const cardRow2 = document.createElement("div");
    cardRow2.classList.add("row");

    const cardDesc = document.createElement("p");
    cardDesc.classList.add("item-info");
    cardDesc.textContent = item.description;

    cardRow2.appendChild(cardDesc);

    contentDesc.append(cardRow1, cardRow2);

    const cardRowButtons = document.createElement("div");
    cardRowButtons.classList.add("row", "btn-actions");

    const col_12 = document.createElement("div");
    col_12.classList.add(
        "col-12",
        "p-0",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );

    const auctionButton = document.createElement("button");
    auctionButton.textContent = "Send to Auction";
    auctionButton.classList.add("btn");
    auctionButton.setAttribute("id", "auction-btn");
    auctionButton.addEventListener("click", () => {
        if (localStorage.getItem("auction") == "true") {
            auctionButton.setAttribute("disabled", "true");
        } else {
            localStorage.setItem(
                "itemForAuction",
                JSON.stringify({
                    ...item,
                    price: Math.ceil(item.price / 2),
                })
            );
            item.isPublished = true;
            item.isAuctioning = true;
            totalItemsSold();
            auctionButton.textContent = "Item is sent to auction";
            auctionButton.style.backgroundColor = "grey";
            auctionButton.style.color = "black";

            localStorage.removeItem("timer");
            localStorage.setItem("auction", true);
            localStorage.setItem("lastBid", null);
            localStorage.setItem("currentBid", null);
        }
    });

    const publishButton = document.createElement("button");
    publishButton.textContent = item.isPublished ? "Unpublish" : "Publish";
    publishButton.classList.add("btn");
    publishButton.setAttribute(
        "id",
        item.isPublished ? "unpublish-btn" : "publish-btn"
    );

    publishButton.addEventListener("click", function () {
        if (item.isPublished) {
            item.isPublished = false;
            publishButton.textContent = "Publish";
            publishButton.setAttribute("id", "publish-btn");
        } else if (item.isPublished == false) {
            item.isPublished = true;
            publishButton.textContent = "Unpublish";
            publishButton.setAttribute("id", "unpublish-btn");
        }
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn");
    removeButton.setAttribute("id", "remove-btn");

    removeButton.addEventListener("click", function (ev) {
        let parentElement = ev.target.parentElement.parentElement.parentElement;
        let confirmMSG = confirm(
            "Are you sure you want to delete this card-item?"
        );

        if (confirmMSG) {
            parentElement.remove();
            items = items.filter((el) => el.id !== item.id);
        } else {
            return;
        }
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn");
    editButton.setAttribute("id", "edit-btn");

    editButton.addEventListener("click", function () {
        fillCreateItemForm(item);
        window.location.hash = "#artistAddNewItemPage";
    });

    col_12.append(auctionButton, publishButton, removeButton, editButton);
    cardRowButtons.appendChild(col_12);

    itemList.append(cardImage, contentDesc, cardRowButtons);

    return itemList;
}

function fillCreateItemForm(item) {
    document.querySelector("#addNewItem-btn").textContent = "Update";

    editingItem = item;
    title.value = item.title;
    type.value = item.type;
    description.value = item.description;
    price.value = item.price;
    isPublished.value = item.isPublished;
}
