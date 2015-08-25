//Peticiones de Layers WMS
//var geoserver = "http://geovision.uned.ac.cr/geoserver";

var Layers = {
	gmap : new OpenLayers.Layer.Google(
		"Google Streets", // the default
		{
			numZoomLevels : 20
		}
	),
	Linea_Base : new OpenLayers.Layer.WMS(
		"Linea base", 
		"http://geovision.uned.ac.cr/geoserver/IFCMDL/wms", 
		{
			LAYERS : 'IFCMDL:Linea_base',
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
	Planes_capacitacion_2011 : new OpenLayers.Layer.WMS(
		"Planes capacitacion 2011", 
		"http://geovision.uned.ac.cr/geoserver/IFCMDL/wms", 
		{
			LAYERS : 'IFCMDL:PC_2011',
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
	Planes_capacitacion_2012 : new OpenLayers.Layer.WMS(
		"Planes capacitacion 2012", 
		"http://geovision.uned.ac.cr/geoserver/IFCMDL/wms", 
		{
			LAYERS : 'IFCMDL:PC_2012',
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

	Regiones_IFAM : new OpenLayers.Layer.WMS(
		"Regiones IFAM", 
		"http://geovision.uned.ac.cr/geoserver/IFCMDL/wms", 
		{
			LAYERS : 'IFCMDL:Regiones_ifam',
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
Layers.Linea_Base.BBOX = new OpenLayers.Bounds(-85.95, 8.036, -82.559, 11.221);
Layers.Planes_capacitacion_2011.BBOX = new OpenLayers.Bounds(-85.95, 8.034, -82.559, 11.221);
Layers.Planes_capacitacion_2012.BBOX = new OpenLayers.Bounds(-85.95, 8.034, -82.559, 11.221);
Layers.Regiones_IFAM.BBOX = new OpenLayers.Bounds(-85.95, 8.034, -82.559, 11.221);

//Asignar enlace de metadatos para cada layer
Layers.Linea_Base.META = "http://geovision.uned.ac.cr/geonetwork/srv/spa/search#|87b4d6df-111c-442a-841d-b1c8edb4984c";
Layers.Planes_capacitacion_2011.META = "http://geovision.uned.ac.cr/geonetwork/srv/spa/search#|899c30f5-5061-44df-aea6-04067c5c3dd1";
Layers.Planes_capacitacion_2012.META = "http://geovision.uned.ac.cr/geonetwork/srv/spa/search#|899c30f5-5061-44df-aea6-04067c5c3dd1";
Layers.Regiones_IFAM.META = "http://geovision.uned.ac.cr/geonetwork/srv/spa/search#|899c30f5-5061-44df-aea6-04067c5c3dd1";


var layers = [Layers.Linea_Base, Layers.Planes_capacitacion_2011, Layers.Planes_capacitacion_2012, Layers.Regiones_IFAM, Layers.gmap];