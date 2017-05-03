#js cellular automata
Something to play around with cellular automata wich i've written in js and some bootstrap to give the page a decent and zero effort layout.  
Once the page is loaded a 2d cellular automata will be evolved downward, the starting cells (the first row) are randomly initialized  and you can edit the rules or randomize them and then run the evolution again.  
Every rule is graphically showed as 3 squares above a single one, of the 3 squares, the first one represents the left neighbour of the cell, the middle one represents the cell itself, and the right one represents the right neighbour of the cell; for every step for every cell its state and the state of the neighbours are checked to decide wich rule to apply.  
The state of the bottom square is the state in wich the cell will be if that rule is applied.  
If you are familiar with formal languages this can be seen as some kind of context-sensitive language.  

[Example of a picture you can generate.](example1.png)  
[Example of a picture you can generate.](example2.png)  
[Example of a picture you can generate.](example3.png)  
[Example of a picture you can generate.](example4.png)  

The size of the image is proportional to the window of your browser when you run the automata.

https://fruttasecca.github.io/js-cellular-automata/
[github io page](https://fruttasecca.github.io/js-cellular-automata)
