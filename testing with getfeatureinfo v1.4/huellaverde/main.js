var map;

// pink tile avoidance
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
// make OL compute scale according to WMS spec
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

function init() {

	///MAP
	format = 'image/png';
	
	var bounds = new OpenLayers.Bounds(-85.45112312249643, 10.060832408017335, -83.71257469587775, 11.085840320727375);
	
	map = new OpenLayers.Map('map', {
		controls : [
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.ArgParser(),
			new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.PanZoomBar({panIcons:false}),
			new OpenLayers.Control.TouchNavigation({ //Soporte para móbiles
				dragPanOptions : {
					interval : 0, // non-zero kills performance on some mobile phones
					enableKinetic : true
				}})
		]
	});
	
	///CONTROLS
	createPanel();
	map.addControl(nav);
	map.addControl(panel);
	createSwitcher();

	///LAYERS
	addLayers(layers);

	///TUNEUP
	map.setCenter(new OpenLayers.LonLat(-84.3, 9.6).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), 8);
}
