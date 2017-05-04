/**
 * Created by YAD on 26/04/2017.
 */

export default class Circle {

	/**
	 *Constructor
	 * @param container : Element where the circle will be rendered
	 * @param options : Settings of the circle
	 * */
	constructor(paper, paperLink, option) {
		this.paper = paper;
		this.paperLink = paperLink;
		this.option = option;
		this.paint();
	}

	paint() {
		this.paintCircle();
		this.text = this.scaleContainer.append("text")
			.text(this.option.name)
			.attr('text-anchor', "middle")
			.attr("x", 0)
			.attr("y", 5)
			.style("fill", this.option.colorText);
	}

	paintCircle() {
		this.container = this.paper.append('g').datum(this.option).attr('class', 'node')
			.attr("transform", (d) => {
				return "translate(" + d.x + "," + d.y + ")"
			});
		this.scaleContainer = this.container.append('g').attr('class', 'scale-container');
		this.circle = this.scaleContainer.append("circle")
			.attr("r", this.getRadius())
			.attr("cx", 0)
			.attr("cy", 0)
			.style("fill", this.option.color);
	}

	setPosition(x, y) {
		this.option.x = x;
		this.option.y = y;
	}

	setRadio(radius) {
		//Not allow for normal circles
	}

	getRadius() {
		return this.option.radius - 8;
	}

	getPerimeter() {
		let issue = 20;
		return (2 * this.getRadius() * Math.PI ) + issue;
	}

	getCenter() {
		return new Victor(this.option.x, this.option.y);
	}


	distance(circle) {
		let x = this.option.x - circle.option.x,
			y = this.option.y - circle.option.y;
		return Math.sqrt(x * x + y * y);
	}

	connect(link) {
		this._connect(true);
		if (this.link)
			this.link.remove();
		this.link = link;
	}

	disconnect(circle) {
		this.link.remove();
		this.link = null;
		this._connect(false);
	}

	_connect(value) {
		this.circle.classed("connecting", false);
		this.circle.classed("connect", value);
		this.circle.style('stroke-dasharray', '5000px 5000px');
		this.isConnect = value;
	}

	connecting(distance, value) {
		let perimeter = this.getPerimeter();
		let withoutRadius = distance - this.getRadius();
		let myDistance = distance + perimeter;
		let currentDistance = myDistance * value;
		let circleDistance = currentDistance > withoutRadius ? currentDistance - withoutRadius : 0;
		this.link.attr('stroke-dasharray', currentDistance + ' 5000');
		this.circle.style('stroke-dasharray', circleDistance + 'px 5000px');
	}

	startConnecting() {
		this.circle.classed("connecting", true);
	}

	rotate(circle) {
		let angle = this.getAngle(circle);
		this.setAngle(angle);
	}

	getAngle(circle) {
		let p1 = this.option;
		let p2 = circle.option;
		return Math.atan2(p2.y - p1.y, p2.x - p1.x) / (Math.PI / 180) - 4;
	}

	setAngle(angle) {
		this.circle.attr('transform', 'rotate(' + (angle) + ',0,0)');
	}

}