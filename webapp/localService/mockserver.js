sap.ui.define([
	"sap/ui/core/util/MockServer"
], ( MockServer ) => {
	"use strict";

	return {
        init() {
			// create
			const oMockServer = new MockServer({
				rootUri: sap.ui.require.toUrl("sap.demo.db.test01") + "/V2/Northwind/Northwind.svc/"
			});

			const oUriParameters = new URLSearchParams(window.location.search);

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});

			// simulate
			const sPath = sap.ui.require.toUrl("sap/demo/db/test01/localService");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			// start
			oMockServer.start();
		},

		onBeforeRendering: function() {
			console.error("A problem occurred!");
		},

		onAfterRendering: function() {
			debugger
		}
    }
});