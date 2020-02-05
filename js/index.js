document.addEventListener("DOMContentLoaded", function() {
    //////URLs
    const urlMonsters = 'http://localhost:3000/monsters'


    //// divs HTML
    const containerMonster = document.getElementById('monster-container')
    const createMonster = document.getElementById('create-monster')

    let pageNum = 1;

    function fetch20MonstersPage() {
        fetch(urlMonsters + `/?_limit=2&_page=${pageNum}` )
            .then(resp => resp.json())
            .then(json => allMonsters(json))
       
    }

    ///////////// render Monsters //////////////////////////////////

    function allMonsters(json){
        for(const monster of json){
            renderMonster(monster)
        }
    }

    function renderMonster(monster) {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const h4 = document.createElement('h4')
        const p = document.createElement('p')

        h2.innerText = monster.name;
        h4.innerText = monster.age;
        p.innerText = monster.description;

        div.append(h2,h4,p)
        containerMonster.appendChild(div)
    }

    //////////////////// Create Monsters //////////////////////////

    function createForm(){
        const form = document.createElement('form')
        const nameInput = document.createElement('input')
        const ageInput = document.createElement('input')
        const descriptionInput = document.createElement('input')
        const submitButton = document.createElement('button')
        
        form.id = "monster-form"

        nameInput.id = "name"
        nameInput.placeholder = "Monster name"

        ageInput.id = "age"
        ageInput.placeholder = "Monster age"

        descriptionInput.id = "description"
        descriptionInput.placeholder = "Monster description"

        

        submitButton.innerText = "Create"

        form.append(nameInput,ageInput,descriptionInput,submitButton)
        createMonster.appendChild(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault()


            const name = nameInput.value
            const age = ageInput.value
            const description = descriptionInput.value

            const newMonster = {
                name: name,
                age: age,
                description: description
            }
            createNewMonster(newMonster)
            .then(monster => renderMonster(monster))
        })
    }

    function createNewMonster(newMonster) {
        return fetch(urlMonsters, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
            body: JSON.stringify(newMonster)
        })
        .then(resp => resp.json())
    }

    ///foward Button

    const fowardButton = document.getElementById('forward')
    fowardButton.addEventListener('click', () => {
        containerMonster.innerHTML = ""
        forward()

    })

    function forward() {
        ++pageNum

        
        // let child = containerMonster.lastElementChild;
        // while(child) {
        //     containerMonster.remove(child);
        //     child = containerMonster.lastElementChild;
        // }

        fetch20MonstersPage()
    }
    



    createForm()
    fetch20MonstersPage()
});