// Check for window name for fetching data
if (window.location.href.includes("senate") == true) {
    var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else {
    var url = "https://api.propublica.org/congress/v1/113/house/members.json"
}

async function loadData() {
    const response = await fetch(url, {
        headers: {
            "x-api-key": "2VpGVQrEodHgSlKxaOdIhIwh9UWtKcGh9K2fRfAL"
        }
    });
    table.innerHTML = 'Data is loading...';
    return await response.json();
}

loadData().then(data => {
    let selector = document.getElementById('selector');
    let members = data.results[0].members;
    console.log(members);
    //Invoke createStateFilter
    createStateFilter(members);
    // Table generation
    createCongressTable(members);
});

function createStateFilter(members){
    // Filter states
    let mapStates = members.map(member => member.state).sort();
    let states = [... new Set(mapStates)].forEach(element => {
        selector.innerHTML += `<option> ${element} </option>`;
    });
}

function createCongressTable(members){
    let table = document.getElementById('table');
    table.innerHTML = '';
    console.log(table.innerHTML);
    members.forEach(element => {
        fullName = () => {
            if (element.middle_name == null) {
                return fullName = `${element.first_name} ${element.last_name}`;
            } else {
                return fullName = `${element.first_name} ${element.middle_name} ${element.last_name}`;
            }
        }
        table.innerHTML += `<tr><td> ${fullName()} </td><td> ${element.party} </td><td> ${element.state} </td><td> ${element.seniority} </td><td> ${element.votes_with_party_pct} </td></tr>`;
    })
}










// Filter states 2
/*

let statesData = [];
members.forEach(element => {
    statesData.push(element.state);
});
let states = [...new Set(statesData)].sort()
states.forEach(element => {
    selector.innerHTML += `<option> ${element} </option>`;
});

*/