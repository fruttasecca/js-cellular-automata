/*
Automata rules to decide what status to assume based on current status and the status of the left and right neighbour. Accessed with rules[left][myStatus][right], where left/myStatus/right can be 0 or 1.
Values returned will be 1 or 0, what status to assume.
*/
var rules = 
[   
	[[0,1],[0,1]],
	[[0,1],[0,1]]
];

//colors to be used to fll cells
var colors = ["green","black"];

//contains the cells
var cells;

//number of cells (columns, since its going to evolve vertically
var cellNumber = 1000;

//number of steps to make (rows, each row is an evolution based on rules from the var rules)
var steps = 500;

//ctx of the canvas, it's the object actually used to draw stuff
var ctx = document.getElementById("canvas").getContext("2d");


////////////////////control

/**
 * @brief Initializes the cells, every cell will have a status equal to the status param.
 * @param in int n Number of cells to init.
 * @param in int status Status that every cell will have after initialization.
 */
function initCells(n,status)
{
	cells = new Array(n);
	for(var i=0; i < cells.length; i++)
		cells[i] = status;
}

/**
 * @brief Initializes the cells randomly, it's basically an array of n elements of values 0|1
 * @param in int n Number of cells to init.
 */
function initCellsRandom(n)
{
	cells = new Array(n);
	for(var i = 0; i < cells.length; i++)
		cells[i] = Math.round(Math.random());
}

/**
 * @brief Initializes the cellular automata rules randomly.
 */
function randomRules()
{
	/*looks like O(n^3) but its just 8 elements, n = 2, this was the lazy way to write it*/
	for(var i=0;i<rules.length;i++)
		for(var u=0;u<rules[i].length;u++)
			for(var z=0;z<rules[i][u].length;z++)
				rules[i][u][z] = Math.round(Math.random());
}

/**
 * @brief Some brief description.
 * @param [in|out] type parameter_name Parameter description.
 * @param [in|out] type parameter_name Parameter description.
 * @return Description of returned value.
 */
function nextStep()
{
	var tmp = new Array(cells.length);
	tmp[0] = rules[cells[cells.length-1]][cells[0]][cells[1]];
	tmp[tmp.length-1] = rules[cells[cells.length-2]][cells[cells.length-1]][cells[0]];
	for(var i = 1, n = cells.length-1; i < n ; i++)
		tmp[i] = rules[cells[i-1]][cells[i]][cells[i+1]];
	cells = tmp;
}

/**
 * @brief Keeps evolving the cellular automata, drawing each step under the previous one.
 * @param in int n Number of steps to do.
 * @param in int size Size in pixels of an edge of a square(cell).
 * @return Description of returned value.
 */
function doNSteps()
{
	size = 2;
	drawStep(0,20);
	for(var i =0; i < steps; i++)
	{
		nextStep();
		drawStep(i, size);
	}
}

/**
 * @brief Draws in the canvas evolving vertically (going downward) in a manner based on the rules.
 */
function run()
{
	//init first line of cells
	initCellsRandom(cellNumber);
	//get window size to decide canvas size
	sizeCanvas();
	//evolve the automata
	doNSteps();
}

/**
 * @brief Draws in the canvas evolving vertically (going downward) starting from random rules.
 */
function randomAndRun()
{
	randomRules();
	//update the drawed rules in the html page based on the state of the rules matrix
	readRules();
	run();
}

/**
 * @brief Draws in the canvas evolving vertically (going downward) after randomizing the colors.
 */
function randomColorAndRun()
{
	colors[0] = getRandomColor();
	colors[1] = getRandomColor();
	readRules();//to update colors of squares controlling the rules
	updateRulesSquaresColors();//to update colors of the upper squares of the rules (not the clickable ones)
	run();
}

/**
 * @brief Generate a random color.
 * @return A string representing a random color (RGB).
 */
function getRandomColor() 
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) 
        color += letters[Math.floor(Math.random() * letters.length)];
    return color;
}

/**
 * @brief Inverts the rules based on the n1, n2, n3 arguments, wich are the coordinates in the matrix, each argument is either 1 or 0 based on the state of the left square, middle square and right square of the rule clicked.
 * @return returns the new value
 */
function changeRule(n1,n2,n3)
{
    return rules[n1][n2][n3] = rules[n1][n2][n3] ? 0 : 1;
}

/**
 * @brief Stuff to be done on page load
 */
function afterLoad()
{
	document.getElementById("0").onclick = invertSquare;
	document.getElementById("1").onclick = invertSquare;
	document.getElementById("2").onclick = invertSquare;
	document.getElementById("3").onclick = invertSquare;
	document.getElementById("4").onclick = invertSquare;
	document.getElementById("5").onclick = invertSquare;
	document.getElementById("6").onclick = invertSquare;
	document.getElementById("7").onclick = invertSquare;
	document.getElementById("run").onclick = run;
	document.getElementById("random").onclick = randomAndRun;
	document.getElementById("randomColors").onclick = randomColorAndRun;
	updateRulesSquaresColors();//to update colors of the upper squares of the rules (not the clickable ones)
	randomAndRun();
}

////////////////////view

/**
 * @brief Resizes the canvas based on the window dimensions.
 */
function sizeCanvas()
{
	ctx.canvas.width  = window.innerWidth * 0.8;
	ctx.canvas.height = window.innerHeight * 0.8;
}

/**
 * @brief Reads the rules matrix and graphically updates the page to reflect the changed colors.
 */
function readRules()
{
	for(var i = 0; i < 8; i++)
	{
		//get base 2 representation in string form
		var bitForm = i.toString(2);
		//make it of length 3
		while(bitForm.length < 3)
			bitForm = '0'.concat(bitForm);
		//change the color of the square using the value of its rule 
		document.getElementById(i).style.backgroundColor = colors[rules[bitForm[0]][bitForm[1]][bitForm[2]]];
	}
}

/**
 * @brief Updates the color of the upper squares of the rules, the ones that aren't clickable.
 */
function updateRulesSquaresColors()
{
	var zeroSquares = document.getElementsByName("zeroSquare");
	var oneSquares = document.getElementsByName("oneSquare");
	for(var i = 0; i < zeroSquares.length; i++)
		zeroSquares[i].style.backgroundColor = colors[0];
	for(var i = 0; i < oneSquares.length; i++)
		oneSquares[i].style.backgroundColor = colors[1];
}

/**
 * @brief Inverts the color of the clicked square, the related rule gets updated.
 */
function invertSquare()
{  
	//get base 2 representation in string form
    var bitForm = parseInt(this.id).toString(2);
    //make it of length 3
    while(bitForm.length < 3)
        bitForm = '0'.concat(bitForm);
	//change the rule related to the clicked square and update the square to the color of the new updated rule
    document.getElementById(this.id).style.backgroundColor = colors[changeRule(bitForm[0],bitForm[1],bitForm[2])];
}

/**
 * @brief Draws the current cells as a step in the canvas.
 * @param in int step The number representing the step, i.e. if this is the fifth step, step is 5.
 * @param in int size Size in pixels of a side of a square(cell).
 */
function drawStep(step,size)
{
	//y for drawing, it's basically the "row" if the canvas
	//was a table
	var y = step * size;
	for(var i = 0; i <  cells.length; i++)
	{
		ctx.fillStyle = colors[cells[i]];
		ctx.fillRect(size * i, y, size, size);
	}
	ctx.stroke();
}