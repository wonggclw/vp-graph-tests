# Examples for the tree I am trying to create:
  - [Tree with multiple nodes] (https://d3js.org/d3-hierarchy/tree)
  - [Tree where the nodes aren't circles] (https://observablehq.com/@mbostock/stern-brocot-tree)
  - [I envision it looking like this but with decendency and ancestry] (https://observablehq.com/@d3/tree/2?intent=fork)

# Design detials:
- The female pink is #d4158a
- The male blue is #1873a3

# Notes to self:
- the d3 drawing truncates outside of the canvas - you need to redraw lines that go off the screen later
- full on drag for the whole g element is very very laggy, thinking I'll need to change the drag drop mechanism to just scroll the tree to the left on drag instead of doing a full transform. On drag will also need to scale the cards in the tree and load more data off screen to the right or left