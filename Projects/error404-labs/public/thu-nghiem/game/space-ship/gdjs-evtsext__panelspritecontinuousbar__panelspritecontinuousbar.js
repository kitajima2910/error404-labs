
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar || {};

/**
 * Object generated from Resource bar (continuous)
 */
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar = class PanelSpriteContinuousBar extends gdjs.CustomRuntimeObject2D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.MaxValue = objectData.content.MaxValue !== undefined ? objectData.content.MaxValue : Number("3") || 0;
    this._objectData.InitialValue = objectData.content.InitialValue !== undefined ? objectData.content.InitialValue : Number("3") || 0;
    this._objectData.PreviousInitialValue = Number("") || 0;
    this._objectData.PreviousHighValueDuration = objectData.content.PreviousHighValueDuration !== undefined ? objectData.content.PreviousHighValueDuration : Number("1") || 0;
    this._objectData.EasingDuration = objectData.content.EasingDuration !== undefined ? objectData.content.EasingDuration : Number("0.25") || 0;
    this._objectData.ShowLabel = objectData.content.ShowLabel !== undefined ? objectData.content.ShowLabel : true;
    this._objectData.BarLeftPlusRightMargin = Number("0") || 0;
    this._objectData.BarTopPlusBottomMargin = Number("0") || 0;
    this._objectData.OldParentWidth = Number("0") || 0;
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);
    if (oldObjectData.content.MaxValue !== newObjectData.content.MaxValue)
      this._objectData.MaxValue = newObjectData.content.MaxValue;
    if (oldObjectData.content.InitialValue !== newObjectData.content.InitialValue)
      this._objectData.InitialValue = newObjectData.content.InitialValue;
    if (oldObjectData.content.PreviousInitialValue !== newObjectData.content.PreviousInitialValue)
      this._objectData.PreviousInitialValue = newObjectData.content.PreviousInitialValue;
    if (oldObjectData.content.PreviousHighValueDuration !== newObjectData.content.PreviousHighValueDuration)
      this._objectData.PreviousHighValueDuration = newObjectData.content.PreviousHighValueDuration;
    if (oldObjectData.content.EasingDuration !== newObjectData.content.EasingDuration)
      this._objectData.EasingDuration = newObjectData.content.EasingDuration;
    if (oldObjectData.content.ShowLabel !== newObjectData.content.ShowLabel)
      this._objectData.ShowLabel = newObjectData.content.ShowLabel;
    if (oldObjectData.content.BarLeftPlusRightMargin !== newObjectData.content.BarLeftPlusRightMargin)
      this._objectData.BarLeftPlusRightMargin = newObjectData.content.BarLeftPlusRightMargin;
    if (oldObjectData.content.BarTopPlusBottomMargin !== newObjectData.content.BarTopPlusBottomMargin)
      this._objectData.BarTopPlusBottomMargin = newObjectData.content.BarTopPlusBottomMargin;
    if (oldObjectData.content.OldParentWidth !== newObjectData.content.OldParentWidth)
      this._objectData.OldParentWidth = newObjectData.content.OldParentWidth;

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  
  _getMaxValue() {
    return this._objectData.MaxValue !== undefined ? this._objectData.MaxValue : Number("3") || 0;
  }
  _setMaxValue(newValue) {
    this._objectData.MaxValue = newValue;
  }
  _getInitialValue() {
    return this._objectData.InitialValue !== undefined ? this._objectData.InitialValue : Number("3") || 0;
  }
  _setInitialValue(newValue) {
    this._objectData.InitialValue = newValue;
  }
  _getPreviousInitialValue() {
    return this._objectData.PreviousInitialValue !== undefined ? this._objectData.PreviousInitialValue : Number("") || 0;
  }
  _setPreviousInitialValue(newValue) {
    this._objectData.PreviousInitialValue = newValue;
  }
  _getPreviousHighValueDuration() {
    return this._objectData.PreviousHighValueDuration !== undefined ? this._objectData.PreviousHighValueDuration : Number("1") || 0;
  }
  _setPreviousHighValueDuration(newValue) {
    this._objectData.PreviousHighValueDuration = newValue;
  }
  _getEasingDuration() {
    return this._objectData.EasingDuration !== undefined ? this._objectData.EasingDuration : Number("0.25") || 0;
  }
  _setEasingDuration(newValue) {
    this._objectData.EasingDuration = newValue;
  }
  _getShowLabel() {
    return this._objectData.ShowLabel !== undefined ? this._objectData.ShowLabel : true;
  }
  _setShowLabel(newValue) {
    this._objectData.ShowLabel = newValue;
  }
  _toggleShowLabel() {
    this._setShowLabel(!this._getShowLabel());
  }
  _getBarLeftPlusRightMargin() {
    return this._objectData.BarLeftPlusRightMargin !== undefined ? this._objectData.BarLeftPlusRightMargin : Number("0") || 0;
  }
  _setBarLeftPlusRightMargin(newValue) {
    this._objectData.BarLeftPlusRightMargin = newValue;
  }
  _getBarTopPlusBottomMargin() {
    return this._objectData.BarTopPlusBottomMargin !== undefined ? this._objectData.BarTopPlusBottomMargin : Number("0") || 0;
  }
  _setBarTopPlusBottomMargin(newValue) {
    this._objectData.BarTopPlusBottomMargin = newValue;
  }
  _getOldParentWidth() {
    return this._objectData.OldParentWidth !== undefined ? this._objectData.OldParentWidth : Number("0") || 0;
  }
  _setOldParentWidth(newValue) {
    this._objectData.OldParentWidth = newValue;
  }

  

  
}

