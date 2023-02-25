# example

This post describes how to build a very basic barplot with d3.js, but ordered.
The first part of the javascript code set a svg area. It specify the chart size and its margin.
To create the animation, bars are first drawn with a height of 0. Then they reach their real value using the transition() function.
Create the changeColor() function in the Javascript part. It basically select all the rectangles of the plot and change their fill attribute