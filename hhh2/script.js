let superheroes = [];

// Cargar los datos desde el archivo JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        superheroes = data;
        renderSuperheroes(superheroes);  // Mostrar todos los héroes al cargar
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

// Función para renderizar los superhéroes
function renderSuperheroes(heroes) {
    const container = document.getElementById('superhero-container');
    container.innerHTML = ''; // Limpiar el contenido

    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${hero.image}" alt="${hero.superhero}">
            <h2>${hero.superhero}</h2>
            <p><strong>Alter ego:</strong> ${hero.alter_ego}</p>
            <p><strong>Primera aparición:</strong> ${hero.first_appearance}</p>
            <p><strong>Personajes:</strong> ${hero.characters}</p>
            <p><strong>Editorial:</strong> ${hero.publisher}</p>
        `;

        container.appendChild(card);
    });
}

// Función para generar un puntaje aleatorio entre 1 y 100
function generateRandomScore() {
    return Math.floor(Math.random() * 100) + 1;
}

// Función para seleccionar un héroe al azar de una lista filtrada
function getRandomHero(heroes) {
    const randomIndex = Math.floor(Math.random() * heroes.length);
    return heroes[randomIndex];
}

// Función para el VS entre un héroe de DC y uno de Marvel
function vsBattle() {
    const dcHeroes = superheroes.filter(hero => hero.publisher === "DC Comics");
    const marvelHeroes = superheroes.filter(hero => hero.publisher === "Marvel Comics");

    if (dcHeroes.length > 0 && marvelHeroes.length > 0) {
        const dcHero = getRandomHero(dcHeroes);
        const marvelHero = getRandomHero(marvelHeroes);

        const dcScore = generateRandomScore();
        const marvelScore = generateRandomScore();

        let result = '';
        if (dcScore > marvelScore) {
            result = `${dcHero.superhero} (DC) gana con ${dcScore} puntos contra ${marvelHero.superhero} (Marvel) con ${marvelScore} puntos.`;
        } else if (marvelScore > dcScore) {
            result = `${marvelHero.superhero} (Marvel) gana con ${marvelScore} puntos contra ${dcHero.superhero} (DC) con ${dcScore} puntos.`;
        } else {
            result = `¡Empate! ${dcHero.superhero} (DC) y ${marvelHero.superhero} (Marvel) tienen ${dcScore} puntos.`;
        }

        // Limpiar el contenedor de héroes
        const container = document.getElementById('superhero-container');
        container.innerHTML = ''; // Limpiar contenido anterior

        // Crear contenedor para héroes enfrentados
        const vsHeroContainer = document.createElement('div');
        vsHeroContainer.className = 'vs-hero-container';

        // Crear tarjeta para el héroe de DC
        const dcHeroCard = document.createElement('div');
        dcHeroCard.className = 'card';
        dcHeroCard.innerHTML = `
            <img src="${dcHero.image}" alt="${dcHero.superhero}">
            <h2>${dcHero.superhero}</h2>
            <p><strong>Alter ego:</strong> ${dcHero.alter_ego}</p>
            <p><strong>Primera aparición:</strong> ${dcHero.first_appearance}</p>
            <p><strong>Personajes:</strong> ${dcHero.characters}</p>
            <p><strong>Editorial:</strong> ${dcHero.publisher}</p>
            <p><strong>Puntaje:</strong> ${dcScore}</p>
        `;
        
        // Crear tarjeta para el héroe de Marvel
        const marvelHeroCard = document.createElement('div');
        marvelHeroCard.className = 'card';
        marvelHeroCard.innerHTML = `
            <img src="${marvelHero.image}" alt="${marvelHero.superhero}">
            <h2>${marvelHero.superhero}</h2>
            <p><strong>Alter ego:</strong> ${marvelHero.alter_ego}</p>
            <p><strong>Primera aparición:</strong> ${marvelHero.first_appearance}</p>
            <p><strong>Personajes:</strong> ${marvelHero.characters}</p>
            <p><strong>Editorial:</strong> ${marvelHero.publisher}</p>
            <p><strong>Puntaje:</strong> ${marvelScore}</p>
        `;

        vsHeroContainer.appendChild(dcHeroCard);
        vsHeroContainer.appendChild(marvelHeroCard);
        
        // Agregar resultados al contenedor
        const vsResultContainer = document.getElementById('vs-result');
        vsResultContainer.innerHTML = ''; // Limpiar contenido anterior
        vsResultContainer.appendChild(vsHeroContainer);
        vsResultContainer.appendChild(document.createElement('p')).textContent = result; // Mostrar resultado
    }
}

// Eventos para los botones de filtro
document.getElementById('filter-dc').addEventListener('click', () => {
    const dcHeroes = superheroes.filter(hero => hero.publisher === "DC Comics");
    renderSuperheroes(dcHeroes);
});

document.getElementById('filter-marvel').addEventListener('click', () => {
    const marvelHeroes = superheroes.filter(hero => hero.publisher === "Marvel Comics");
    renderSuperheroes(marvelHeroes);
});

document.getElementById('filter-all').addEventListener('click', () => {
    renderSuperheroes(superheroes);  // Mostrar todos los héroes
});

// Evento para el enfrentamiento VS
document.getElementById('vs-button').addEventListener('click', vsBattle);
