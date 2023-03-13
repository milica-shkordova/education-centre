let lastBid = localStorage.getItem("lastBid");
let timeoutID;

function initAuctionPage() {
    let currentBid = localStorage.getItem("currentBid");
    let itemOnAuction = JSON.parse(localStorage.getItem("itemForAuction"));

    function startTimer(duration, display) {
        let timer = duration,
            minutes,
            seconds;

        timeoutID = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;
            localStorage.setItem("timer", minutes + ":" + seconds);
            if (--timer < 0) {
                clearInterval(timeoutID);
                timer = duration;
                document.querySelector(".bid").setAttribute("disabled", "true");
                document.querySelector("#biddings").innerHTML += lastBid
                    ? `<li class="bid-done">The item is sold for $ ${lastBid}</li>`
                    : `<li class="bid-done">Sorry, time ran out!</li>`;

                console.log(items, "items");
                const newItem = {
                    ...itemOnAuction,
                    priceSold: parseInt(lastBid),
                    dateSold: lastBid ? new Date() : "",
                    isAuctioning: false,
                    isPublished: true,
                };
                const itemForUpdateIndex = items.findIndex(
                    (item) => item.id === itemOnAuction.id
                );
                items[itemForUpdateIndex] = newItem;

                localStorage.setItem("auction", false);
                localStorage.removeItem("itemForAuction");
                localStorage.removeItem("currentBid");
                totalItemsSold();
                totalIncome();
            }
        }, 1000);
    }

    let auctionPage = document.querySelector("#auctionPage");

    if (itemOnAuction) {
        auctionPage.innerHTML = "";
        let auctionCard = document.createElement("div");
        auctionCard.classList.add("auction-card", "pt-3");

        let rowCard = document.createElement("div");
        rowCard.classList.add("row");

        let pTitle = document.createElement("p");
        pTitle.classList.add("col-12", "auction-title", "text-center");
        pTitle.innerHTML = `Item on Auction: <span>"${itemOnAuction.title}"</span>`;

        rowCard.append(pTitle);

        let itemDescription = document.createElement("div");
        itemDescription.classList.add("description");

        let rowDesc = document.createElement("div");
        rowDesc.classList.add("row");

        let imgAuction = document.createElement("img");
        imgAuction.setAttribute("src", itemOnAuction.image);
        imgAuction.alt = "item-img";
        imgAuction.classList.add("col-12");

        rowDesc.append(imgAuction);

        let rowInfo = document.createElement("div");
        rowInfo.classList.add("row", "info");
        let col_9 = document.createElement("div");
        col_9.classList.add("col-9", "my-2");

        let pArtist = document.createElement("p");
        pArtist.classList.add("artist-name");
        pArtist.innerHTML = `Artist: ${itemOnAuction.artist}`;
        col_9.appendChild(pArtist);

        let col_3 = document.createElement("div");
        col_3.classList.add(
            "col-3",
            "my-2",
            "d-flex",
            "justify-content-end",
            "align-items-center"
        );
        let auctionPrice = document.createElement("span");
        auctionPrice.classList.add("price");
        auctionPrice.innerHTML = `$ ${itemOnAuction.price}`;
        col_3.appendChild(auctionPrice);

        rowInfo.append(col_9, col_3);
        itemDescription.append(rowDesc, rowInfo);
        auctionCard.append(rowCard, itemDescription);
        // ul-list for results
        let divBidding = document.createElement("div");
        divBidding.classList.add("bidding", "py-2");

        let row = document.createElement("div");
        row.classList.add(
            "row",
            "justify-content-center",
            "align-items-center"
        );
        row.setAttribute("id", "biddingRow");

        let results = document.createElement("ul");
        results.classList.add("text-left");
        results.setAttribute("id", "biddings");

        divBidding.append(row, results);

        let wrap = document.createElement("div");
        wrap.classList.add("wrap");
        wrap.append(divBidding);

        document.querySelector("#auctionPage").append(auctionCard, wrap);

        row.innerHTML = "";
        row.classList.add("justify-content-center");
        let newP = document.createElement("p");
        newP.classList.add("auction-time", "text-end");
        newP.innerHTML = "Auction finishes in:";
        let time = document.createElement("span");
        time.classList.add("time");
        const alreadyStartedTimer = localStorage.getItem("timer");
        if (alreadyStartedTimer) {
            const minutes = parseInt(alreadyStartedTimer.split(":")[0]);
            const seconds = parseInt(alreadyStartedTimer.split(":")[1]);
            startTimer(minutes * 60 + seconds, time);
        } else {
            startTimer(60 * 2, time);
        }

        let bidAmount = document.createElement("input");
        bidAmount.setAttribute("type", "number");
        bidAmount.setAttribute("id", "bidAmount");
        bidAmount.setAttribute(
            "min",
            currentBid !== "null" ? currentBid : itemOnAuction.price
        );
        bidAmount.setAttribute(
            "value",
            currentBid !== "null" ? currentBid : itemOnAuction.price
        );
        bidAmount.classList.add("input-group-text", "col-4");

        let bidBtn = document.createElement("button");
        bidBtn.classList.add("col-2", "btn", "btn-outline-secondary", "bid");
        bidBtn.innerHTML = "BID";
        bidBtn.addEventListener("click", bidding);

        row.append(newP, time, bidAmount, bidBtn);

        if (currentlyLoggedUser) {
            document.querySelector(".bid").setAttribute("disabled", "true");
        }

        async function bidding() {
            results.innerHTML += `<li class="my-bid">Bid: $ ${bidAmount.value}</li>`;
            localStorage.setItem("lastBid", bidAmount.value);
            localStorage.setItem("currentBid", bidAmount.value);

            const res = await fetch(
                "https://blooming-sierra-28258.herokuapp.com/bid",
                {
                    method: "POST",
                    body: JSON.stringify({ amount: bidAmount.value }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (data.isBidding) {
                clearInterval(timeoutID);
                if (alreadyStartedTimer) {
                    const minutes = parseInt(alreadyStartedTimer.split(":")[0]);
                    const seconds = parseInt(alreadyStartedTimer.split(":")[1]);

                    startTimer((minutes + 1) * 60 + seconds, time);
                }
                bidAmount.min = bidAmount.value + data.bidAmount;
                bidAmount.value =
                    parseInt(bidAmount.value) + parseInt(data.bidAmount);
                results.innerHTML += `<li class="bids">Bid: $ ${data.bidAmount}</li>`;
            } else {
                bidBtn.setAttribute("disabled", "true");
            }
        }
    } else {
        auctionPage.innerHTML = `<div class="noAuctionMsg text-center">Auction unavailable. <p>Currently there is not an item put on auction.</p></div>`;
    }
}
