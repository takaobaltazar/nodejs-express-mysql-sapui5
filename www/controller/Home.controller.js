sap.ui.define([
	"sap/ui/core/mvc/Controller"
	],function(Controller) {
		Controller.extend("sapui5.poc.controller.Home", {
			onPressDemo : function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("detail");
			}
		});
	});