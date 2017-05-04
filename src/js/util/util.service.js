/**
 * Created by YAD on 26/04/2017.
 */

class Util {

	/**Normalize all  nodes in the array
	 * @param nodes: Node Array
	 * @param rect: limits
	 * @param maxSpeed: Max speed of each node
	 *
	 * @return Array of normalize nodes
	 * */
	static normalizeOptions(nodes, rect, settings) {
		this.index = 0;
		return nodes.map(node => {
			return this.normalizeNode(node, rect, settings, this.index++);
		});
	}

	/**Normalize a single nodes
	 * @param node: Node
	 * @param rect: limits
	 * @param maxSpeed: Max speed of each node
	 * @param index: id or index of the node
	 *
	 * @return Normalize node
	 * */
	static normalizeNode(node, rect, settings, index) {
		let randomDefault =
			{
				index: index,
				weight: 0,
				radius: 58,
				color: settings.defaultNodeColor,
				colorText: settings.defaultNodeColorText,
				x: rect[0] + (Math.random() * (rect[2] - rect[0])),
				y: rect[1] + (Math.random() * (rect[3] - rect[1])),
				speedX: (Math.random() - 0.5) * 2 * settings.maxSpeed,
				speedY: (Math.random() - 0.5) * 2 * settings.maxSpeed
			};
		randomDefault.speedX = Math.abs(randomDefault.speedX) < 0.1 ? 0.1 : randomDefault.speedX;
		randomDefault.speedY = Math.abs(randomDefault.speedY) < 0.1 ? 0.1 : randomDefault.speedY;
		return Object.assign({}, randomDefault, node);
	}


	/**Move nodes toward cluster focus.
	 * @param alpha:
	 * @param rect:
	 * */
	static gravity(alpha, rect) {
		return (d) => {
			let increaseX = 0;
			let increaseY = 0;
			if ((d.x - d.radius - 2) < rect[0] + 20) {
				d.speedX = Math.abs(d.speedX);
				increaseX = Math.abs((d.x - d.radius - 2) - (rect[0] + 20)) / 20;
			}

			if ((d.x + d.radius + 2) > rect[2] - 20) {
				d.speedX = -1 * Math.abs(d.speedX);
				increaseX = -Math.abs((d.x + d.radius + 2) - (rect[2] - 20)) / 20;
			}

			if ((d.y - d.radius - 2) < rect[1] + 20) {
				d.speedY = -1 * Math.abs(d.speedY);
				increaseY = Math.abs((d.y - d.radius - 2) - (rect[1] + 20)) / 20;
			}

			if ((d.y + d.radius + 2) > rect[3] - 20) {
				d.speedY = Math.abs(d.speedY);
				increaseY = -Math.abs((d.y + d.radius + 2) - (rect[3] - 20)) / 20;
			}
			d.x = d.x + (d.speedX * alpha) + increaseX;
			d.y = d.y + (-1 * d.speedY * alpha) + increaseY;
		};
	}

	/** Resolve collisions between nodes.
	 * @param  alpha:
	 * @param  nodes:
	 * @param  padding:
	 * */
	static collide(alpha, nodes, padding) {
		let quadtree = d3.geom.quadtree(nodes);
		return (d) => {
			let r = d.radius + 5 + padding,
				nx1 = d.x - r,
				nx2 = d.x + r,
				ny1 = d.y - r,
				ny2 = d.y + r;
			quadtree.visit((quad, x1, y1, x2, y2) => {
				if (quad.point && (quad.point !== d)) {
					let x = d.x - quad.point.x,
						y = d.y - quad.point.y,
						l = Math.sqrt(x * x + y * y),
						r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
					if (l < r) {
						l = (l - r) / l * alpha;
						x *= l;
						y *= l;

						if (!d.center && !quad.point.center) {
							d.x -= x;
							d.y -= y;
							quad.point.x += x;
							quad.point.y += y;
						} else {
							if (!d.center) {
								d.x -= x * 2;
								d.y -= y * 2;
							} else {
								quad.point.x += x * 2;
								quad.point.y += y * 2;
							}

						}

					}
				}
				return x1 > nx2
					|| x2 < nx1
					|| y1 > ny2
					|| y2 < ny1;
			});
		};
	}

	/**
	 * Function interpolation
	 * @param start: start value
	 * @param end: End value
	 * @param startInterval: when started (time|scroll)  the animation
	 * @param startInterval: when finished (time|scroll ) the animation
	 * @param currentValue: What is the current value(time|scroll ) of the interval
	 * */
	static interpolate(start, end, startInterval, endInterval, currentValue) {
		if (currentValue > endInterval)return end;
		if (currentValue < start)return start;
		let length = end - start;
		let intervalValue = (currentValue - startInterval) / (endInterval - startInterval);
		return start + length * intervalValue;
	}


}

export default  Util;