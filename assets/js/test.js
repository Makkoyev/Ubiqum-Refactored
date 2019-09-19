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
    let members = data.results[0].members;
    document.getElementById('selector').innerHTML = statesMenu(members);
    document.getElementById('filters').addEventListener('click', () => regenerateTable(members));
    document.getElementById('selector').addEventListener('change', () => regenerateTable(members));
    generateTable(members);
});

function statesMenu(members){
    // Filter states
    let statesMenu = `<option>All</option>`;
    let mapStates = members.map(member => member.state).sort();
    let states = [... new Set(mapStates)].forEach(element => {
        statesMenu += `<option value=${element}> ${element} </option>`;
    });
    return statesMenu;
}

function partyFilter(members){
    let cbs = Array.from(document.querySelectorAll('input[name=checkbox]:checked')).map(cb => cb.value);
    let filter = members.filter(member => cbs.includes(member.party));
    if (cbs.length === 0) {return members;}
    else {return filter;}
}

function stateFilter(members){
    var statesMenu = document.getElementById('selector');
    var value= statesMenu[statesMenu.selectedIndex].value;
    let filter = members.filter (member => member.state === value);
    if (value === "All"){return members;}
    else {return filter;}
}

function regenerateTable(members){
    var filterParty = stateFilter(members);
    var filterState = partyFilter(filterParty);
    var result = filterState;
    if (result === 0) {generateTable(members);}
    else {generateTable(result);}  
}

function generateTable(members){
    let table = document.getElementById('table');
    table.innerHTML = '';
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