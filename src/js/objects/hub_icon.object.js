/**
 * Created by YAD on 01/05/2017.
 */
export default class HubIcon {


	static buildIcon(container) {
		let layer = {tag: 'g', attr: {xmlns: "http://www.w3.org/2000/svg", id: "Layer_2"}};
		let layer2 = {tag: 'g', attr: {id: "Layer_1-2"}};
		const HUB_ICON = [
			{
				tag: 'path',
				attr: {
					class: "st0",
					d: "M184.6,3.1v2.4c0.2,1.5-1,2.9-2.5,3.1c-0.2,0-0.4,0-0.6,0h-10.3v33.1c0.2,1.5-0.9,2.9-2.4,3.1    c-0.2,0-0.4,0-0.6,0h-3.9c-1.5,0.1-2.9-1-3-2.5c0-0.2,0-0.4,0-0.6V8.6H151c-1.5,0.2-2.9-0.9-3.1-2.4c0-0.2,0-0.4,0-0.6V3.1    c-0.2-1.5,0.9-2.9,2.4-3.1c0.2,0,0.4,0,0.6,0h30.5c1.5-0.2,2.9,0.9,3.1,2.4C184.6,2.7,184.6,2.9,184.6,3.1z"
				}
			},
			{
				tag: 'path',
				attr: {
					class: "st0",
					d: "M206.5,41.6V3.1c-0.2-1.5,1-2.9,2.5-3.1c0.2,0,0.4,0,0.6,0h3.9c1.5-0.2,2.9,0.9,3.1,2.4c0,0.2,0,0.4,0,0.6    v16.1h16.7v-16c-0.2-1.5,0.9-2.9,2.4-3.1c0.2,0,0.4,0,0.6,0h3.9c1.5-0.2,2.9,0.9,3.1,2.4c0,0.2,0,0.4,0,0.6v38.6    c0.2,1.5-0.9,2.9-2.4,3.1c-0.2,0-0.4,0-0.6,0h-3.9c-1.5,0.2-2.9-0.9-3.1-2.4c0-0.2,0-0.4,0-0.6V27.4h-16.7v14.2    c0.2,1.5-0.9,2.9-2.4,3.1c-0.2,0-0.4,0-0.6,0h-3.9c-1.5,0.2-2.9-0.9-3.1-2.4C206.5,42.1,206.5,41.8,206.5,41.6z"
				}
			},
			{
				tag: 'path',
				attr: {
					class: "st0",
					d: "M279.8,8.6v10.1h14.4c1.5-0.2,2.9,0.9,3.1,2.4c0,0.2,0,0.4,0,0.6v1.7c0.2,1.5-0.9,2.9-2.4,3.1    c-0.2,0-0.4,0-0.6,0h-14.4v9.6h17c1.5-0.2,2.9,0.9,3.1,2.4c0,0.2,0,0.4,0,0.6v2.5c0.2,1.5-0.9,2.9-2.4,3.1c-0.2,0-0.4,0-0.6,0h-24    c-1.5,0.2-2.9-0.9-3.1-2.5c0-0.2,0-0.4,0-0.6V3.1c-0.2-1.5,1-2.9,2.5-3.1c0.2,0,0.4,0,0.6,0h24c1.5-0.2,2.9,0.9,3.1,2.4    c0,0.2,0,0.4,0,0.6v2.4c0.2,1.5-0.9,2.9-2.4,3.1c-0.2,0-0.4,0-0.6,0h-17.3V8.6z"
				}
			},
			{
				tag: 'path',
				attr: {
					class: "st0",
					d: "M416.3,78.8c18.9-6.3,26.2-20.3,26.2-33.9c0-28-24.3-44.8-57.5-44.8h-53.8c-7.2,0-11.5,4-11.5,11.2v59.2h-49    c-8.3,0-15.1,6.7-15.1,15.1c0,0.2,0,92.7,0,92.7c0,21.3-14.3,32.3-30.9,32.3s-30.6-11-30.6-32.3c0,0,0-92.5,0-92.7    c0-8.2-6.6-14.9-14.8-15h-49.2V11.3C130.2,4,126.2,0,119,0h-14.5c-7.2,0-11.2,4-11.2,11.2v59.1H37.1v-59C37.1,4,33.2,0,25.9,0    H11.5C4.2,0,0,4,0,11.3v141.2c0,7.2,4.2,11.2,11.5,11.2H26c7.2,0,11.2-4,11.2-11.2v-51.9h56.1v51.9c0,7.2,4,11.2,11.2,11.2H119    c7.2,0,11.2-4,11.2-11.2v-51.9h26.9v77.7c0,42.1,31.1,64.5,67.8,64.5c36.9,0,68-22.4,68-64.5v-77.7h26.9v52    c0,7.2,4.2,11.2,11.5,11.2h60.5c35.1,0,58.2-18.2,58.2-46.3C450,100.8,438.7,81.8,416.3,78.8z M356.9,29.5h25.2    c13.8,0,24.1,7,24.1,19.1c0,10.5-8.7,20.6-29.7,20.6h-19.6V29.5z M390.3,133.7h-33.4V93.3h25.7c21.7,0,30.9,10.5,30.9,21.3    S405.1,133.7,390.3,133.7z"
				}
			}];

		let layer1View = this.createElement(container, layer);
		let layer2View = this.createElement(layer1View, layer2);
		HUB_ICON.forEach(item => this.createElement(layer2View, item));
	}

	static createElement(container, obj) {
		return container.append(obj.tag).attr(obj.attr);
	}
}