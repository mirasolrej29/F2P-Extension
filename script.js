const fetchData = async () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '986eaf8742msh25db6e50b051d8fp18eb70jsn57199f43d286',
		  'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options);
  const record = await res.json();

  for (let i = record.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [record[i], record[j]] = [record[j], record[i]];
  }

  const gamesList = document.getElementById('games');
  let games = record;

  const renderGames = () => {
    gamesList.innerHTML = '';
    games.forEach(item => {
      const gameItem = document.createElement('li');
      
      gameItem.innerHTML = `
      <div class="main-container">
        <div class="item-container">
          <img src="${item.thumbnail}" alt="${item.title} icon" style="display: block; margin: 0 auto;">
          <div class="title-container" style="background-color: #710101; padding: 0.5px; border-radius: 5px; display: flex; justify-content: center; width: 100%;">
            <span style="font-size: 14px; color: white; text-align: center;">${item.title}</span>
          </div>
          <div class="genre-container" style="font-size: smaller; font-family: 'Times New Roman', Times, serif; margin-top: 5px; text-align: center;">
            <span class="genre">${item.genre}</span>
          </div>
          <div class="download-button-container" style="text-align: center; margin-top: 10px;">
            <button class="download-button">
              Download Link
            </button>
          </div>
        </div>
      </div>
    `;
    

      gameItem.querySelector('.download-button').addEventListener('click', () => {
        window.open(item.game_url);
      });
      gamesList.appendChild(gameItem);
    });
  };
  const filterBtn = document.getElementById('filter-btn');
  const genreSelect = document.getElementById('genre-select');

  filterBtn.addEventListener('click', () => {
    const selectedGenre = genreSelect.value;
    if (selectedGenre) {
      games = record.filter(item => item.genre === selectedGenre);
    } else {
      games = record;
    }
    renderGames();
  });
  

  renderGames();

  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search');

  searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const gameItems = document.querySelectorAll('#games li');
    gameItems.forEach(item => {
      const title = item.querySelector('span').textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });

  searchInput.addEventListener('keyup', () => {
    searchBtn.click();
  });

  genreSelect.addEventListener('change', () => {
    filterBtn.click();
  });
};

fetchData();
