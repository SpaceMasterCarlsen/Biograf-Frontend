document.addEventListener("DOMContentLoaded", function () {
    // Select buttons
    const movieBtn = document.getElementById("movieBtn");
    const theaterBtn = document.getElementById("theaterBtn");
    const showtimesBtn = document.getElementById("showtimesBtn");
    const adminReturnBtn = document.getElementById("admin-return-button");
    const showTimeCreate = document.getElementById("create-showtimeBtn");
    const theaterCreate = document.getElementById("create-theaterBtn");
    const theaterOverview = document.getElementById("theater-overviewBtn");
    const movieCreate = document.getElementById("create-movieBtn");
    const movieOverview = document.getElementById("movie-overviewBtn");

    // Navigation event listeners
    if (movieBtn) movieBtn.addEventListener("click", () => window.location.href = "movies-nav-page.html");
    if (theaterBtn) theaterBtn.addEventListener("click", () => window.location.href = "theaters-nav-page.html");
    if (showtimesBtn) showtimesBtn.addEventListener("click", () => window.location.href = "showtimes-nav-page.html");
    if (adminReturnBtn) adminReturnBtn.addEventListener("click", () => window.location.href = "admin.html");
    if (showTimeCreate) showTimeCreate.addEventListener("click", () => window.location.href = "create-showtime.html");
    if (theaterCreate) theaterCreate.addEventListener("click", () => window.location.href = "create-theater.html");
    if (theaterOverview) theaterOverview.addEventListener("click", () => window.location.href = "view-theaters.html"); // Fixed typo
    if (movieCreate) movieCreate.addEventListener("click", () => window.location.href = "create-movie.html");
    if (movieOverview) movieOverview.addEventListener("click", () => window.location.href = "view-movies.html");
});
