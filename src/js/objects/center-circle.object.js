/**
 * Created by YAD on 26/04/2017.
 */

import HUB_ICON from './hub_icon.object'
import Circle from './circle.object'

export default class CenterCircle extends Circle {

	/**
	 *Constructor
	 * @param container : Element where the circle will be rendered
	 * @param options : Settings of the circle
	 * */
	constructor(paper, paperLink, option) {
		super(paper, paperLink, option)
	}

	paint() {
		this.paintCircle();
		HUB_ICON.buildIcon(this.scaleContainer);
	}

	setRadio(radius) {
		this.option.radius = radius;
		let scale = radius / this.option.trueRadius;
		this.scaleContainer.attr("transform", "scale(" + scale + ")");
		this.circle.style("opacity", scale)
	}

	getRadius() {
		return this.option.trueRadius - 30;
	}

	isComplete() {
		return this.option.radius == this.option.trueRadius;
	}

	connect(circle) {
		if (!circle)return;
		let link = this.paperLink.append('line')
			.attr('class', 'link')
			.attr('id', 'link-' + circle.option.index)
			.datum({source: this.option, target: circle.option})
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
		circle.connect(link);
	}

	connecting(circle, value) {
		if (!circle)return;
		let distance = this.distance(circle);
		circle.rotate(this);
		circle.connecting(distance,value);
	}

	disconnect(circle) {
		if (circle)
			circle.disconnect()
	}

}