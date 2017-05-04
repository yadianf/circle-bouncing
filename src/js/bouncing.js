/**
 * Created by YAD on 30/04/2017.
 */
import d3 from './lib/d3.dependencies';
import ieIssue from './lib/ie.issue';
import Util from './util/util.service'
import Circle from './objects/circle.object'
import CenterCircle from './objects/center-circle.object'
import Animation from './animate-control/animate.control'
import {DISPLAY_CENTER} from './animate-control/scene.constants';
import DEFAULT_BOUNCING_SETTING from './constants/default-bouncing-setting.constant';


export default class Bouncing {

	/** Init APP*/
	static init(container, nodes, setting) {
		return new Bouncing(container, nodes, setting);
	}

	/**
	 * @param container : DOM selector of the element where the animation will be rendered
	 *          @Eg: #stage-container
	 * @param margin : margin betting svg and the container
	 *          @Eg: {left : 10, top: 10}
	 * @param nodes : Node Array
	 * @param drag : Can I drag the nodes
	 * */
	constructor(container, nodes, setting) {
		this.radius = d3.scale.sqrt().range([0, 8]);
		this.nodes = nodes;
		this.settings = Object.assign({}, DEFAULT_BOUNCING_SETTING, setting);
		//Initialize the application when the document is ready
		document.addEventListener("DOMContentLoaded", () => {
			this._onReady(container);
		});
	}

	/**
	 * @scope : private
	 * Run when the document os ready
	 * @param container : DOM selector of the element where the animation will be rendered
	 * */
	_onReady(container) {
		this.container = d3.select(container);
		if (!this.container)
			throw 'App.init: The element "' + container + '" not existe.';
		this._createSvg();
		this._paint();
		window.onresize = () => this.resize();
	}

	/**
	 * @scope : private
	 * Create and append an svg to the container
	 * @param margin : margin betting svg and the container
	 * */
	_createSvg() {
		this.svg = this.container.append("svg")
			.attr("width", "100%")
			.attr("height", "100%");
		this.paperLink = this.svg.append("g")
			.attr("transform", "translate(" + this.settings.margin.left + "," + this.settings.margin.top + ")");
		this.paper = this.svg.append("g")
			.attr("transform", "translate(" + this.settings.margin.left + "," + this.settings.margin.top + ")");
	}

	/**
	 * @scope : private
	 * Paint all circles to the paper
	 * */
	_paint() {
		this._calculateRect();
		let rect = this.rect;
		let width = this.width;
		let height = this.height;

		this.rectView = this.paper.append("svg:rect")
			.attr("width", rect[2] - rect[0])
			.attr("height", rect[3] - rect[1])
			.attr("x", rect[0])
			.attr("y", rect[1])
			.style("fill", "None")
			.style("stroke", "#222222");


		//add the center node
		if (!this.settings.onlyBouncing) {
			this.nodes.push({
				weight: 5,
				center: true,
				radius: 0,
				trueRadius: DISPLAY_CENTER.END_VALUE,
				name: 'hub',
				color: '#ea4542',
				x: width / 2,
				y: height / 2,
				speedX: 0,
				speedY: 0
			});
		}
		//normalising all option
		this.nodes = Util.normalizeOptions(this.nodes, rect, this.settings);
		this.bouncingNodes = [];
		this.nodes.forEach(node => {
			if (!node.center)
				this.bouncingNodes.push(new Circle(this.paper, this.paperLink, node));
			else
				this.centerNode = new CenterCircle(this.paper, this.paperLink, node);
		});
		//Create animation control
		this.animationControl = new Animation(this.bouncingNodes, this.centerNode, this.settings);
		// this.hubCircle=new Circle(this.paper,{);
		// Force Directed Graphs
		this.force = d3.layout.force()
			.nodes(this.nodes)
			.size([width, height])
			.gravity(0)
			.charge(0)
			.on("tick", (e) => {
				this._tick(e)
			})
			.start();

		this.circles = d3.selectAll('g.node');
		if (this.settings.drag)
			this.circles.call(this.force.drag);
	}

	resize() {
		this.animationControl.configureAnimation();
		this._calculateRect();
		let rect = this.rect;
		this.rectView.attr("width", rect[2] - rect[0])
			.attr("height", rect[3] - rect[1])
			.attr("x", rect[0])
			.attr("y", rect[1]);

		if(this.centerNode){
			this.centerNode.setPosition(this.width/2,this.height/2);
		}
		this.force.size([this.width, this.height]);
	}

	_calculateRect() {
		let containerRectangle = this.container.node().getBoundingClientRect();
		this.width = containerRectangle.width;
		this.height = containerRectangle.height;
		this.rect = [
			this.settings.margin.left,
			this.settings.margin.top,
			containerRectangle.width - this.settings.margin.right,
			containerRectangle.height - this.settings.margin.bottom
		];
	}

	/**Run in the each time of the animation*/
	_tick(e) {
		this.force.alpha(0.1);
		this.circles
			.each(Util.gravity(e.alpha, this.rect))
			.each(Util.collide(.5, this.nodes, this.settings.padding))
			.attr("transform", (d) => {
				return "translate(" + d.x + "," + d.y + ")"
			});
		d3.selectAll('line.link')
			.attr("x1", function (d) {
				return d.source.x;
			})
			.attr("y1", function (d) {
				return d.source.y;
			})
			.attr("x2", function (d) {
				return d.target.x;
			})
			.attr("y2", function (d) {
				return d.target.y;
			});
		let scrollTop = window.scrollY;
		this.animationControl.frame(scrollTop);
	}

}