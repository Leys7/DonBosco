let resources = 100;
let hope = 0;
let kids = 0;
let selectedIndex = -1;

const buildings = {
    lab: { name: "LAB", cost: 30, hope: 5, kids: 10, icon: "🛠️" },
    ora: { name: "ORATORIO", cost: 20, hope: 15, kids: 5, icon: "⚽" },
    dorm: { name: "ALLOGGI", cost: 40, hope: 5, kids: 20, icon: "🛏️" }
};

function selectPlot(index) {
    const plots = document.querySelectorAll('.plot');
    if (plots[index].classList.contains('built')) return;
    
    plots.forEach(p => p.style.backgroundColor = "#e2e8f0");
    plots[index].style.backgroundColor = "#dbeafe";
    selectedIndex = index;
}

function build(type) {
    if (selectedIndex === -1) { 
        alert("Seleziona prima un terreno grigio!"); 
        return; 
    }
    
    const b = buildings[type];

    if (resources >= b.cost) {
        resources -= b.cost;
        hope += b.hope;
        kids += b.kids;
        
        const plot = document.querySelectorAll('.plot')[selectedIndex];
        plot.classList.add('built');
        plot.innerHTML = `${b.icon}<br>${b.name}`;
        
        updateStats();
        selectedIndex = -1;
        checkWin();
    } else {
        alert("Mancano risorse! Aspetta la Provvidenza...");
        if(Math.random() > 0.5) { resources += 20; updateStats(); }
    }
}

function updateStats() {
    document.getElementById('res').innerText = resources;
    document.getElementById('hope').innerText = hope;
    document.getElementById('kids').innerText = kids;
}

function checkWin() {
    if (hope >= 40 && kids >= 40) {
        document.getElementById('win-modal').style.display = "block";
    }
}