// Methods:
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects3= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects3= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects3= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects3= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects3= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteContinuousBar_9595_9595PanelSpriteContinuousBar_9546PanelSpriteContinuousBar_9546prototype_9546onCreatedContext_9546GDBufferObjects1Objects = Hashtable.newFrom({"Buffer": gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1});
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteContinuousBar_9595_9595PanelSpriteContinuousBar_9546PanelSpriteContinuousBar_9546prototype_9546onCreatedContext_9546GDBufferObjects1Objects = Hashtable.newFrom({"Buffer": gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1});
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.getSceneInstancesCount(eventsFunctionContext, gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteContinuousBar_9595_9595PanelSpriteContinuousBar_9546PanelSpriteContinuousBar_9546prototype_9546onCreatedContext_9546GDBufferObjects1Objects) > 0;
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1, gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2);

gdjs.copyArray(gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1, gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2);

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects2);
{eventsFunctionContext.getObjects("Object")[0]._setBarLeftPlusRightMargin((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects2[0].getWidth()) - (Math.max((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2[0].getAABBRight()), (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2[0].getAABBRight())) - Math.min((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2[0].getAABBLeft()), (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2[0].getAABBLeft()))))
}
{eventsFunctionContext.getObjects("Object")[0]._setBarTopPlusBottomMargin((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects2[0].getHeight()) - (Math.max((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2[0].getAABBBottom()), (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2[0].getAABBBottom())) - Math.min((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2[0].getAABBTop()), (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2[0].getAABBTop()))))
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.getSceneInstancesCount(eventsFunctionContext, gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595PanelSpriteContinuousBar_9595_9595PanelSpriteContinuousBar_9546PanelSpriteContinuousBar_9546prototype_9546onCreatedContext_9546GDBufferObjects1Objects) == 0;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1 */
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1);
{eventsFunctionContext.getObjects("Object")[0]._setBarLeftPlusRightMargin((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1[0].getWidth()) - ((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1[0].getAABBRight()) - (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1[0].getAABBLeft())))
}
{eventsFunctionContext.getObjects("Object")[0]._setBarTopPlusBottomMargin((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1[0].getHeight()) - ((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1[0].getAABBBottom()) - (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1[0].getAABBTop())))
}
}

}


};gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1[i].activateBehavior(eventsFunctionContext.getBehaviorName("Anchor"), false);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1[i].activateBehavior(eventsFunctionContext.getBehaviorName("Anchor"), false);
}
}

