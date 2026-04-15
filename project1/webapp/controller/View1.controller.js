sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("com.asint.rebase.merge.project1.controller.View1", {
        formatter: {
            formatStatusState: function(sStatus) {
                switch (sStatus) {
                    case "Active":
                        return "Success";
                    case "Inactive":
                        return "Error";
                    case "Pending":
                        return "Warning";
                    default:
                        return "None";
                }
            }
        },

        onInit() {
            const oData = {
                users: [
                    {
                        id: 1,
                        name: "John Doe",
                        email: "john.doe@example.com",
                        phone: "+1-555-0100",
                        department: "Sales",
                        status: "Active"
                    },
                    {
                        id: 2,
                        name: "Jane Smith",
                        email: "jane.smith@example.com",
                        phone: "+1-555-0101",
                        department: "Marketing",
                        status: "Active"
                    },
                    {
                        id: 3,
                        name: "Bob Johnson",
                        email: "bob.johnson@example.com",
                        phone: "+1-555-0102",
                        department: "IT",
                        status: "Pending"
                    },
                    {
                        id: 4,
                        name: "Alice Williams",
                        email: "alice.williams@example.com",
                        phone: "+1-555-0103",
                        department: "HR",
                        status: "Active"
                    },
                    {
                        id: 5,
                        name: "Charlie Brown",
                        email: "charlie.brown@example.com",
                        phone: "+1-555-0104",
                        department: "Finance",
                        status: "Inactive"
                    }
                ]
            };

            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onAdd() {
            MessageToast.show("Add functionality not implemented yet");
        },

        onDelete() {
            const oTable = this.byId("userTable");
            const aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select at least one item to delete");
                return;
            }

            const oModel = this.getView().getModel();
            const aUsers = oModel.getProperty("/users");

            aSelectedItems.forEach(oItem => {
                const oContext = oItem.getBindingContext();
                const iIndex = oContext.getPath().split("/").pop();
                aUsers.splice(parseInt(iIndex), 1);
            });

            oModel.setProperty("/users", aUsers);
            oTable.removeSelections();
            MessageToast.show(`${aSelectedItems.length} item(s) deleted`);
        },

        onSubmit() {
            const oView = this.getView();
            const sFirstName = oView.byId("firstNameInput").getValue();
            const sLastName = oView.byId("lastNameInput").getValue();
            const sEmail = oView.byId("emailInput").getValue();
            const sPhone = oView.byId("phoneInput").getValue();
            const sAddress = oView.byId("addressInput").getValue();

            MessageToast.show(`Form submitted:\nName: ${sFirstName} ${sLastName}\nEmail: ${sEmail}\nPhone: ${sPhone}\nAddress: ${sAddress}`);
        },

        onCancel() {
            const oView = this.getView();
            oView.byId("firstNameInput").setValue("");
            oView.byId("lastNameInput").setValue("");
            oView.byId("emailInput").setValue("");
            oView.byId("phoneInput").setValue("");
            oView.byId("addressInput").setValue("");
            
            MessageToast.show("Form cleared");
        }
    });
});