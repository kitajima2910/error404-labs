gdjs.Level01Code = {};
gdjs.Level01Code.localVariables = [];
gdjs.Level01Code.idToCallbackMap = new Map();
gdjs.Level01Code.GDShipObjects1= [];
gdjs.Level01Code.GDShipObjects2= [];
gdjs.Level01Code.GDPlatformObjects1= [];
gdjs.Level01Code.GDPlatformObjects2= [];
gdjs.Level01Code.GDPersonObjects1= [];
gdjs.Level01Code.GDPersonObjects2= [];
gdjs.Level01Code.GDPeopleObjects1= [];
gdjs.Level01Code.GDPeopleObjects2= [];
gdjs.Level01Code.GDBaseObjects1= [];
gdjs.Level01Code.GDBaseObjects2= [];
gdjs.Level01Code.GDWin_9595TextObjects1= [];
gdjs.Level01Code.GDWin_9595TextObjects2= [];
gdjs.Level01Code.GDFuelObjects1= [];
gdjs.Level01Code.GDFuelObjects2= [];
gdjs.Level01Code.GDPeople_9595LabelObjects1= [];
gdjs.Level01Code.GDPeople_9595LabelObjects2= [];
gdjs.Level01Code.GDFuel_9595LabelObjects1= [];
gdjs.Level01Code.GDFuel_9595LabelObjects2= [];
gdjs.Level01Code.GDFuel_9595BoosterObjects1= [];
gdjs.Level01Code.GDFuel_9595BoosterObjects2= [];
gdjs.Level01Code.GDBasicFlameObjects1= [];
gdjs.Level01Code.GDBasicFlameObjects2= [];
gdjs.Level01Code.GDRight_9595SteamObjects1= [];
gdjs.Level01Code.GDRight_9595SteamObjects2= [];
gdjs.Level01Code.GDLeft_9595SteamObjects1= [];
gdjs.Level01Code.GDLeft_9595SteamObjects2= [];


gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDShipObjects1Objects = Hashtable.newFrom({"Ship": gdjs.Level01Code.GDShipObjects1});
gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDPersonObjects1Objects = Hashtable.newFrom({"Person": gdjs.Level01Code.GDPersonObjects1});
gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDShipObjects1Objects = Hashtable.newFrom({"Ship": gdjs.Level01Code.GDShipObjects1});
gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDPersonObjects1Objects = Hashtable.newFrom({"Person": gdjs.Level01Code.GDPersonObjects1});
gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDShipObjects1Objects = Hashtable.newFrom({"Ship": gdjs.Level01Code.GDShipObjects1});
gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDBaseObjects1Objects = Hashtable.newFrom({"Base": gdjs.Level01Code.GDBaseObjects1});
gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDWin_95959595TextObjects1Objects = Hashtable.newFrom({"Win_Text": gdjs.Level01Code.GDWin_9595TextObjects1});
gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDShipObjects1Objects = Hashtable.newFrom({"Ship": gdjs.Level01Code.GDShipObjects1});
gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDFuel_95959595BoosterObjects1Objects = Hashtable.newFrom({"Fuel_Booster": gdjs.Level01Code.GDFuel_9595BoosterObjects1});
gdjs.Level01Code.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Fuel"), gdjs.Level01Code.GDFuelObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "w");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level01Code.GDFuelObjects1.length;i<l;++i) {
    if ( gdjs.Level01Code.GDFuelObjects1[i].Value(null) > 0 ) {
        isConditionTrue_0 = true;
        gdjs.Level01Code.GDFuelObjects1[k] = gdjs.Level01Code.GDFuelObjects1[i];
        ++k;
    }
}
gdjs.Level01Code.GDFuelObjects1.length = k;
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("BasicFlame"), gdjs.Level01Code.GDBasicFlameObjects1);
/* Reuse gdjs.Level01Code.GDFuelObjects1 */
gdjs.copyArray(runtimeScene.getObjects("Ship"), gdjs.Level01Code.GDShipObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDShipObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDShipObjects1[i].getBehavior("Physics2").applyForce(0, -(6), 0, 0);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDFuelObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDFuelObjects1[i].SetValue(gdjs.Level01Code.GDFuelObjects1[i].Value(null) - (1), null);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDBasicFlameObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDBasicFlameObjects1[i].startEmission();
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "w");
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("BasicFlame"), gdjs.Level01Code.GDBasicFlameObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDBasicFlameObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDBasicFlameObjects1[i].stopEmission();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Fuel"), gdjs.Level01Code.GDFuelObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "a");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level01Code.GDFuelObjects1.length;i<l;++i) {
    if ( gdjs.Level01Code.GDFuelObjects1[i].Value(null) > 0 ) {
        isConditionTrue_0 = true;
        gdjs.Level01Code.GDFuelObjects1[k] = gdjs.Level01Code.GDFuelObjects1[i];
        ++k;
    }
}
gdjs.Level01Code.GDFuelObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.Level01Code.GDFuelObjects1 */
gdjs.copyArray(runtimeScene.getObjects("Right_Steam"), gdjs.Level01Code.GDRight_9595SteamObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ship"), gdjs.Level01Code.GDShipObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDShipObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDShipObjects1[i].getBehavior("Physics2").applyForce(-(1), 0, 0, 0);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDFuelObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDFuelObjects1[i].SetValue(gdjs.Level01Code.GDFuelObjects1[i].Value(null) - (1), null);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDRight_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDRight_9595SteamObjects1[i].startEmission();
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "a");
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Right_Steam"), gdjs.Level01Code.GDRight_9595SteamObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDRight_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDRight_9595SteamObjects1[i].stopEmission();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Fuel"), gdjs.Level01Code.GDFuelObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "d");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level01Code.GDFuelObjects1.length;i<l;++i) {
    if ( gdjs.Level01Code.GDFuelObjects1[i].Value(null) > 0 ) {
        isConditionTrue_0 = true;
        gdjs.Level01Code.GDFuelObjects1[k] = gdjs.Level01Code.GDFuelObjects1[i];
        ++k;
    }
}
gdjs.Level01Code.GDFuelObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.Level01Code.GDFuelObjects1 */
gdjs.copyArray(runtimeScene.getObjects("Left_Steam"), gdjs.Level01Code.GDLeft_9595SteamObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ship"), gdjs.Level01Code.GDShipObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDShipObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDShipObjects1[i].getBehavior("Physics2").applyForce(1, 0, 0, 0);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDFuelObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDFuelObjects1[i].SetValue(gdjs.Level01Code.GDFuelObjects1[i].Value(null) - (1), null);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDLeft_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDLeft_9595SteamObjects1[i].startEmission();
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "d");
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Left_Steam"), gdjs.Level01Code.GDLeft_9595SteamObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDLeft_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDLeft_9595SteamObjects1[i].stopEmission();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Person"), gdjs.Level01Code.GDPersonObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ship"), gdjs.Level01Code.GDShipObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level01Code.GDShipObjects1.length;i<l;++i) {
    if ( gdjs.Level01Code.GDShipObjects1[i].getBehavior("Physics2").getLinearVelocityLength() == 0 ) {
        isConditionTrue_0 = true;
        gdjs.Level01Code.GDShipObjects1[k] = gdjs.Level01Code.GDShipObjects1[i];
        ++k;
    }
}
gdjs.Level01Code.GDShipObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.distanceTest(gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDShipObjects1Objects, gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDPersonObjects1Objects, 300, false);
}
if (isConditionTrue_0) {
/* Reuse gdjs.Level01Code.GDPersonObjects1 */
/* Reuse gdjs.Level01Code.GDShipObjects1 */
{for(var i = 0, len = gdjs.Level01Code.GDPersonObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDPersonObjects1[i].addForceTowardObject((gdjs.Level01Code.GDShipObjects1.length !== 0 ? gdjs.Level01Code.GDShipObjects1[0] : null), 5, 1);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Person"), gdjs.Level01Code.GDPersonObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ship"), gdjs.Level01Code.GDShipObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level01Code.GDShipObjects1.length;i<l;++i) {
    if ( gdjs.Level01Code.GDShipObjects1[i].getBehavior("Physics2").getLinearVelocityLength() == 0 ) {
        isConditionTrue_0 = true;
        gdjs.Level01Code.GDShipObjects1[k] = gdjs.Level01Code.GDShipObjects1[i];
        ++k;
    }
}
gdjs.Level01Code.GDShipObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDShipObjects1Objects, gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDPersonObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(14006388);
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("People"), gdjs.Level01Code.GDPeopleObjects1);
/* Reuse gdjs.Level01Code.GDPersonObjects1 */
/* Reuse gdjs.Level01Code.GDShipObjects1 */
{for(var i = 0, len = gdjs.Level01Code.GDPersonObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDPersonObjects1[i].deleteFromScene(runtimeScene);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDPeopleObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDPeopleObjects1[i].SetValue(gdjs.Level01Code.GDPeopleObjects1[i].Value(null) + (1), null);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDShipObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDShipObjects1[i].getBehavior("Scale").setScale(1.3);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDShipObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDShipObjects1[i].getBehavior("Tween").addObjectScaleTween3("bounce", 1, "bouncePast", 0.4, false, false);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Base"), gdjs.Level01Code.GDBaseObjects1);
gdjs.copyArray(runtimeScene.getObjects("People"), gdjs.Level01Code.GDPeopleObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ship"), gdjs.Level01Code.GDShipObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level01Code.GDShipObjects1.length;i<l;++i) {
    if ( gdjs.Level01Code.GDShipObjects1[i].getBehavior("Physics2").getLinearVelocityLength() == 0 ) {
        isConditionTrue_0 = true;
        gdjs.Level01Code.GDShipObjects1[k] = gdjs.Level01Code.GDShipObjects1[i];
        ++k;
    }
}
gdjs.Level01Code.GDShipObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level01Code.GDPeopleObjects1.length;i<l;++i) {
    if ( gdjs.Level01Code.GDPeopleObjects1[i].Value(null) == 10 ) {
        isConditionTrue_0 = true;
        gdjs.Level01Code.GDPeopleObjects1[k] = gdjs.Level01Code.GDPeopleObjects1[i];
        ++k;
    }
}
gdjs.Level01Code.GDPeopleObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.physics2.areObjectsColliding(gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDShipObjects1Objects, "Physics2", gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDBaseObjects1Objects, false);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.Level01Code.GDShipObjects1 */
gdjs.Level01Code.GDWin_9595TextObjects1.length = 0;

{gdjs.evtTools.object.createObjectOnScene(runtimeScene, gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDWin_95959595TextObjects1Objects, (( gdjs.Level01Code.GDShipObjects1.length === 0 ) ? 0 :gdjs.Level01Code.GDShipObjects1[0].getPointX("")) - 75, (( gdjs.Level01Code.GDShipObjects1.length === 0 ) ? 0 :gdjs.Level01Code.GDShipObjects1[0].getPointY("")) - 100, "");
}
{for(var i = 0, len = gdjs.Level01Code.GDShipObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDShipObjects1[i].getBehavior("Physics2").setStatic();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Fuel_Booster"), gdjs.Level01Code.GDFuel_9595BoosterObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ship"), gdjs.Level01Code.GDShipObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDShipObjects1Objects, gdjs.Level01Code.mapOfGDgdjs_9546Level01Code_9546GDFuel_95959595BoosterObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(10691964);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Fuel"), gdjs.Level01Code.GDFuelObjects1);
/* Reuse gdjs.Level01Code.GDFuel_9595BoosterObjects1 */
/* Reuse gdjs.Level01Code.GDShipObjects1 */
{for(var i = 0, len = gdjs.Level01Code.GDFuelObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDFuelObjects1[i].SetValue(gdjs.Level01Code.GDFuelObjects1[i].Value(null) + (1000), null);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDFuel_9595BoosterObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDFuel_9595BoosterObjects1[i].deleteFromScene(runtimeScene);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDShipObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDShipObjects1[i].getBehavior("Scale").setScale(1.3);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDShipObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDShipObjects1[i].getBehavior("Tween").addObjectScaleTween3("bounce", 1, "bouncePast", 0.4, false, false);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("BasicFlame"), gdjs.Level01Code.GDBasicFlameObjects1);
gdjs.copyArray(runtimeScene.getObjects("Left_Steam"), gdjs.Level01Code.GDLeft_9595SteamObjects1);
gdjs.copyArray(runtimeScene.getObjects("Right_Steam"), gdjs.Level01Code.GDRight_9595SteamObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ship"), gdjs.Level01Code.GDShipObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDBasicFlameObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDBasicFlameObjects1[i].setPosition((( gdjs.Level01Code.GDShipObjects1.length === 0 ) ? 0 :gdjs.Level01Code.GDShipObjects1[0].getCenterXInScene()),(( gdjs.Level01Code.GDShipObjects1.length === 0 ) ? 0 :gdjs.Level01Code.GDShipObjects1[0].getCenterYInScene()) + 35);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDBasicFlameObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDBasicFlameObjects1[i].setAngle(90);
}
}
{for(var i = 0, len = gdjs.Level01Code.GDRight_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDRight_9595SteamObjects1[i].setPosition((( gdjs.Level01Code.GDShipObjects1.length === 0 ) ? 0 :gdjs.Level01Code.GDShipObjects1[0].getCenterXInScene()) + 35,(( gdjs.Level01Code.GDShipObjects1.length === 0 ) ? 0 :gdjs.Level01Code.GDShipObjects1[0].getCenterYInScene()));
}
}
{for(var i = 0, len = gdjs.Level01Code.GDLeft_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDLeft_9595SteamObjects1[i].setPosition((( gdjs.Level01Code.GDShipObjects1.length === 0 ) ? 0 :gdjs.Level01Code.GDShipObjects1[0].getCenterXInScene()) - 35,(( gdjs.Level01Code.GDShipObjects1.length === 0 ) ? 0 :gdjs.Level01Code.GDShipObjects1[0].getCenterYInScene()));
}
}
{for(var i = 0, len = gdjs.Level01Code.GDLeft_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDLeft_9595SteamObjects1[i].setAngle(180);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("BasicFlame"), gdjs.Level01Code.GDBasicFlameObjects1);
gdjs.copyArray(runtimeScene.getObjects("Left_Steam"), gdjs.Level01Code.GDLeft_9595SteamObjects1);
gdjs.copyArray(runtimeScene.getObjects("Right_Steam"), gdjs.Level01Code.GDRight_9595SteamObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDBasicFlameObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDBasicFlameObjects1[i].stopEmission();
}
}
{for(var i = 0, len = gdjs.Level01Code.GDRight_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDRight_9595SteamObjects1[i].stopEmission();
}
}
{for(var i = 0, len = gdjs.Level01Code.GDLeft_9595SteamObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDLeft_9595SteamObjects1[i].stopEmission();
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "p");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(10354676);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("People"), gdjs.Level01Code.GDPeopleObjects1);
{for(var i = 0, len = gdjs.Level01Code.GDPeopleObjects1.length ;i < len;++i) {
    gdjs.Level01Code.GDPeopleObjects1[i].SetValue(10, null);
}
}
}

}


};

