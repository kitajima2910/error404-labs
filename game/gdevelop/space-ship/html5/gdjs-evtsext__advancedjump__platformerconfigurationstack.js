
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack || {};

/**
 * Behavior generated from Platformer character configuration stack
 */
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack = class PlatformerConfigurationStack extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.PlatformerCharacter = behaviorData.PlatformerCharacter !== undefined ? behaviorData.PlatformerCharacter : "";
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.PlatformerCharacter !== newBehaviorData.PlatformerCharacter)
      this._behaviorData.PlatformerCharacter = newBehaviorData.PlatformerCharacter;

    return true;
  }

  // Network sync:
  getNetworkSyncData(syncOptions) {
    return {
      ...super.getNetworkSyncData(syncOptions),
      props: {
        
    PlatformerCharacter: this._behaviorData.PlatformerCharacter,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData, options) {
    super.updateFromNetworkSyncData(networkSyncData, options);
    
    if (networkSyncData.props.PlatformerCharacter !== undefined)
      this._behaviorData.PlatformerCharacter = networkSyncData.props.PlatformerCharacter;
  }

  // Properties:
  
  _getPlatformerCharacter() {
    return this._behaviorData.PlatformerCharacter !== undefined ? this._behaviorData.PlatformerCharacter : "";
  }
  _setPlatformerCharacter(newValue) {
    this._behaviorData.PlatformerCharacter = newValue;
  }
}

/**
 * Shared data generated from Platformer character configuration stack
 */
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.SharedData = class PlatformerConfigurationStackSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._AdvancedJump_PlatformerConfigurationStackSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._AdvancedJump_PlatformerConfigurationStackSharedData = new gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.SharedData(
      initialData
    );
  }
  return instanceContainer._AdvancedJump_PlatformerConfigurationStackSharedData;
}

// Methods:
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.GDObjectObjects1= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.userFunc0xaa5780 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const behaviorName = eventsFunctionContext.getBehaviorName("Behavior");
const object = objects[0];
const behavior = object.getBehavior(behaviorName);
/** @type {gdjs.PlatformerObjectRuntimeBehavior} */
const character = object.getBehavior(behavior._getPlatformerCharacter());

behavior.__settingNames = behavior.__settingNames || ["gravity", "maxFallSpeed", "jumpSpeed", "jumpSustainTime", "acceleration", "deceleration", "maxSpeed"];

/** @type {{id:string, gravity: float, maxFallSpeed: float, jumpSpeed: float, jumpSustainTime: float, acceleration: float, deceleration: float, maxSpeed: float}[]} */
const configurationChanges = [];
behavior.__configurationChanges = configurationChanges;
// Add the default configuration
configurationChanges.push(({
    id: undefined,
    gravity: character.getGravity(),
    maxFallSpeed: character.getMaxFallingSpeed(),
    jumpSpeed: character.getJumpSpeed(),
    jumpSustainTime: character.getJumpSustainTime(),
    acceleration: character.getAcceleration(),
    deceleration: character.getDeceleration(),
    maxSpeed: character.getMaxSpeed()
}));

};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.userFunc0xaa5780(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.onCreatedContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.GDObjectObjects1= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.userFunc0x8eab00 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const behaviorName = eventsFunctionContext.getBehaviorName("Behavior");
const object = objects[0];
const behavior = object.getBehavior(behaviorName);
/** @type {gdjs.PlatformerObjectRuntimeBehavior} */
const character = object.getBehavior(behavior._getPlatformerCharacter());
/** @type {string} */
const id = eventsFunctionContext.getArgument("Identifier");

if (id === undefined) {
    return;
}

/** @type {{id:string, gravity: float, maxFallSpeed: float, jumpSpeed: float, jumpSustainTime: float, acceleration: float, deceleration: float, maxSpeed: float}[]} */
const configurationChanges = behavior.__configurationChanges || [];

const index = configurationChanges.findIndex(value => value.id === id);
if (index >= 0) {
    configurationChanges.splice(index, 1);

    // Update the configuration with the most recent changes.
    /** @type {string[]} */
    const settingNames = behavior.__settingNames;
    for (const settingName of settingNames) {
        const configuration = configurationChanges.find(value => value[settingName] !== undefined);
        const settingValue = configuration[settingName];
        // Methods can't be stored because the character instance could change.
        switch (settingName) {
            case "gravity":
                character.setGravity(settingValue);
                break;
            case "maxFallSpeed":
                character.setMaxFallingSpeed(settingValue);
                break;
            case "jumpSpeed":
                character.setJumpSpeed(settingValue);
                break;
            case "jumpSustainTime":
                character.setJumpSustainTime(settingValue);
                break;
            case "acceleration":
                character.setAcceleration(settingValue);
                break;
            case "deceleration":
                character.setDeceleration(settingValue);
                break;
            case "maxSpeed":
                character.setMaxSpeed(settingValue);
                break;
        }
    }
}

};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.GDObjectObjects1);

