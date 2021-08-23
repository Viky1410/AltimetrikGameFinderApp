let page = 1;
function bringGames(page){
    const url = 'https://api.rawg.io/api/games?key=138399483b1247ed9e1af30fab9ca6b6&page=' + page;
    fetch (url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => { 
        console.error('Error:', error)
        alert("This is an error");
    })
    .then(games => {
        games.results.forEach((element, index) => {
            console.log(element);
            let gameTitle = element.name;
            let releasedDate = element.released;
            let genres = "";
            for (let i=0; i < element.genres.length; i++){
                genres = genres.concat(element.genres[i].name);
                if (i < element.genres.length-1){
                    genres = genres.concat(", ");
                }
            }
            let ranking = index+1;
            let img = element.background_image;
            
            let card = ' <div class="col"> ' +
            ' <div class="card h-100"> ' +
              ' <img src="'+ img +'" class="card-img-top img-card"> ' +
            ' <div class="card-body"> ' +
                '  <h5 class="card-title">'+ gameTitle +' <span class="ranking"> '+ "#" + ranking +' </span> </h5> ' + 
                ' <p class="card-text">'+ "Released date " + releasedDate +'</p> ' +
                ' <p class="separator-element"> <div class="separator-border"> </div> </p> ' +
                ' <p class="card-text">'+ "Genres " + genres  +'</p> ' +
                ' <p class="separator-element"> <div class="separator-border"> </div> </p> ' +
                ' </div> ' +
                ' /div> ' +
            '  </div> ' 
            console.log(card);
            document.getElementById('cards').insertAdjacentHTML("beforeend", card);
        });
    });
}
bringGames(page++);

window.addEventListener('scroll',()=>{
    const {scrollHeight,scrollTop,clientHeight} = document.documentElement;
    if(scrollTop + clientHeight > scrollHeight - 5){
        bringGames(page++);

    }
});