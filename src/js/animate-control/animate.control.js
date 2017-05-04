/**
 * Created by YAD on 01/05/2017.
 */
import {DISPLAY_CENTER, LINK_NODE} from './scene.constants';
import Util from '../util/util.service'
export default class Animation {


	constructor(bouncingNodes, centerNode, setting) {
		this.nodes = bouncingNodes;
		this.center = centerNode;
		this.setting = setting;
		this.connectedNodes = [];
		this.configureAnimation();

	}

	/**Determinate the scroll point in the animation and calculate de body height
	 * @param nodes: List of nodes
	 * */
	configureAnimation() {
		// show center icon
		if (this.setting.onlyBouncing)return;
		let HEIGHT = window.innerHeight;
		this.totalLink = LINK_NODE.DURATION * this.nodes.length;
		this.endAnimation = DISPLAY_CENTER.DURATION + this.totalLink;
		let heightBody = HEIGHT + this.endAnimation;
		d3.select('body').style("height", heightBody + 'px');
	}

	frame(frame) {
		if (this.setting.onlyBouncing)return;
		this.displayCenter(frame);
		this.linkToNodes(frame);
	}

	/**
	 * Scene 1: Display center circle
	 * scroll :500
	 * */
	displayCenter(frame) {
		if (frame > DISPLAY_CENTER.END && this.center.isComplete())return;
		let value = Util.interpolate(DISPLAY_CENTER.START_VALUE, DISPLAY_CENTER.END_VALUE, DISPLAY_CENTER.START, DISPLAY_CENTER.END, frame)
		this.center.setRadio(value);
	}

	linkToNodes(frame) {
		let timeOfLinks = frame - DISPLAY_CENTER.DURATION;
		if (timeOfLinks <= 0) return this.disconnectNodes(this.connectedNodes.length);
		let currentOfConnectedNodes = timeOfLinks / LINK_NODE.DURATION;
		let numberOfConnectedNodes = Math.floor(currentOfConnectedNodes);

		if (numberOfConnectedNodes >= this.connectedNodes.length) {
			this.connectNodes(numberOfConnectedNodes - this.connectedNodes.length);
		} else {
			this.disconnectNodes(this.connectedNodes.length - numberOfConnectedNodes);
		}
		//connecting
		if (currentOfConnectedNodes > numberOfConnectedNodes) {
			this.connectingNode(currentOfConnectedNodes - numberOfConnectedNodes);
		}
	}

	selectNode() {
		let select = this.currentConnectingNode;
		if (this.currentConnectingNode) {
			this.currentConnectingNode = null;
			return select;
		}
		let minorDistance = Number.MAX_VALUE;

		this.nodes.forEach((node) => {
			if (!node.isConnect) {
				let distance = this.center.distance(node);
				if (distance < minorDistance) {
					minorDistance = distance;
					select = node;
				}
			}
		});
		return select;
	}

	connectNodes(number) {
		for (let i = 0; i < number; i++) {
			console.log('select', i);
			let select = this.selectNode();
			this.center.connect(select);
			this.connectedNodes.push(select)
		}
		this.lastDisconnect = null;
	}

	disconnectNodes(number) {
		if (this.currentConnectingNode) {
			this.currentConnectingNode.disconnect();
			this.currentConnectingNode = null;
		}
		let i = this.connectedNodes.length - 1;
		while (number > 0 && i >= 0) {
			let select = this.connectedNodes[i];
			select.disconnect();
			this.connectedNodes.splice(i, 1);
			number--;
			i--;
			this.lastDisconnect = select;
		}
	}

	connectingNode(value) {
		if (!this.currentConnectingNode) {
			this.currentConnectingNode = this.lastDisconnect || this.selectNode();
			if (!this.currentConnectingNode)return;
			this.center.connect(this.currentConnectingNode);
			this.currentConnectingNode.startConnecting();
		}
		this.center.connecting(this.currentConnectingNode, value);

	}
}