gdjs.Level01Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Level01Code.GDShipObjects1.length = 0;
gdjs.Level01Code.GDShipObjects2.length = 0;
gdjs.Level01Code.GDPlatformObjects1.length = 0;
gdjs.Level01Code.GDPlatformObjects2.length = 0;
gdjs.Level01Code.GDPersonObjects1.length = 0;
gdjs.Level01Code.GDPersonObjects2.length = 0;
gdjs.Level01Code.GDPeopleObjects1.length = 0;
gdjs.Level01Code.GDPeopleObjects2.length = 0;
gdjs.Level01Code.GDBaseObjects1.length = 0;
gdjs.Level01Code.GDBaseObjects2.length = 0;
gdjs.Level01Code.GDWin_9595TextObjects1.length = 0;
gdjs.Level01Code.GDWin_9595TextObjects2.length = 0;
gdjs.Level01Code.GDFuelObjects1.length = 0;
gdjs.Level01Code.GDFuelObjects2.length = 0;
gdjs.Level01Code.GDPeople_9595LabelObjects1.length = 0;
gdjs.Level01Code.GDPeople_9595LabelObjects2.length = 0;
gdjs.Level01Code.GDFuel_9595LabelObjects1.length = 0;
gdjs.Level01Code.GDFuel_9595LabelObjects2.length = 0;
gdjs.Level01Code.GDFuel_9595BoosterObjects1.length = 0;
gdjs.Level01Code.GDFuel_9595BoosterObjects2.length = 0;
gdjs.Level01Code.GDBasicFlameObjects1.length = 0;
gdjs.Level01Code.GDBasicFlameObjects2.length = 0;
gdjs.Level01Code.GDRight_9595SteamObjects1.length = 0;
gdjs.Level01Code.GDRight_9595SteamObjects2.length = 0;
gdjs.Level01Code.GDLeft_9595SteamObjects1.length = 0;
gdjs.Level01Code.GDLeft_9595SteamObjects2.length = 0;

