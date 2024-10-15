// Your code here
//fetch data for all films
const renderFilms = async () => {
    let uri = 'http://localhost:3000/films'; //endpoint for all films
    const response = await fetch(uri);
    const films = await response.json(); // films is an array


    let filmList = document.querySelector("#films");
    films.forEach(film => {
        //create an <li> element...make it child element of <ul>...#films
        let filmItem = document.createElement("li");
        filmItem.classList.add("film", "item");
        filmList.appendChild(filmItem);
        
        // Create an anchor tag...make it a child element of <li>
        let link = document.createElement("a");
        link.classList.add("links");
        link.textContent = film.title;
        link.href = "#";
        filmItem.appendChild(link);
        
        
        //update movie details when clicked
        link.addEventListener("click", () => updateFilmDetails(film));
    });

    //details of the first film loaded 1st on page
    updateFilmDetails(films[0]);
};

//update the page content with selected film details
const updateFilmDetails = (film) => {
    //title
    let movieTitle = document.querySelector("#title");
    movieTitle.textContent = film.title;
    
    //runtime
    let runtime = document.querySelector("#runtime");
    runtime.textContent = `${film.runtime} minutes`;
    
    //description
    let description = document.querySelector("#film-info");
    description.innerHTML = `<p>${film.description}</p>`;
    
    //showtime
    let showtime = document.querySelector("#showtime");
    showtime.textContent = film.showtime;
    
    //ticket-num
    let ticketNumber = document.querySelector("#ticket-num");
    ticketNumber.textContent = (film.capacity - film.tickets_sold);
    
    //poster
    let poster = document.querySelector("#poster");
    poster.src = film.poster;
    
    //Reset button...remove any listeners made b4
    let buyBtn = document.querySelector("#buy-ticket");
    buyBtn.textContent = "Buy Ticket"; //new button text
    let newBuyBtn = buyBtn.cloneNode(true); //Cloned button...removes all previous listeners
    buyBtn.replaceWith(newBuyBtn); //Replace the button with cloned one
    
    //new listener for purchases
    newBuyBtn.addEventListener("click", () => handleTicketPurchase(film));
};

//ticket purchase
const handleTicketPurchase = (film) => {
        let ticketNumber = document.querySelector("#ticket-num");
        let remainingTickets = Number(ticketNumber.textContent);

        if(remainingTickets <= 0){
            //Sold out
            document.querySelector("#buy-ticket").textContent = "Sold Out";
        }else{
            //decrease the number of tickets available
            remainingTickets= remainingTickets- 1;
            ticketNumber.textContent = remainingTickets;
            
            // Update the tickets_sold property of the film
            film.tickets_sold= film.tickets_sold + 1;
        }
};

//films displayed when the page when loaded
window.addEventListener("DOMContentLoaded", () => renderFilms());

