// =========================
// F2P Games Store
// =========================

const API_URL =
    "https://free-to-play-games-database.p.rapidapi.com/api/games";

const API_OPTIONS = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "YOUR_API_KEY_HERE",
        "X-RapidAPI-Host":
            "free-to-play-games-database.p.rapidapi.com"
    }
};

let allGames = [];
let filteredGames = [];

// =========================
// DOM ELEMENTS
// =========================

const gamesList =
    document.getElementById("games");

const searchInput =
    document.getElementById("search");

const searchBtn =
    document.getElementById("search-btn");

const filterBtn =
    document.getElementById("filter-btn");

const genreSelect =
    document.getElementById("genre-select");

const gameCount =
    document.getElementById("game-count");

// =========================
// FETCH DATA
// =========================

async function fetchData() {

    try {

        const response =
            await fetch(
                API_URL,
                API_OPTIONS
            );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch games."
            );
        }

        const data =
            await response.json();

        allGames = data;
        filteredGames = data;

        updateGameCount();
        renderGames();

    } catch (error) {

        console.error(
            "Fetch Error:",
            error
        );

        gamesList.innerHTML = `
            <div style="
                color:white;
                text-align:center;
                padding:40px;
                font-size:18px;
            ">
                Failed to load games.
            </div>
        `;
    }
}

// =========================
// GAME COUNT
// =========================

function updateGameCount() {

    gameCount.textContent =
        filteredGames.length;
}

// =========================
// RENDER GAMES
// =========================

function renderGames() {

    gamesList.innerHTML = "";

    if (filteredGames.length === 0) {

        gamesList.innerHTML = `
            <div style="
                text-align:center;
                padding:40px;
                color:#94a3b8;
                grid-column:1/-1;
            ">
                No games found.
            </div>
        `;

        return;
    }

    filteredGames.forEach(game => {

        const gameItem =
            document.createElement("li");

        gameItem.innerHTML = `

            <div class="game-card">

                <img
                    src="${game.thumbnail}"
                    alt="${game.title}"
                    class="game-image"
                >

                <div class="card-content">

                    <h3>
                        ${game.title}
                    </h3>

                    <div class="genre">
                        ${game.genre}
                    </div>

                    <div class="platform">
                        🖥 ${game.platform}
                    </div>

                    <p
                        style="
                        color:#cbd5e1;
                        font-size:.85rem;
                        line-height:1.5;
                        margin-bottom:16px;
                        "
                    >
                        ${truncateText(
                            game.short_description,
                            100
                        )}
                    </p>

                    <button
                        class="download-button"
                    >
                        View Game →
                    </button>

                </div>

            </div>

        `;

        gameItem
            .querySelector(
                ".download-button"
            )
            .addEventListener(
                "click",
                () => {

                    window.open(
                        game.game_url,
                        "_blank"
                    );

                }
            );

        gamesList.appendChild(
            gameItem
        );

    });

}

// =========================
// SEARCH
// =========================

function applyFilters() {

    const searchTerm =
        searchInput.value
        .toLowerCase()
        .trim();

    const selectedGenre =
        genreSelect.value;

    filteredGames =
        allGames.filter(game => {

            const matchesSearch =
                game.title
                .toLowerCase()
                .includes(searchTerm);

            const matchesGenre =
                selectedGenre === "" ||
                game.genre === selectedGenre;

            return (
                matchesSearch &&
                matchesGenre
            );

        });

    updateGameCount();
    renderGames();

}

// =========================
// TEXT TRUNCATION
// =========================

function truncateText(
    text,
    maxLength
) {

    if (
        text.length <= maxLength
    ) {
        return text;
    }

    return (
        text.substring(
            0,
            maxLength
        ) + "..."
    );

}

// =========================
// EVENTS
// =========================

searchBtn.addEventListener(
    "click",
    applyFilters
);

searchInput.addEventListener(
    "keyup",
    applyFilters
);

filterBtn.addEventListener(
    "click",
    applyFilters
);

genreSelect.addEventListener(
    "change",
    applyFilters
);

// =========================
// LOAD
// =========================

fetchData();