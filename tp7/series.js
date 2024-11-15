//recuperer et afficher les series stockees dans le local storage
window.onload = function () {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.forEach(serie => {
      addToWatchlist(serie.title, serie.year, serie.poster, false);
    });
  };
  
  //ajouter une serie a la liste et au local storage
  function addToWatchlist(title, year, poster, saveToStorage = true) {
    const watchlist = document.getElementById('watchlist');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${title}</td>
      <td>${year}</td>
      <td>8.0</td> <!-- Exemple de rating -->
      <td><img src="${poster}" alt="${title}" width="80"></td>
      <td class="align-middle">
        <button class="btn btn-outline-danger" onclick="removeFromWatchlist(this, '${title}')">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    `;
    watchlist.appendChild(row);
  
    if (saveToStorage) {
      let storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      storedWatchlist.push({ title, year, poster });
      localStorage.setItem('watchlist', JSON.stringify(storedWatchlist));
    }
  }
  
  //retirer une serie de la liste et du local storage
  function removeFromWatchlist(button, title) {
    button.parentElement.parentElement.remove();
    let storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    storedWatchlist = storedWatchlist.filter(serie => serie.title !== title);
    localStorage.setItem('watchlist', JSON.stringify(storedWatchlist));
  }
  
  //recherche
  document.getElementById('search-button').addEventListener('click', async () => {
    const serieName = document.getElementById('serie-name').value;
    if (serieName.trim() === '') {
      alert('Veuillez entrer un nom de série');
      return;
    }
  
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${serieName}&apikey=efdc2275`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
  
      const data = await response.json();
      if (data.Response === 'False') {
        alert('Aucune série trouvée');
        return;
      }
  
      displaySeries(data.Search);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  });
  
  //fficher les series dans le tableau
  function displaySeries(series) {
    const seriesList = document.getElementById('series-list');
    seriesList.innerHTML = '';
    series.forEach(serie => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${serie.Title}</td>
        <td>${serie.Year}</td>
        <td><img src="${serie.Poster}" alt="${serie.Title}" width="80"></td>
        <td class="align-middle">
          <button class="btn btn-outline-secondary" onclick="addToWatchlist('${serie.Title}', '${serie.Year}', '${serie.Poster}')">
            <i class="fa fa-plus"></i>
          </button>
        </td>
      `;
      seriesList.appendChild(row);
    });
  }
  