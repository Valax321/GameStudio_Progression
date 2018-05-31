Travels

Developed by Andrew Castillo
---------------------------------------

Travels is an interactive story. Options are selected using the mouse.

---------------------------------------

Development

On this assignment I did not get to spend as much time as I would have liked on the game. 
The story is not finished and there were a few more features I would have liked to add.
However, I feel the presentation is quite nice overall and the game is polished for the most part.

For this game I used the ink.js library, which is a port of the Inkle C# library. Inkle is an interactive
story library that I have used several times in the past and I found it to be a very good library.
Stories are written using a custom scripting language that compiles to JSON, which is read by the game
and displayed.

I implemented an inventory system on top of ink.js, partly in Javascript and partly in the Ink language. It reads item
names from a JSON file. I originally planned to have item descriptions but did not have time to implement them.

I also have a system that allowed me to display images on-screen through the Ink language by writing a special markup passage.
This system dynamically loads images using p5, rather than preloading everything.