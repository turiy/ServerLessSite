const vote = (choise, amount) => {
    let btn = document.getElementById(choise);
    let newSize = 25 * amount;
    $(btn).parent().animate({
        width: `+=${newSize * 5}px`
    }, 500);

    let val = document.getElementById(choise + "-val")
    val.innerHTML = (parseInt(val.innerHTML) + amount)

    let lang = "";

    if (choise === "btn-py") {
        lang = "Python"
    } else if (choise === "btn-php") {
        lang = "PHP"
    } else if (choise === "btn-ru") {
        lang = "Ruby"
    } else if (choise === "btn-ja") {
        lang = "Java"
    } else if (choise === "btn-asp") {
        lang = "ASP"
    }


    fetch(`https://h0qz2ekiod.execute-api.eu-central-1.amazonaws.com/Stage/votes/${lang}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application\json'
        },
		body: '{}'
    })
    return false;
}
async function fetchFromCloud() {
    let response = await fetch(`https://h0qz2ekiod.execute-api.eu-central-1.amazonaws.com/Stage/votes/`);
    let data = await response.json()
    return data;
}
fetchFromCloud()
    .then(data => {
        let allVotes = data.Items;

        allVotes.forEach(element => {
            if (element.lang === "PHP") {
                document.getElementById("btn-php-val").textContent = element.cnt
            }
			if (element.lang === "Ruby") {
                document.getElementById("btn-ru-val").textContent = element.cnt
            }
			if (element.lang === "Java") {
                document.getElementById("btn-ja-val").textContent = element.cnt
            }
			if (element.lang === "ASP") {
                document.getElementById("btn-asp-val").textContent = element.cnt
            }
			if (element.lang === "Python") {
                document.getElementById("btn-py-val").textContent = element.cnt
            }
        });
    });

fetchFromCloud();