const FOTMOB_FIXTURES_URL = 'api/fixtures';
const FOTMOB_MATCHES_URL = 'api/matches';
const BACKEND_URL = 'https://thespoon-backend.onrender.com/'
const LEAGUE_ID = 77;
const TEST_ID = 66;

const fetchGamesByLeague = async () => {
    
    try {
        const response = await fetch(`${FOTMOB_FIXTURES_URL}?id=${TEST_ID}&season=2024`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};

const fetchGamesByDay = async (matchDay) => {
    const date = matchDay ? matchDay.toISOString().split('T')[0].replace(/-/g, '') : new Date().toISOString().split('T')[0].replace(/-/g, '');
    try {
        const response = await fetch(`${FOTMOB_MATCHES_URL}?date=${date}&timezone=Asia%2FJerusalem&ccode3=ISR`);
        const data = await response.json();
        const leagues = data.leagues
        const worldCup = leagues.filter(league => league.primaryId === TEST_ID);
        const worldCupGames = worldCup ? worldCup[0].matches : null;
        return worldCupGames;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};

const getGamesNotStarted = async () => {
    const allGames = await fetchGamesByDay();
    return allGames.filter(game => game.status.started === false);
}

const getGamesFinalResults = async (gameId) => {
    const allGames = await fetchGamesByLeague();
    return allGames.filter(game => game.status.finished === true);
}

export const getOnGoingGamesResults = async () => {
    const allGames = await fetchGamesByLeague();
    return allGames.filter(game => game.status.finished === false && game.status.started === true);
}

export const getTodayNotStartedGames = async () => {
    const today = new Date().toISOString().split('T')[0];
    const allNotStartedGames = await getGamesNotStarted();
    return allNotStartedGames.filter(game => game.status.utcTime.split('T')[0] === today);
}

export const getTodayFinalResults = async () => {
    const today = new Date().toISOString().split('T')[0];
    const gamesFinalResults = await getGamesFinalResults();
    const games = gamesFinalResults.filter(game => 
        game.status.utcTime.split('T')[0] === today);
    return games
}

export const getResultsByDate = async (date) => {
    const allGames = await fetchGamesByLeague();
    return allGames.filter(game => game.status.utcTime.split('T')[0] === date);
}

export const getGamesNotStartedWorldCup = async (matchDay) => {
    const allGames = await fetchGamesByDay(matchDay);
    return allGames ? allGames.filter(game => game.status.started === false): [];
}

export const getGamesFinishedWorldCup = async (matchDay) => {
    const allGames = await fetchGamesByDay(matchDay);
    return allGames ? allGames.filter(game => game.status.finished === true): [];
}

export const getGamesOngoingWorldCup = async () => {
    const allGames = await fetchGamesByDay();
    return allGames ? allGames.filter(game => (game.status.started === true) && (game.status.finished === false)): [];
}

export const betChanged = async (betId, newBet, user) => {
    try {
        const response = await fetch(`${BACKEND_URL}bets/${betId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            predictedResult: newBet,
            user,
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to update bet');
        }
  
        alert('Bet updated successfully');
      } catch (error) {
        console.error('Error updating bet:', error);
        alert('Failed to update bet');
      }
}

export const getBetsByUserId = async (userId) => {
    try {
        const response = await fetch(`${BACKEND_URL}bets/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to update bet');
        }
        const bets = await response.json();
        return bets
      } catch (error) {
        console.error('Error getting user bets:', error);
        alert('Failed to get bets');
      }
}