function initArtistAddNewItemPage() {
    const form = document.querySelector("#addEditNewItem");

    form.removeEventListener("submit", onSubmit);

    form.addEventListener("submit", onSubmit);
}

function onSubmit(ev) {
    const form = document.querySelector("#addEditNewItem");

    ev.preventDefault();

    if (editingItem) {
        const idx = items.indexOf(editingItem);
        items[idx] = {
            id: editingItem.id,
            title: title.value,
            description: description.value,
            type: type.value,
            image: capturedImgURL || imageURL.value,
            price: price.value,
            artist: currentlyLoggedUser,
            dateCreated: editingItem.dateCreated,
            isPublished: isPublished.checked,
            isAuctioning: false,
        };

        editingItem = undefined;
    } else {
        const newItem = {
            id: new Date().valueOf(),
            title: title.value,
            description: description.value,
            type: type.value,
            image: capturedImgURL || imageURL.value,
            price: price.value,
            artist: currentlyLoggedUser,
            dateCreated: new Date(),
            isPublished: isPublished.checked,
            isAuctioning: false,
        };
        items.unshift(newItem);
    }
    document.querySelector("#addNewItem-btn").textContent = "Add new item";
    form.reset();

    window.location.hash = "#artistItemsPage";
}

document.querySelector(".snapshot").addEventListener("click", function () {
    window.location.hash = "#artistCaptureImage";
});
