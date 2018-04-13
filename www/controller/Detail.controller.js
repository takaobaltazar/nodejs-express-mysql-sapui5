sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	],function(Controller, JSONModel, Filter, FilterOperator) {
		Controller.extend("sapui5.poc.controller.Detail", {
			onInit : function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
			},

			onRouteMatched : function(oEvent) {
				var that = this;

				// Read data
				jQuery.ajax({
					url : "http://localhost:4000/loginUser",
					type : "GET",
					success : function(oData) {
						var oModel = new JSONModel(oData);
						that.getView().setModel(oModel, "nodeData");
					},
					error : function(oError) {
						console.info(oError);
					}
				});
			}, 
			/**
			 * Navigate back to home page.
			 */
			onNavBack : function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("home");
			},
			/**
			 * Live search on table
			 * @param  {object} oEvent Searchfield event object.
			 */
			onLiveSearch : function(oEvent) {
				var oTable = this.getView().byId("idTable");
				var sValue = oEvent.getSource().getValue();
				var aFilter = [];

				if (sValue && sValue.length > 0) {
					var oFilter = new Filter("username", FilterOperator.Contains, sValue);
					aFilter.push(oFilter);
				}

				var oBinding = oTable.getBinding("items");
				oBinding.filter(aFilter);
			},
			/**
			 * Opens a dialog for Create.
			 */
			onOpenDialogCreate : function() {
				if (!this._oDialog) {
					this._oDialog = sap.ui.xmlfragment("sapui5.poc.fragment.AddEntry", this);
					this.getView().addDependent(this._oDialog);
				}
				this._oDialog.open();

				// Create a local model
				var oModel = new JSONModel({
					username 	: null,
					password 	: null,
					accountType : null
				});
				this.getView().setModel(oModel, "createEntry");
			},
			/**
			 * Execute a POST method using jQuery AJAX.
			 */
			onCreate : function() {
				var that = this;
				var oProp = this.getView().getModel("createEntry").getProperty("/");
				var oPayload = {
					username 	: oProp.username,
					password 	: oProp.password,
					account_type: oProp.accountType
				};
				jQuery.ajax({
					url : "http://localhost:4000/loginUser",
					type : "POST",
					data : oPayload,
					success : function(oData) {
						console.info(oData);
						that.onClose();
						that.onRouteMatched();
					},
					error : function() {

					}
				});
			},
			/**
			 * Closed Create Dialog Pop-up
			 */
			onClose : function() {
				this._oDialog.close();
			},
			/**
			 * Opens a pop-up message for delete confirmation.
			 * @param  {object} oEvent Icon event.
			 */
			onOpenDialogDelete : function(oEvent) {
				if (!this._oDialog_Delete) {
					this._oDialog_Delete = sap.ui.xmlfragment("sapui5.poc.fragment.ConfirmDelete", this);
					this.getView().addDependent(this._oDialog_Delete);
				}
				this._oDialog_Delete.open();

				// We assigned to a globala variable , so that we can use it on the onDelete function
				this._iId = oEvent.getSource().getBindingContext("nodeData").getObject().id;
			},
			/**
			 * Execute a DELETE method using jQuery AJAX.
			 * @param  {object} oEvent Button event.
			 */
			onDelete : function(oEvent) {
				var that = this;
				jQuery.ajax({
					url : "http://localhost:4000/loginUser/" + this._iId,
					type : "DELETE",
					success : function(oData) {
						console.info(oData);
						that.onCloseDelete();
						that.onRouteMatched();
					},
					error : function() {

					}
				});
			},
			/**
			 * Closed Delete Dialog Pop-up
			 */
			onCloseDelete : function() {
				this._oDialog_Delete.close();
			},
			/**
			 * Opens a dialog for Edit.
			 */
			onOpenDialogEdit : function(oEvent) {
				if (!this._oDialog_Edit) {
					this._oDialog_Edit = sap.ui.xmlfragment("sapui5.poc.fragment.EditEntry", this);
					this.getView().addDependent(this._oDialog_Edit);
				}
				this._oDialog_Edit.open();

				var oProp = oEvent.getSource().getBindingContext("nodeData").getObject();

				// Create a local model
				var oModel = new JSONModel({
					id : oProp.id,
					username 	: oProp.username,
					password 	: oProp.password,
					accountType : oProp.account_type
				});
				this.getView().setModel(oModel, "editEntry");
			},
			/**
			 * Execute a PUT method using jQuery AJAX.
			 * @param  {object} oEvent Button event.
			 */
			onEdit : function() {
				var that = this;
				var oProp = this.getView().getModel("editEntry").getProperty("/");
				var oPayload = {
					username	: oProp.username,
					password	: oProp.password,
					account_type: oProp.accountType
				};
				jQuery.ajax({
					url : "http://localhost:4000/loginUser/" + oProp.id,
					type : "PUT",
					data : oPayload,
					success : function(oData) {
						console.info(oData);
						that.onCloseEdit();
						that.onRouteMatched();
					},
					error : function() {

					}
				});
			},
			/**
			 * Closed Edit Dialog Pop-up
			 */
			onCloseEdit : function() {
				this._oDialog_Edit.close();
			}
		});
	});