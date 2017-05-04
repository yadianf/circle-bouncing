require("../sass/app.scss");


import Bouncing from './bouncing'

var CONTAINER = '#stage-container'; // container selector : where the animation will be rendering

console.log('init app...');

//mock{
let mockNodes = [];
let n = 10;
for (let i = 0; i < n; i++) {
	mockNodes.push({name: 'Node-' + i});
}

Bouncing.init(CONTAINER, mockNodes); // start app, default settings