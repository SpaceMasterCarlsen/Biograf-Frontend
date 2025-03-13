document.addEventListener("DOMContentLoaded", function () {
    const buttonActions = {
        "movieBtn": "movies-nav-page.html",
        "theaterBtn": "theaters-nav-page.html",
        "showtimesBtn": "showtimes-nav-page.html",
        "admin-return-button": "admin.html",
        "create-showtimeBtn": "create-showtime.html",
        "create-theaterBtn": "create-theater.html",
        "theater-overviewBtn": "view-theaters.html", // Fixed typo
        "create-movieBtn": "create-movie.html",
        "movie-overviewBtn": "view-movies.html"
    };

    Object.keys(buttonActions).forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener("click", () => window.location.href = buttonActions[id]);
        }
    });
});

