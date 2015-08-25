//Peticiones de Layers WMS
//var geoserver = "http://geovision.uned.ac.cr/geoserver";

var Layers = {
	gmap : new OpenLayers.Layer.Google(
		"Google Streets", // the default
		{
			numZoomLevels : 20
		}
	),
	
	
	arboles : new OpenLayers.Layer.WMS(
		"Arboles plantados", 
		"http://geovision.uned.ac.cr/geoserver/huellaverde/wms", 
		{
			LAYERS : 'Proyecto Huella Verde:arboles',
			STYLES : '',
			format : "image/png",
			transparent : "true",
		}, 
		{
			buffer : 0,
			displayOutsideMaxExtent : true,
			isBaseLayer : false,
			visibility : false,
		}
	),
	
	zona : new OpenLayers.Layer.WMS(
		"Zonas de trabajo", 
		"http://geovision.uned.ac.cr/geoserver/huellaverde/wms", 
		{
			LAYERS : 'Proyecto Huella Verde:zonificacion',
			STYLES : '',
			format : "image/png",
			transparent : "true",
		}, 
		{
			buffer : 0,
			displayOutsideMaxExtent : true,
			isBaseLayer : false,
			visibility : false,
		}
	),

};

//Asignar BBOX para cada layer
Layers.arboles.BBOX = new OpenLayers.Bounds(-85.631, 8.546, -82.946, 11.071);
Layers.zona.BBOX = new OpenLayers.Bounds(-85.95, 8.036, -82.559, 11.221);


Layers.arboles.META = "http://geovision.uned.ac.cr/geonetwork/srv/spa/search#|87b4d6df-111c-442a-841d-b1c8edb4984c";
Layers.zona.META = "http://geovision.uned.ac.cr/geonetwork/srv/spa/search#|899c30f5-5061-44df-aea6-04067c5c3dd1";


var layers = [Layers.zona, Layers.arboles, Layers.gmap];