{ //Subevents
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{



}


{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0]._setPreviousInitialValue(eventsFunctionContext.getObjects("Object")[0]._getInitialValue())
}
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0]._getPreviousHighValueDuration() == 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1[i].deleteFromScene(runtimeScene);
}
}
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getObjects("Object")[0]._getShowLabel();
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects1[i].hide();
}
}
}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1[i].SetMaxValue(eventsFunctionContext.getObjects("Object")[0]._getMaxValue(), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).SetValue(eventsFunctionContext.getObjects("Object")[0]._getInitialValue(), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1[0].WidthForValue(eventsFunctionContext)));
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1[0].getWidth()));
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1[i].SetPreviousValueDuration(eventsFunctionContext.getObjects("Object")[0]._getPreviousHighValueDuration(), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1[i].UpdateLabel(eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects3.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects3.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects3.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects3.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDLabelObjects3.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDFillBarObjects3.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBufferObjects3.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onCreatedContext.GDBackgroundObjects3.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1[i].UpdateLayout(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1[i].SetMaxValue(eventsFunctionContext.getObjects("Object")[0]._getMaxValue(), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0]._getInitialValue() != eventsFunctionContext.getObjects("Object")[0]._getPreviousInitialValue());
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1);
{eventsFunctionContext.getObjects("Object")[0]._setPreviousInitialValue(eventsFunctionContext.getObjects("Object")[0]._getInitialValue())
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1[i].SetValue(eventsFunctionContext.getObjects("Object")[0]._getInitialValue(), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1[i].SetPreviousValueDuration(eventsFunctionContext.getObjects("Object")[0]._getPreviousHighValueDuration(), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).removeTween("ChangeValue");
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1[0].WidthForValue(eventsFunctionContext)));
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloading = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.onHotReloadingContext.GDBackgroundObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0]._getOldParentWidth() != (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1[0].getWidth()));
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1);
/* Reuse gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1 */
{eventsFunctionContext.getObjects("Object")[0]._setOldParentWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1[0].getWidth()))
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1[0].WidthForValue(eventsFunctionContext)));
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[0].getWidth()));
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).removeTween("ChangeValue");
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).removeTween("ChangeValue");
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setHeight((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1[0].getHeight()) - eventsFunctionContext.getObjects("Object")[0]._getBarTopPlusBottomMargin());
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setHeight((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[0].getHeight()));
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1[i].IsChanging(eventsFunctionContext)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(9267084);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1);
/* Reuse gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectWidthTween2("ChangeValue", (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1[0].WidthForValue(eventsFunctionContext)), "linear", eventsFunctionContext.getObjects("Object")[0]._getEasingDuration(), false);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).getWidth() < (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1[0].getWidth()) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[k] = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1 */
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1[i].hide(false);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).getWidth() >= (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1[0].getWidth()) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[k] = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1 */
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1[i].hide();
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPostEventsContext.GDBackgroundObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects1[0].WidthForValue(eventsFunctionContext)));
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects1[0].getWidth()));
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayout = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLayoutContext.GDBackgroundObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).Value(eventsFunctionContext));}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.Value = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.ValueContext.GDBackgroundObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).SetValue(eventsFunctionContext.getArgument("Value"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0]._getEasingDuration() > 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectWidthTween2("ChangeValue", (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1[0].WidthForValue(eventsFunctionContext)), "linear", eventsFunctionContext.getObjects("Object")[0]._getEasingDuration(), false);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0]._getEasingDuration() <= 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1[0].WidthForValue(eventsFunctionContext)));
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1[i].UpdateLabel(eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).IsChanging(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1[k] = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects1);
/* Reuse gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1 */
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setWidth(Math.round((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1[0].FullBarWidth(eventsFunctionContext)) * (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).PreviousHighValue(eventsFunctionContext)) / (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).MaxValue(eventsFunctionContext))));
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValue = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetValueContext.GDBackgroundObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).MaxValue(eventsFunctionContext));}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValue = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.MaxValueContext.GDBackgroundObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).SetMaxValue(eventsFunctionContext.getArgument("Value"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects1[i].UpdateLabel(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects1[i].UpdateLayout(eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValue = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetMaxValueContext.GDBackgroundObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).IsEmpty(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1[k] = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmpty = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsEmptyContext.GDBackgroundObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).IsFull(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1[k] = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFull = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsFullContext.GDBackgroundObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).PreviousHighValueDuration(eventsFunctionContext));}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDuration = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.PreviousValueDurationContext.GDBackgroundObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).SetPreviousHighValueDuration(eventsFunctionContext.getArgument("Value"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("Value")) || 0) != 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1[i].hide(false);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("Value")) || 0) == 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Buffer"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1[i].hide();
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDuration = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetPreviousValueDurationContext.GDBackgroundObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).IsChanging(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1[k] = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChanging = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsChangingContext.GDBackgroundObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("FillBar"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = Math.round((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects1[0].FullBarWidth(eventsFunctionContext)) * (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).Value(eventsFunctionContext)) / (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("ResourceBar")).MaxValue(eventsFunctionContext)));}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValue = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.WidthForValueContext.GDBackgroundObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects1[0].getWidth()) - eventsFunctionContext.getObjects("Object")[0]._getBarLeftPlusRightMargin();}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidth = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.FullBarWidthContext.GDBackgroundObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getObjects("Object")[0]._getShowLabel();
}
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShown = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.IsLabelShownContext.GDBackgroundObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1);
{eventsFunctionContext.getObjects("Object")[0]._setShowLabel(false)
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1[i].hide();
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1);
{eventsFunctionContext.getObjects("Object")[0]._setShowLabel(true)
}
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1[i].hide(false);
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShown = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.SetLabelShownContext.GDBackgroundObjects2.length = 0;


