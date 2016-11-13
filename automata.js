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
var colors = ["black","green"];

//contains the cells
var cells;

//number of cells (columns, since its going to evolve vertically
var cellNumber;

//number of steps to make (rows, each row is an evolution based on rules from the var rules)
var steps;

//canvas to draw cells in
var canvas = document.getElementById("canvas");
//ctx of the canvas, it's the object actually used to draw stuff
var ctx = canvas.getContext("2d");


//control

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
	for(var i=0; i < cells.length; i++)
		cells[i] = Math.round(Math.random());
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
	for(var i=1,n=cells.length-1; i < n ; i++)
		tmp[i] = rules[cells[i-1]][cells[i]][cells[i+1]];
	cells = tmp;
}

/**
 * @brief Initializes the cellular automata rules randomly.
 */
function randomRules()
{
	for(var i=0;i<rules.length;i++)
		for(var u=0;u<rules[i].length;u++)
			for(var z=0;z<rules[i][u].length;z++)
				rules[i][u][z] = Math.round(Math.random());
}

/**
 * @brief Keeps evolving the cellular automata, drawing each step under the previous one.
 * @param in int n Number of steps to do.
 * @param in int size Size in pixels of an edge of a square(cell).
 * @return Description of returned value.
 */
function doNSteps(n,size)
{
	sizeCanvas();
	drawStep(0,20);
	for(var i =0; i < n; i++)
	{
		nextStep();
		drawStep(i+1,size);
	}
}

//view

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
	for(var i=0;i<cells.length;i++)
	{
		ctx.fillStyle = colors[cells[i]];
		ctx.fillRect(size*i,y,size,size);
	}
	ctx.stroke();
}

/**
 * @brief Resizes the canvas based on the window dimensions.
 */
function sizeCanvas()
{
	ctx.canvas.width  = window.innerWidth * 0.8;
	ctx.canvas.height = window.innerHeight * 0.8;
}



//code to be executed on page load
sizeCanvas();
cellNumber = 1000;
steps = 500;
size = 2;
randomRules();
initCellsRandom(cellNumber);
doNSteps(steps,size);