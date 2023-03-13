function initArtistHomePage() {
    liveBid();
    totalItemsSold();
    totalIncome();
    currentlyLoggedUser = localStorage.getItem("selectedArtist");
    const days7 = document.querySelector("#sevenDays");
    const days14 = document.querySelector("#fourteenDays");
    const days30 = document.querySelector("#thirtyDays");

    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Amount",
                backgroundColor: "rgba(161, 106, 94, 1)",
                borderColor: "rgba(252, 235, 213, 1)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };

    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
            maintainAspectRatio: false,
        },
    };

    const myChart = new Chart(document.getElementById("myChart"), config);

    const soldByArtistItems = items.filter(
        (item) => item.artist === currentlyLoggedUser && Boolean(item.priceSold)
    );

    days7.addEventListener("click", () => chartData(7));
    days14.addEventListener("click", () => chartData(14));
    days30.addEventListener("click", () => chartData(30));

    function chartData(days) {
        const labels = generateDates(days);
        myChart.data.labels = labels;

        const newData = labels.map((label) => {
            let sum = 0;
            soldByArtistItems.forEach((item) => {
                if (formatDate(item.dateSold) === label) {
                    sum += item.priceSold;
                }
            });

            return sum;
        });

        myChart.data.datasets[0].data = newData;
        myChart.update();
    }
}

function generateDates(daysAgo) {
    const arr = [];

    for (let i = 0; i < daysAgo; i++) {
        const start = new Date();
        const startDate = start.getDate();
        const currentDate = start.setDate(startDate - i);
        const formatted = formatDate(currentDate);
        arr.push(formatted);
    }

    return arr;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-Gb");
}

function totalItemsSold() {
    let publishedItems = items.filter(
        (item) =>
            item.artist === currentlyLoggedUser && Boolean(item.isPublished)
    );

    let soldItems = publishedItems.filter((item) => Boolean(item.priceSold));

    document.querySelector(
        "#totalItemsSold"
    ).innerHTML = `${soldItems.length}/${publishedItems.length}`;
}

function totalIncome() {
    let soldItemsArr = items.filter(
        (item) => item.artist === currentlyLoggedUser && Boolean(item.priceSold)
    );

    let totalIncomeSum = 0;

    soldItemsArr.forEach((item) => (totalIncomeSum += item.priceSold));

    document.querySelector("#totalIncome").innerHTML = `$${totalIncomeSum}`;
}

function liveBid() {
    document.querySelector("#currentBid").innerHTML = lastBid
        ? `$${lastBid}`
        : `$0`;
}
