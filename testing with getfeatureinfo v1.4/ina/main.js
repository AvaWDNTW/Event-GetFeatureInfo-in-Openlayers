var map;
var pureCoverage = false;
var bounds = new OpenLayers.Bounds(
	-85.825, 8.405,
	-82.831, 10.929
	);
//opciones que tendrá el mmapa
var options = {
	controls: [],
	maxExtent: bounds,
	maxResolution: 0.0116953125,
	projection: "EPSG:4326",
	units: 'degrees'
};

// pink tile avoidance
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
// make OL compute scale according to WMS spec
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;
	

function init() {
 
	///MAP
	format = 'image/png';

	if(pureCoverage) {
		document.getElementById('filterType').disabled = true;
		document.getElementById('filter').disabled = true;
		document.getElementById('antialiasSelector').disabled = true;
		document.getElementById('updateFilterButton').disabled = true;
		document.getElementById('resetFilterButton').disabled = true;
		document.getElementById('jpeg').selected = true;
		format = "image/jpeg";
	}
	
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
		}, options);
	
	///CONTROLS
	createPanel();
	map.addControl(nav);
	map.addControl(panel);
	createSwitcher();

	///LAYERS
	addLayers(layers);

	// build up all controls
	map.addControl(new OpenLayers.Control.Navigation());
	map.addControl(new OpenLayers.Control.Scale($('scale')));
	map.addControl(new OpenLayers.Control.MousePosition({element: $('location')}));
	map.zoomToExtent(bounds);


// support GetFeatureInfo
map.events.register('click', map, function (e) {
	var cont_ft = 1;//contador que recorre la matriz map.layer
	var band_ft = 0;// bandera para el while 
	var seg_ft = "";//metoso de seguridad para averigua si el response trajo datos del request
while(band_ft ==  0){
	var url_ft = map.layers[cont_ft].url;
	var layer_ft = map.layers[cont_ft].params.LAYERS;
	document.getElementById('nodelist').innerHTML = "Cargando... por favor espere...";
	var params = {
		REQUEST: "GetFeatureInfo",
		EXCEPTIONS: "application/vnd.ogc.se_xml",
		BBOX: map.getExtent().toBBOX(),
		SERVICE: "WMS",
		VERSION: "1.1.1",
		//X: e.xy.x,
		//Y: e.xy.y,
		X: Math.round(event.xy.x), 
		Y: Math.round(event.xy.y), 
		INFO_FORMAT: 'text/html',
		QUERY_LAYERS: map.layers[cont_ft].params.LAYERS,
		FEATURE_COUNT: 50,
		Layers: layer_ft,
		WIDTH: map.size.w,
		HEIGHT: map.size.h,
		format: format,
		styles: map.layers[cont_ft].params.STYLES,
		srs: map.layers[cont_ft].params.SRS};
                    // merge filters
                    if(map.layers[cont_ft].params.CQL_FILTER != null) {
                    	params.cql_filter = map.layers[cont_ft].params.CQL_FILTER;
                    } 
                    if(map.layers[cont_ft].params.FILTER != null) {
                    	params.filter = map.layers[cont_ft].params.FILTER;
                    }
                    if(map.layers[cont_ft].params.FEATUREID) {
                    	params.featureid = map.layers[cont_ft].params.FEATUREID;
                    }
                    //OpenLayers.loadURL(url_ft, params, this, setHTML, setHTML);
                    OpenLayers.Request.GET({
                    	url: url_ft,
                    	params: params,
                    	callback: function (response){
                document.getElementById('nodelist').innerHTML = response.responseText;
                		seg_ft = response.responseText;
			}
                    });
			if(!seg_ft.includes("<tr>")){
				cont_ft += 1;
				if(cont_ft > 4){
					band_ft = 1;
				}
			}else{
				band_ft = 1;	
			}

                };

                });


	///TUNEUP
	map.setCenter(new OpenLayers.LonLat(-84.3, 9.6).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), 8);
}
