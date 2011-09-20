// this is where your application code goes

var app;
Ext.onReady(function() {
    app = new gxp.Viewer({
        portalConfig: {
            layout: "border",
            region: "center",
            
            // by configuring items here, we don't need to configure portalItems
            // and save a wrapping container
            items: [{
                id: "centerpanel",
                xtype: "panel",
                layout: "fit",
                region: "center",
                border: false,
                items: ["mymap"]
            }, {
                id: "westpanel",
                xtype: "panel",
                layout: "fit",
                region: "west",
                split: true,
                collapsible: true,
                collapsed: true,
                width: 200
            }, {
            	id: "eastpanel",
            	xtype: "panel",
            	region: "east",
            	layout: "fit",
            	title: "Search the USGIN Catalog",
            	split: true,
            	collapsible: true,
                collapseMode: "mini",
                width: 490
            }],
            bbar: {id: "mybbar"}
        },
        
        // configuration of all tool plugins for this application
        tools: [{
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                border: true,
                tbar: [] // we will add buttons to "tree.bbar" later
            },
            outputTarget: "westpanel"
        }, {
        	ptype: "csw_search",
        	outputConfig: {        	
        		cswUrl: "http://catalog.usgin.org/geoportal/csw/discovery"
        	},
        	outputTarget: "eastpanel"
        }, {
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar"
        }, {
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        }, {
            ptype: "gxp_zoomtoextent",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_zoom",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_navigationhistory",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_googlegeocoder",
            outputTarget: "geocoder",
            outputConfig: {
                emptyText: "Search for a location ...",
                width: 400
            }	
        }],
        
        // layer sources
        sources: {           
            google: {
            	ptype: "gxp_googlesource"
            }
        },
        
        // map and layers
        map: {
            id: "mymap", // id needed to reference map in portalConfig above
            title: "Map",
            projection: "EPSG:102113",
            units: "m",
            maxResolution: 156543.0339,
            maxExtent: [-20037508, -20037508, 20037508, 20037508],
            center: [-10764594.758211, 4523072.3184791],
            zoom: 3,
            tbar: {id: 'geocoder'},
            layers: [{
                source: "google",
                name: "TERRAIN",
                group: "background"
            }],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        }

    });
});