gdjs.Level01Code.eventsList0(runtimeScene);
gdjs.Level01Code.GDShipObjects1.length = 0;
gdjs.Level01Code.GDShipObjects2.length = 0;
gdjs.Level01Code.GDPlatformObjects1.length = 0;
gdjs.Level01Code.GDPlatformObjects2.length = 0;
gdjs.Level01Code.GDPersonObjects1.length = 0;
gdjs.Level01Code.GDPersonObjects2.length = 0;
gdjs.Level01Code.GDPeopleObjects1.length = 0;
gdjs.Level01Code.GDPeopleObjects2.length = 0;
gdjs.Level01Code.GDBaseObjects1.length = 0;
gdjs.Level01Code.GDBaseObjects2.length = 0;
gdjs.Level01Code.GDWin_9595TextObjects1.length = 0;
gdjs.Level01Code.GDWin_9595TextObjects2.length = 0;
gdjs.Level01Code.GDFuelObjects1.length = 0;
gdjs.Level01Code.GDFuelObjects2.length = 0;
gdjs.Level01Code.GDPeople_9595LabelObjects1.length = 0;
gdjs.Level01Code.GDPeople_9595LabelObjects2.length = 0;
gdjs.Level01Code.GDFuel_9595LabelObjects1.length = 0;
gdjs.Level01Code.GDFuel_9595LabelObjects2.length = 0;
gdjs.Level01Code.GDFuel_9595BoosterObjects1.length = 0;
gdjs.Level01Code.GDFuel_9595BoosterObjects2.length = 0;
gdjs.Level01Code.GDBasicFlameObjects1.length = 0;
gdjs.Level01Code.GDBasicFlameObjects2.length = 0;
gdjs.Level01Code.GDRight_9595SteamObjects1.length = 0;
gdjs.Level01Code.GDRight_9595SteamObjects2.length = 0;
gdjs.Level01Code.GDLeft_9595SteamObjects1.length = 0;
gdjs.Level01Code.GDLeft_9595SteamObjects2.length = 0;


return;

}

gdjs['Level01Code'] = gdjs.Level01Code;
