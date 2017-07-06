/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents module containing exported methods
 *
 * @class InteropModule
 * @constructor
 * @private
 * @export
 */
function InteropModule(config) {
    var cmpDef = $A.componentService.getDef(config['componentDef']);
    this.concreteComponentId = config["concreteComponentId"];
    this.containerComponentId = config["containerComponentId"];
    this.componentDef = cmpDef;
    this.interopClass = cmpDef.interopClass;
    
    this.rendered = false;
    this.inUnrender = false;
    this.shouldAutoDestroy = true;
    this.localId = config['localId'];
    this.attributeValueProvider = config['attributes']['valueProvider'];
    this.owner = $A.clientService.currentAccess;

    this.allElements = [];

    this.setupGlobalId(config['globalId']);

    $A.componentService.index(this);

    if (this.localId) {
        this.doIndex(this);
    }

    this.setupMethods();
}

// Prototype chain (instanceOf)
InteropModule.prototype = Object.create(InteropComponent.prototype);
InteropModule.prototype.constructor = InteropModule;

/**
 * Adds module keys to instance of InteroptModule
 */
InteropModule.prototype.setupMethods = function () {
    var interopClass = this.interopClass;
    var self = this;
    Object.getOwnPropertyNames(interopClass).forEach(function (m) {
        self[m] = interopClass[m];
    });
};

InteropModule.prototype.attributeChange = function (key, value) {
};

/**
 * No attributes to get on module
 *
 * @param {String} key - The data key to look up on the Component.
 * @public
 * @platform
 * @export
 */
InteropModule.prototype.get = function (key) {
    this.raiseInvalidInteropApi('get', arguments);
};

/**
 * Cannot set on module
 *
 * @public
 * @export
 */
InteropModule.prototype.set = function (key, value) {
    this.raiseInvalidInteropApi('set', arguments);
};

/**
 * Nothing to render on module
 * @export
 */
InteropModule.prototype.render = function () {};

/**
 * Nothing to unrender on module
 * @export
 */
InteropModule.prototype.unrender = function () {};

/**
 * @public
 * @export
 */
InteropModule.prototype.destroy = function() {
    this.doDeIndex();
    $A.componentService.deIndex(this.globalId);
};


/**
 * @public
 * @export
 */
InteropModule.prototype.toString = function() {
    return 'InteropModule: ' + this.componentDef.getDescriptor().toString();
};

Aura.Component.InteropModule = InteropModule;