const objects = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.GDObjectObjects1;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.userFunc0x8eab00(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfiguration = function(Identifier, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "Identifier") return Identifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.RevertConfigurationContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.GDObjectObjects1= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.userFunc0xba09f8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const behaviorName = eventsFunctionContext.getBehaviorName("Behavior");
const object = objects[0];
const behavior = object.getBehavior(behaviorName);
/** @type {gdjs.PlatformerObjectRuntimeBehavior} */
const character = object.getBehavior(behavior._getPlatformerCharacter());
/** @type {string} */
const settingName = eventsFunctionContext.getArgument("SettingName");
/** @type {float} */
const settingValue = eventsFunctionContext.getArgument("SettingValue");
/** @type {string} */
const id = eventsFunctionContext.getArgument("Identifier");

/** @type {{id:string, gravity: float, maxFallSpeed: float, jumpSpeed: float, jumpSustainTime: float, acceleration: float, deceleration: float, maxSpeed: float}[]} */
const configurationChanges = behavior.__configurationChanges || [];

eventsFunctionContext.returnValue = configurationChanges[configurationChanges.length - 1][settingName];

};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.GDObjectObjects1);

const objects = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.GDObjectObjects1;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.userFunc0xba09f8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSetting = function(SettingName, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "SettingName") return SettingName;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualSettingContext.GDObjectObjects1.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects1= [];
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects2= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).UsualSetting("maxSpeed", eventsFunctionContext));}
}

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeed = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.UsualMaxSpeedContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.GDObjectObjects1= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.userFunc0xba08f0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const behaviorName = eventsFunctionContext.getBehaviorName("Behavior");
const object = objects[0];
const behavior = object.getBehavior(behaviorName);
/** @type {gdjs.PlatformerObjectRuntimeBehavior} */
const character = object.getBehavior(behavior._getPlatformerCharacter());
/** @type {string} */
const settingName = eventsFunctionContext.getArgument("SettingName");
/** @type {float} */
const settingValue = eventsFunctionContext.getArgument("SettingValue");
/** @type {string} */
const id = eventsFunctionContext.getArgument("Identifier");

/** @type {{id:string, gravity: float, maxFallSpeed: float, jumpSpeed: float, jumpSustainTime: float, acceleration: float, deceleration: float, maxSpeed: float}[]} */
const configurationChanges = behavior.__configurationChanges || [];

const index = configurationChanges.findIndex(value => value.id === id);
let configurationChange;
if (index < 0) {
    configurationChange = {id:id, gravity: undefined, maxFallSpeed: undefined, jumpSpeed: undefined, jumpSustainTime: undefined, acceleration: undefined, deceleration: undefined, maxSpeed: undefined}
    configurationChanges.splice(0, 0, configurationChange);
}
else {
    configurationChange = configurationChanges[index];
    // Move the configuration change on top
    if (index > 0) {
        configurationChanges.splice(index, 1);
        configurationChanges.splice(0, 0, configurationChange);
    }
}
configurationChange[settingName] = settingValue;

};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.GDObjectObjects1);

const objects = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.GDObjectObjects1;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.userFunc0xba08f0(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSetting = function(SettingName, SettingValue, Identifier, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "SettingName") return SettingName;
if (argName === "SettingValue") return SettingValue;
if (argName === "Identifier") return Identifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureSettingContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects1= [];
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects2= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ConfigureSetting("gravity", eventsFunctionContext.getArgument("SettingValue"), eventsFunctionContext.getArgument("Identifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("PlatformerCharacter")).setGravity(eventsFunctionContext.getArgument("SettingValue"));
}
}
}

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravity = function(SettingValue, Identifier, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "SettingValue") return SettingValue;
if (argName === "Identifier") return Identifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureGravityContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects1= [];
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects2= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ConfigureSetting("deceleration", eventsFunctionContext.getArgument("SettingValue"), eventsFunctionContext.getArgument("Identifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("PlatformerCharacter")).setDeceleration(eventsFunctionContext.getArgument("SettingValue"));
}
}
}

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDeceleration = function(SettingValue, Identifier, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "SettingValue") return SettingValue;
if (argName === "Identifier") return Identifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureDecelerationContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects1= [];
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects2= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ConfigureSetting("maxSpeed", eventsFunctionContext.getArgument("SettingValue"), eventsFunctionContext.getArgument("Identifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("PlatformerCharacter")).setMaxSpeed(eventsFunctionContext.getArgument("SettingValue"));
}
}
}

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeed = function(SettingValue, Identifier, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "SettingValue") return SettingValue;
if (argName === "Identifier") return Identifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxSpeedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects1= [];
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects2= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ConfigureSetting("acceleration", eventsFunctionContext.getArgument("SettingValue"), eventsFunctionContext.getArgument("Identifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("PlatformerCharacter")).setAcceleration(eventsFunctionContext.getArgument("SettingValue"));
}
}
}

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAcceleration = function(SettingValue, Identifier, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "SettingValue") return SettingValue;
if (argName === "Identifier") return Identifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureAccelerationContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext = {};
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.idToCallbackMap = new Map();
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects1= [];
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects2= [];


gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ConfigureSetting("maxFallSpeed", eventsFunctionContext.getArgument("SettingValue"), eventsFunctionContext.getArgument("Identifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("PlatformerCharacter")).setMaxFallingSpeed(eventsFunctionContext.getArgument("SettingValue"), true);
}
}
}

}


};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeed = function(SettingValue, Identifier, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "PlatformerCharacter": this._getPlatformerCharacter()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AdvancedJump"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AdvancedJump"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "SettingValue") return SettingValue;
if (argName === "Identifier") return Identifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.ConfigureMaxFallSpeedContext.GDObjectObjects2.length = 0;


return;
}

gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerBehavior("AdvancedJump::PlatformerConfigurationStack", gdjs.evtsExt__AdvancedJump__PlatformerConfigurationStack.PlatformerConfigurationStack);
