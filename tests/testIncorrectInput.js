/**********************************************************************
 * Copyright (c) 2019 Hilscher Gesellschaft fuer Systemautomation mbH
 * See LICENSE file
**********************************************************************/

const edgeSDK = require('../src/index');
const _get = require('lodash').get;
jest.mock('../src/client.js');

const suggestInvalid = {
    organisationId: 1,
    search: "valid",
    invalidAttribute: "invalid"
};

const suggestInvalidTwo = {
    organisationId: 1,
    search: 1,
    invalidAttribute: "invalid"
};

const calls = [
    ["devices.customFields.delete", [1, 1]],
    ["devices.notifications.delete", [1, 1]],
    ["devices.customFields.get", [1, 1]],
    ["devices.create", ["wrong"]],
    ["devices.onBoard", ["wrong"]],
    ["devices.notifications.deleteAll", [1]],
    ["devices.delete", [1]],
    ["devices.get", [1]],
    ["devices.offBoard", [1]],
    ["devices.create", ["w"]],
    ["devices.getAll", [{}, {}, {}, {}, {}]],
    ["devices.getStatusList", [[1, 1]]],
    ["devices.methods", [1, 1]],
    ["devices.update", [1, 1]],
    ["devices.onBoard", [1]],
    ["devices.customFields.create", [1, 1]],
    ["devices.customFields.update", [1, 1, 1]],
    ["devices.notifications.create", [1, 1]],
    ["devices.notifications.getAll", ["w", 1, "w", "w", "w"]],
    ["devices.customFields.getAll", ["w", 1, "w", "w", "w"]],
    ["devices.containers.routes.delete", [1, 1]],
    ["devices.containers.routes.create", [1, 1]],
    ["devices.containers.routes.update", [1, 1, 1]],
    ["devices.containers.routes.getAll", [1]],
    ["devices.containers.getAll", [1]],
    ["devices.containers.get", ["valid", 1]],
    ["devices.containers.get", [1, "valid"]],
    ["devices.containers.getInstalled", [1]],
    ["devices.containers.getDeployable", [1]],
    ["devices.containers.delete", [1, "valid"]],
    ["devices.containers.create", [1, "valid", {}]],
    ["devices.containers.update", [1, "valid", {}]],
    ["devices.containers.properties", [1, "valid"]],
    ["devices.remote.create", [1, {}]],
    ["devices.remote.create", ["valid", "valid"]],
    ["devices.remote.status", [1]],
    ["devices.remote.credentials", [1]],

    ["containers.create", ["wrong"]],
    ["containers.delete", [1]],
    ["containers.get", [1]],
    ["containers.update", [1, 1]],
    ["containers.update", [1, 1]],
    ["containers.share", [1, ["v"]]],
    ["containers.share", [1, 1]],
    ["containers.unshare", [1, "v"]],
    ["containers.getAll", ["w", "w"]],
    ["containers.getAll", [1, "w"]],
    ["containers.getAll", [1, 1, 1]],
    ["containers.getAll", [1, 1, "w", 1]],

    ["users.createself", ["wrong"]],
    ["users.create", ["wrong"]],
    ["users.profile.update", ["wrong"]],
    ["users.verifyusers", ["wrong"]],
    ["users.getAll", [{}, {}, {}, {}, {}]],
    ["users.get", ["wrong"]],
    ["users.getverify", [1]],
    ["users.getverify", [undefined]],
    ["users.update", ["wrong", "wrong"]],
    ["users.delete", ["wrong"]],
    ["users.roles.add", [{}, {}]],
    ["users.roles.delete", [{}, {}]],
    ["users.roles.getAll", [{}, {}, {}, {}, {}]],
    ["users.suggest", [suggestInvalid]],
    ["users.suggest", [suggestInvalidTwo]],

    ["keys.create", ["wrong"]],
    ["keys.delete", [1]],
    ["keys.get", [1]],
    ["keys.update", [1, 1]],
    ["keys.getAll", [{}, {}, {}, {}, {}]],

    ["auth.resetPassword", [1]],
    ["auth.setPassword", [1]],

    ["organisation.get", ["w", "w"]],
    ["organisation.get", ["w"]],
    ["organisation.update", ["w", "w"]],
    ["organisation.create", ["w", "w"]],
    ["organisation.delete", ["w"]],
    ["organisation.getAll", ["w", "w"]],
    ["organisation.getAll", [1, "w"]],
    ["organisation.getAll", [1, 1, 1]],
    ["organisation.getAll", [1, 1, "w", 1]],

    ["organisation.manifest.createContainer", ["w", 1, {}]],
    ["organisation.manifest.createRoute", ["w", {}]],
    ["organisation.manifest.getContainers", ["w"]],
    ["organisation.manifest.getRoutes", ["w"]],
    ["organisation.manifest.deleteContainer", ["w", 1]],
    ["organisation.manifest.deleteRoute", ["w", 1]],
    ["organisation.manifest.updateContainer", ["w", 1, {}]],
    ["organisation.manifest.updateRoute", ["w", 1, {}]],
    ["organisation.manifest.getContainer", ["w", 1]],
    ["organisation.manifest.getRoute", [1, 1]],
    ["organisation.manifest.getContainers", ["w"]],
    ["organisation.manifest.getContainers", [1, "w"]],
    ["organisation.manifest.getContainers", [1, "w", "w"]],
    ["organisation.manifest.getContainers", [1, 1, 1, 1]],
    ["organisation.manifest.getContainers", [1, 1, 1, 1, 1]],
    ["organisation.manifest.getRoutes", ["w"]],
    ["organisation.manifest.getRoutes", [1, "w"]],
    ["organisation.manifest.getRoutes", [1, "w", "w"]],
    ["organisation.manifest.getRoutes", [1, 1, 1, 1]],
    ["organisation.manifest.getRoutes", [1, 1, 1, 1, 1]],

    ["roles.create", ["w", "w"]],
    ["roles.get", [{}, {}]],
    ["roles.update", ["w", {}, 1]],
    ["roles.getAll", [{}, {}, {}, {}, {}]],
    ["roles.delete", [{}, {}]],

    ["search.devices", [1]],
    ["search.devices", ["v", 1]],
    ["search.devices", ["v", [1]]],
    ["search.devices", ["v", "v", 1]],
    ["search.devices", ["v", "v", "fuzzy", "w"]],
    ["search.devices", ["v", "v", "fuzzy", 1, "w"]],
    ["search.containers", [1]],
    ["search.containers", ["v", 1]],
    ["search.containers", ["v", [1]]],
    ["search.containers", ["v", "v", 1]],
    ["search.containers", ["v", "v", "fuzzy", "w"]],
    ["search.containers", ["v", "v", "fuzzy", 1, "w"]],
    ["search.organisations", [1]],
    ["search.organisations", ["v", 1]],
    ["search.organisations", ["v", [1]]],
    ["search.organisations", ["v", "v", 1]],
    ["search.organisations", ["v", "v", "fuzzy", "w"]],
    ["search.organisations", ["v", "v", "fuzzy", 1, "w"]],
    ["search.users", [1]],
    ["search.users", ["v", 1]],
    ["search.users", ["v", [1]]],
    ["search.users", ["v", "v", 1]],
    ["search.users", ["v", "v", "fuzzy", "w"]],
    ["search.users", ["v", "v", "fuzzy", 1, "w"]],

    ["permissions.devices", [[1, 1, 1]]],
    ["permissions.containers", [[1, 1, 1]]],
    ["permissions.organisations", [["v", "v"]]],
    ["permissions.users", [["v", "v"]]],
    ["permissions.roles", [1]],
    ["permissions.tenants", [["v", "v"]]],
    ["permissions.keys", [[1, 1, 1]]],
    ["permissions.edgeos", [[1, 1, 1]]],
    ["permissions.webhooks", [[1, 1, 1]]],
    ["permissions.groups", [["v", "v"]]],

    ["permissions.devices", [1]],
    ["permissions.containers", [1]],
    ["permissions.organisations", [1]],
    ["permissions.users", [1]],
    ["permissions.tenants", [1]],
    ["permissions.keys", [1]],
    ["permissions.edgeos", [1]],
    ["permissions.permissions", [1]],
    ["permissions.webhooks", [1]],
    ["permissions.groups", ["v"]],

    ["edgeos.getAll", [{}, {}, {}, {}, {}]],
    ["edgeos.create", [1]],
    ["edgeos.update", [1, 1]],
    ["edgeos.get", [1]],
    ["edgeos.delete", [1]],

    ["tenants.create", ["wrong"]],
    ["tenants.update", ["w", "w"]],
    ["tenants.get", ["w"]],
    ["tenants.getAll", [{}, {}, {}, {}]],
    ["tenants.delete", ["w"]],

    ["webhooks.create", ["w"]],
    ["webhooks.delete", [1]],
    ["webhooks.get", [1]],
    ["webhooks.update", [1, {}]],
    ["webhooks.update", [1, 'w']],
    ["webhooks.getAll", ['w']],
    ["webhooks.getAll", [1, 'w']],
    ["webhooks.getAll", [1, 'v', 'v']],
    ["webhooks.getAll", ["w"]],
    ["webhooks.getAll", [1, "w"]],
    ["webhooks.getAll", [1, "w", "w"]],
    ["webhooks.getAll", [1, 1, 1, 1]],
    ["webhooks.getAll", [1, 1, 1, 1, 1]],

    ["groups.get", ["w", "w"]],
    ["groups.get", ["w"]],
    ["groups.update", ["w", "w"]],
    ["groups.create", ["w", "w"]],
    ["groups.delete", ["w"]],
    ["groups.addDevice", ["w", 1]],
    ["groups.removeDevice", ["w", 1]],
];

describe("Incorrect Input Suite", function () {
    test.each(calls)(
        'sdk.%s with input: %s rejects promise on wrong input',
        async (functionPath, invalidSignature) => {
            expect.assertions(1)
            const sdkFunction = _get(edgeSDK, functionPath);
            return expect(sdkFunction(...invalidSignature)).rejects.toThrow();
        },
    );

    test.each(calls)(
        'sdk.%s with input: %s returns an error in the callback on wrong input',
        async (functionPath, invalidSignature) => {
            const callback = jest.fn()
            const sdkFunction = _get(edgeSDK, functionPath);
            sdkFunction(...invalidSignature, callback);
            expect(callback).toBeCalled();
            expect(typeof callback.mock.calls[0][0]).toBe('object');
            expect(callback.mock.calls[0][1]).toBe(null);
        },
    );
});