return;
}
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext = {};
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.idToCallbackMap = new Map();
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDFillBarObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDFillBarObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBufferObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBufferObjects2= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBackgroundObjects1= [];
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBackgroundObjects2= [];


gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Label"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects1.length ;i < len;++i) {
    gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Text")).setText(gdjs.evtTools.common.toString(Math.round((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects1[0].Value(eventsFunctionContext)))) + " / " + gdjs.evtTools.common.toString((( gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects1[0].MaxValue(eventsFunctionContext))));
}
}
}

}


};

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabel = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDLabelObjectsList = [...runtimeScene.getObjects("Label")];
var GDLabelObjects = Hashtable.newFrom({"Label": thisGDLabelObjectsList});
var thisGDFillBarObjectsList = [...runtimeScene.getObjects("FillBar")];
var GDFillBarObjects = Hashtable.newFrom({"FillBar": thisGDFillBarObjectsList});
var thisGDBufferObjectsList = [...runtimeScene.getObjects("Buffer")];
var GDBufferObjects = Hashtable.newFrom({"Buffer": thisGDBufferObjectsList});
var thisGDBackgroundObjectsList = [...runtimeScene.getObjects("Background")];
var GDBackgroundObjects = Hashtable.newFrom({"Background": thisGDBackgroundObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Label": GDLabelObjects
, "FillBar": GDFillBarObjects
, "Buffer": GDBufferObjects
, "Background": GDBackgroundObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Label": thisGDLabelObjectsList
, "FillBar": thisGDFillBarObjectsList
, "Buffer": thisGDBufferObjectsList
, "Background": thisGDBackgroundObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("PanelSpriteContinuousBar"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("PanelSpriteContinuousBar"),
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

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBackgroundObjects2.length = 0;

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDLabelObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDFillBarObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDFillBarObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBufferObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBufferObjects2.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBackgroundObjects1.length = 0;
gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.UpdateLabelContext.GDBackgroundObjects2.length = 0;


return;
}

gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerObject("PanelSpriteContinuousBar::PanelSpriteContinuousBar", gdjs.evtsExt__PanelSpriteContinuousBar__PanelSpriteContinuousBar.PanelSpriteContinuousBar);
