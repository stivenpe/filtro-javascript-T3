
document.addEventListener("DOMContentLoaded", function() {

    fetch('C:\Users\jeisson\Desktop\filtro-js\filtro-javascript-T3\data.json')

    .then(response => response.json())
    
    .then(data => {

    const heroesInfoDiv = document.getElementById('heroes-info');
   
    heroesInfoDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>personaje:</strong> ${data.personaje}</p>
    <p><strong>estudios:</strong> ${data.estudios}</p>
    <p><strong>nombre:</strong> ${data.nombre}</p>
    <p><strong>habilidades:</strong> ${data.habilidades}</p>
    <p><strong>aparicion:</strong> ${data.aparicion}</p>
    <p><strong>img:</strong> ${data.img}</p>
    <h3> hu:</h3>
    <ul>
    <li><a href="${data.links.img}" target="_blank">img</a></li>
    
    </ul>
    `;
    })
    
    .catch(error => {
    console.error('Error al obtener los datos:', error);
    });
});