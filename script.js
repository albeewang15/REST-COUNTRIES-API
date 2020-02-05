//Get access to html
const app = document.getElementById('root');


// Create container div and set class attribute
const container = document.createElement('div');
container.setAttribute('class', 'container');

//Place container div in html
app.appendChild(container);

// Create a request variable and assign new XMLHTTPRequest object to it
var request = new XMLHttpRequest()

// Open new connection, using GET request on the URL endpoint
request.open('GET', 'https://restcountries.eu/rest/v2/all', true)

request.onload = function(){
    //Begin accessing JSON data 
    var data = JSON.parse(this.response)

    if(request.status >= 200 && request.status < 400){
        data.forEach(country => {
            //INDEX PAGE////
            //Create a div with a card class
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            //create an img and set the src to country flag
            const countryFlag = document.createElement('img');
            countryFlag.src = country.flag;

            //create a div for card content
            const cardContent = document.createElement('div');
            cardContent.setAttribute('class', 'card-content');

            //Create an h2 and set the text content to country name
            const countryName = document.createElement('h2');
            countryName.setAttribute('class', 'country-name');
            countryName.textContent = country.name;

            //Create an p and set the text content to population
            const countryPopulation = document.createElement('p');
            countryPopulation. textContent = 'Population: ' + country.population;

            //Create an p and set the text content to region
            const countryRegion = document.createElement('p');
            countryRegion.setAttribute('class', 'country-region');
            countryRegion. textContent = 'Region: ' + country.region;

            //Create an p and set the text content to capital
            const countryCapital = document.createElement('p');
            countryCapital. textContent = 'Capital: ' + country.capital;

            //Append the cards to container element
            container.appendChild(card)

            //Each card will have a country name 
            card.appendChild(countryFlag)
            card.appendChild(cardContent)
            
            //Each card will have card content
            cardContent.appendChild(countryName)
            cardContent.appendChild(countryPopulation)
            cardContent.appendChild(countryRegion)
            cardContent.appendChild(countryCapital)   
            
            
             //DISPLAY MODAL
            const modal = document.getElementById('modal');
            card.addEventListener("click", displayModal);

            //modal function
            function displayModal(){
                //display modal
                modal.style.display = "block";
                const countryDetail = document.getElementById('country-detail');
                //create modal flag
                const modalFlag = document.getElementById('modal-flag');
                const modalFlagImg= document.createElement('img');
                modalFlagImg.src = country.flag;

                //create name
                const modName = document.createElement('h2');
                modName.setAttribute('class', 'mod-country-name');
                modName.textContent = country.name;

                modalFlag.appendChild(modalFlagImg);
                countryDetail.appendChild(modName);

                //create modal country details
                const modNativeName = document.createElement('p');
                modNativeName.textContent = 'Native Name: ' + country.nativeName;
                const modPopulation = document.createElement('p');
                modPopulation.textContent = 'Population: ' + country.population;
                const modRegion = document.createElement('p');
                modRegion.textContent = 'Population: ' + country.region;
                const modSubRegion = document.createElement('p');
                modSubRegion.textContent = 'Sub Region: ' + country.subregion;
                const modCapital = document.createElement('p');
                modCapital.textContent = 'Captial: ' + country.capital;
                const modTopLevelDomain = document.createElement('p');
                modTopLevelDomain.textContent = 'Top Level Domain: ' + country.topLevelDomain;
                const modCurrencies = document.createElement('p');
                modCurrencies.textContent = 'Currencies: ' + country.currencies[0].name;
                const modLanguages = document.createElement('p');
                modLanguages.textContent = 'Languages: ' + country.languages[0].name;

                //show country details
                countryDetail.appendChild(modNativeName);
                countryDetail.appendChild(modPopulation);
                countryDetail.appendChild(modRegion);
                countryDetail.appendChild(modSubRegion);
                countryDetail.appendChild(modCapital);
                countryDetail.appendChild(modTopLevelDomain);
                countryDetail.appendChild(modCurrencies);
                countryDetail.appendChild(modLanguages);

                //Close modal
                const closeBtn = document.getElementById('close-btn');
                closeBtn.addEventListener("click", closeModal);

                function closeModal(){
                    //remove previous modal flag
                    modalFlag.innerHTML = "";
                    //remove previous country details
                    countryDetail.innerHTML = "";
                    //close modal
                    modal.style.display = "none";
                }
            }

        })
    } else {
        //Display error message on page
        const errorMessage = document.createElement('h1');
        errorMessage.textContent = "GAH, it's not working!"
        app.appendChild(errorMessage)
    }
}

request.send()


//Country search feature
function countrySearch(){
    let input = document.getElementById('search-bar').value;
    let x = document.getElementsByClassName('country-name');
    //loop through country names
    for(i = 0; i < x.length; i++){
        //if search value equals country name 
        if(x[i].innerHTML.toLowerCase().includes(input.toLowerCase())){
            //display cards
            x[i].parentElement.parentElement.style.display = 'block';
            //otherwise hide cards
        } else {
            x[i].parentElement.parentElement.style.display = 'none';
        }
    }
}

//Country region filter feature
function regionFilter(){
    //select pulldown
    let regionPulldown = document.getElementById('region-filter');
    //get selected pulldown value
    let selectedRegion = regionPulldown.options[regionPulldown.selectedIndex].value;
    //get card region
    let regionName = document.getElementsByClassName('country-region');

    for(i = 0; i < regionName.length; i++){
        //if All Region is selected, display all cards
        if(selectedRegion == 'All'){
            regionName[i].parentElement.parentElement.style.display = 'block';
        //if card region name equals to selected region name
        } else if(regionName[i].innerHTML.toLowerCase().includes(selectedRegion.toLowerCase())){
                //display cards
                regionName[i].parentElement.parentElement.style.display = 'block';
        } else {
            //otherwise hide cards
            regionName[i].parentElement.parentElement.style.display = 'none';
        }
    }
}

//Toggle to change theme color
const html = document.getElementById('main');
const toggle = document.getElementById('mode-switch');
toggle.addEventListener('click', toggleTheme);

function toggleTheme(){
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'light-mode' ? 'dark-mode' : 'light-mode');
}


