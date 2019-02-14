let gridHeight;
let matrix;
let rows;
let cols;
let gen;
let cont;

function iterate() {
    let ref = []
    for(let y=0;y<rows;y++){
        let row = [];
        for(let x=0;x<cols;x++){
            row.push(matrix[y][x]);
        }
        ref.push(row);
    }
    
    for(let y=0;y<rows;y++){
        for(let x=0;x<cols;x++){
            matrix[y][x] = lifeCheck(x,y,ref);
        }
    }
    gen += 1;
    refresh();
}

function lifeCheck(x,y,ref){
    let neighbors = 0;
    let alive = ref[y][x];
    let output;

    if (x != 0){
        (ref[y][x-1]) ? neighbors += 1 : true;
    }
    if (x != cols-1){
        (ref[y][x+1]) ? neighbors += 1 : true;
    }
    if (y != 0){
        (ref[y-1][x]) ? neighbors += 1 : true;
    }
    if (y != rows-1){
        (ref[y+1][x]) ? neighbors += 1 : true;
    }
    if (x != 0 && y != 0){
        (ref[y-1][x-1]) ? neighbors += 1 : true;
    }
    if (x != cols-1 && y != 0){
        (ref[y-1][x+1]) ? neighbors += 1 : true;
    }
    if (x != 0 && y != rows-1){
        (ref[y+1][x-1]) ? neighbors += 1 : true;
    }
    if (x != cols-1 && y != rows-1){
        (ref[y+1][x+1]) ? neighbors += 1 : true;
    }

    if(alive){
        if(neighbors < 2 || neighbors > 3){
            output = false;
        } else {
            output = true;
        }
    } else {
        if(neighbors == 3){
            output = true;
        }
    }

    return output;
}

function setup(x,y) {
    rows = y;
    cols = x;
    matrix = [];
    var grid = document.getElementById("grid");
    grid.style.height = "100vw";
    grid.style.gridTemplateColumns = "repeat(" + x.toString() + ",1fr)";
    grid.style.gridTemplateRows = "repeat(" + y.toString() + ",1fr)";

    for(let yCount=0;yCount<y;yCount++){
        let row = [];
        for(let xCount=0;xCount<x;xCount++){
            var square = document.createElement("div");
            square.classList.add("dead");
            square.id = xCount + "-" + yCount;
            row.push(false);
            square.addEventListener('click', (e) => {
                e.target.classList.toggle("dead");
                e.target.classList.toggle("marked");
                let loc = e.target.id.split("-");
                let xpos = parseInt(loc[0]);
                let ypos = parseInt(loc[1]);
                console.log(ypos);
                matrix[ypos][xpos] = !matrix[ypos][xpos];
                console.log(matrix.toString());
            });
            grid.appendChild(square);
        }
        matrix.push(row);
    }
}

function refresh() {
    var genLabel = document.getElementById("gen");
    genLabel.innerHTML = gen;
    var grid = document.getElementById("grid");
    while(grid.lastChild){
        grid.removeChild(grid.lastChild);
    }

    for(let yCount=0;yCount<rows;yCount++){
        for(let xCount=0;xCount<cols;xCount++){
            var square = document.createElement("div");
            if(matrix[yCount][xCount]){
                square.classList.add("marked");
            } else {
                square.classList.add("dead");
            }
            square.id = xCount + "-" + yCount;
            square.addEventListener('click', (e) => {
                e.target.classList.toggle("dead");
                e.target.classList.toggle("marked");
                let loc = e.target.id.split("-");
                let xpos = parseInt(loc[0]);
                let ypos = parseInt(loc[1]);
                console.log(ypos);
                matrix[ypos][xpos] = !matrix[ypos][xpos];
                console.log(matrix.toString());
            });
            grid.appendChild(square);
        }
    }
}

function anim() {
    let control = document.getElementById("control");
    let button  = document.createElement("button");
    button.innerHTML = "Stop";
    button.style.display = "inline";
    button.onclick = stopAnim;
    control.appendChild(button);
    cont = window.setInterval(iterate, 1000);
}
function stopAnim(){
    let control = document.getElementById("control");
    window.clearInterval(cont);
    control.removeChild(control.lastChild);
}

function reset(){
    gen = 0;
    var genLabel = document.getElementById("gen");
    genLabel.innerHTML = gen;
    var grid = document.getElementById("grid");
    while(grid.lastChild){
        grid.removeChild(grid.lastChild);
    }
    var response = prompt("Enter canvas dimensions in format x,y");
    var dimensions = response.split(",");
    setup(parseInt(dimensions[0]), parseInt(dimensions[1]));     
}

function init(){
    gen = 0;
    var button = document.getElementById("reset-button");
    button.innerHTML = "Reset Canvas";
    var response = prompt("Enter canvas dimensions in format x,y");
    var dimensions = response.split(",");
    button.onclick = reset;
    setup(parseInt(dimensions[0]), parseInt(dimensions[1]));   
}