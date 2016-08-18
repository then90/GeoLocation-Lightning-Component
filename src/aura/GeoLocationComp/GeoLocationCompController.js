({   
     doInit : function(component,event,helper){      
		if (navigator.geolocation) {
  			navigator.geolocation.getCurrentPosition(success);
            function success(position) {
                 var lat = position.coords.latitude;
                 component.set("v.userLatitude",lat);
                 var long = position.coords.longitude;
                 component.set("v.userLongitude",long);
			}
		} else {
  			error('Geo Location is not supported');
		}
    },
    handleValueChange : function(component, event, helper) {
        var action = component.get("c.findNearbyAccounts");
        action.setParams({
            latitude : component.get("v.userLatitude"),
            longitude: component.get("v.userLongitude")
        });      
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.Accounts",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);               
    },
	loadMap: function(component, event, helper) {
        
        var lat = component.get("v.userLatitude");
        var long = component.get("v.userLongitude");
        var acc = component.get("v.Accounts");
    	setTimeout(function() {
        var map = L.map('map', {zoomControl: false}).setView([lat,long], 14);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles © Esri'
        }).addTo(map);

        if (acc.length> 0) {
        	for (var i=0; i<acc.length; i++) {
               	var account = acc[i];
                var accName = acc[i].Name;
            	L.marker([acc[i].BillingLatitude,acc[i].BillingLongitude]).addTo(map).bindPopup(accName);
            }
        }
      });
	}
})