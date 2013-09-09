var baseURL = "http://localhost:8081/";

var CANVAS_WIDTH = window.innerWidth-300;
var CANVAS_HEIGHT = window.innerHeight-50;
var FPS = 60
        
//Start game loop and stuff
var canvasElement = $("<canvas id='mainCanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('#wrapper');
       
        
//Queue Functions
function Push(arrayName,arrayElement){    arrayName.push(arrayElement);   }
function Pop(arrayName){                  arrayName.shift();              }

//Universals
var players = [];
var beads = [];
var noOfBeads = 0;
