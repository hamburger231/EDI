import OpenAI from "openai";

const { animalJob, animalSpecies, animalIndex } = require('./index.html')

const image_gen = async()=>{
    const response = await openai.createImage({
        model: "dall-e-3",
        prompt: "a 3d render of a "+ animalSpecies[animalIndex] + " dressed up and working as a " + animalJob[animalIndex] + "who is " + animalAge[animalIndex] + "years old",
        n: 1,
        size: "1024x1792",
    });
    let image_url = response.data.data[0].url;
    let obraz = this.shadowRoot.getElementsByClassName("pudelko")[0]
    obraz.src = image_url
}
function changeAnimal() {
    if(animalIndex < 99) {
        animalIndex = animalIndex + 1;
        document.getElementById("animalInfo").innerHTML = animalInfo[animalIndex]
        document.getElementById("animalDistance").innerHTML = animalDistance[animalIndex]
        // image_gen().then(r =>  )
    }else{
        animalIndex = 0;
        document.getElementById("animalInfo").innerHTML = animalInfo[animalIndex]
        document.getElementById("animalDistance").innerHTML = animalDistance[animalIndex]
        // image_gen().then(r => )
    }
}

function apendowanie() {
    let table = document.getElementById("TABELSON");
    table.append()
}
const animalInfo = [];
const animalDistance = [];
const animalSpecies = [];
const animalJob = [];
const animalAge = [];

let animalIndex = 0;
async function getJson() {
    try {
        const response = await fetch(
            'https://my.api.mockaroo.com/terra_linked.json?key=ce5f1ce0',
            {
                method: 'GET',
            },
        );

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
getJson().then(data => {
    data.forEach(user => {
        animalInfo.push(user.name + ", " + user.age + "<br>" + user.job);
        animalDistance.push(user.miles_away);
        animalSpecies.push(user.species);
        animalJob.push(user.job);
        animalAge.push(user.age);

    });

    let defaultName = document.getElementById("animalInfo");
    defaultName.innerHTML = animalInfo[0];

    let defaultDistance = document.getElementById("animalDistance");
    defaultDistance.innerHTML = animalDistance[0];
});



getJson().then(data => {
    console.log(data);

    let table = '<table style="border-collapse: collapse;">';

    table += `
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Color</th>
        <th>Weight</th>
        <th>Species</th>
        <th>Is a mammal</th>
        <th>Habitat</th>
        <th>Average lifespan</th>
        <th>Job</th>
        <th>Distance</th>
      </tr>
    </thead>

    <tbody>
  `;

    data.forEach(user => {
        table += `
      <tr>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.color}</td>
        <td>${user.weight}</td>
        <td>${user.species}</td>
        <td>${user.is_mammal}</td>
        <td>${user.habitat}</td>
        <td>${user.average_lifespan}</td>
        <td>${user.job}</td>
        <td>${user.miles_away}</td>
      </tr>
    `;
    });

    table += `
    </tbody>
  </table>
  `;

    const mockarooTableData = document.getElementById('mockaroo-table');
    mockarooTableData.innerHTML = table;
});
