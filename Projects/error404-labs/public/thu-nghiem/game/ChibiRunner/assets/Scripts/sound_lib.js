// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
	
    onLoad: function () {
		this.soundUrlList = [];
		this.seamlessAudioIdList = [];
		this.load('', true, 0.5);
		this.seamlessAudioList = [];
		
		this.SeamlessAudio = cc.Class({
			
			properties: {
				clip : cc.AudioClip,
				id: 0,
				startBuffer: 0,
				endBuffer : 0,
			},
			
			getId: function () {
				return this.id;
			},
			
			setId: function (value) {
				this.id = value;
			},
			
			getStartBuffer: function () {
				return this.startBuffer;
			},
			
			setStartBuffer: function (value) {
				this.startBuffer = value;
			},
			
			getEndBuffer: function () {
				return this.endBuffer;
			},
			
			setEndBuffer: function (value) {
				this.endBuffer = value;
			}
		});
		
		this.fadeAudioList = [];
		
		this.FadeAudio = cc.Class({
			
			properties: {
				id: 0,
				fadeRate: 0,
				endVolume: 0,
			},
			
			getId: function () {
				return this.id;
			},
			
			setId: function (value) {
				this.id = value;
			},
			
			getFadeRate: function () {
				return this.fadeRate;
			},
			
			setFadeRate: function (value) {
				this.fadeRate = value;
			},
			
			getEndVolume: function () {
				return this.endVolume;
			},
			
			setEndVolume: function (value) {
				this.endVolume = value;
			}
		});
		
		this.startTime = (new Date()).getTime();
		this.fps = 0;
		this.frameCount = 0;
	},
	
	load : function (url, loop, volume) 
	{
	  url = "Sounds/spark_man";
	  loop = true;
	  volume = 0.5;
	  for (var i = 0; i < this.soundUrlList.length; i++) 
	  {
		  if (this.soundUrlList[i] == url)
		  {
			  return;
		  }
	  }
	  this.soundUrlList.push(url);
	  var self = this;
	  cc.resources.load(url, function (err, clip) {
		 //let path = clip.nativeUrl;
		 let id = cc.audioEngine.play(clip, true, volume);
		 //self.playSeamlessAudio(id, 150, 440);
		 //self.playFadeAudio(id, 0, 0.9, 10000);
		 self.playAtMarker(id, "0:1:0:0");
	  });
	},
	
	getFormat: function (clip)
	{
		return clip.nativeUrl.substr(clip.nativeUrl.length - 3, 3).toLowerCase();
	},
	
	playSeamlessAudio: function (id, startBuffer, endBuffer)
	{
		startBuffer /= 1000;
		endBuffer /= 1000;
		let audio = new this.SeamlessAudio();
		audio.setId(id);
		audio.setStartBuffer(startBuffer);
		audio.setEndBuffer(endBuffer);
		this.seamlessAudioList.push(audio);
	},
	
	seamlessProcess: function ()
	{
		for (let i = 0; i < this.seamlessAudioList.length; i++)
		{
			if (cc.audioEngine.isLoop(this.seamlessAudioList[i].getId())
				&& cc.audioEngine.getState(this.seamlessAudioList[i].getId()) == 1
				&& cc.audioEngine.getCurrentTime(this.seamlessAudioList[i].getId()) > cc.audioEngine.getDuration(this.seamlessAudioList[i].getId()) - this.seamlessAudioList[i].getEndBuffer()
				)
			{
				cc.audioEngine.setCurrentTime(this.seamlessAudioList[i].getId(), this.seamlessAudioList[i].getStartBuffer());
			}
		}
	},
	
	playFadeAudio: function (id, startVolume, endVolume, requiredTime)
	{
		if (this.fps > 0)
		{
			let remainingTime = (cc.audioEngine.getDuration(id) - cc.audioEngine.getCurrentTime(id)) * 1000;
			if (requiredTime == 0 || remainingTime < requiredTime)
			{
				requiredTime = remainingTime;
			}
			requiredTime /= 1000;
			let totalFrame = requiredTime * this.fps;
			let volumeGap = endVolume - cc.audioEngine.getVolume(id);
			let audio = new this.FadeAudio();
			audio.setId(id);
			audio.setEndVolume(endVolume);
			audio.setFadeRate(volumeGap / totalFrame);
			this.fadeAudioList.push(audio);
		}
	},
	
	fadeProcess: function ()
	{
		for (let i = 0; i < this.fadeAudioList.length; i++)
		{
			if (cc.audioEngine.getVolume(this.fadeAudioList[i].getId()) != this.fadeAudioList[i].getEndVolume())
			{
				if (this.fadeAudioList[i].getFadeRate() > 0)
				{
					if (cc.audioEngine.getVolume(this.fadeAudioList[i].getId()) > this.fadeAudioList[i].getEndVolume())
					{
						cc.audioEngine.setVolume(this.fadeAudioList[i].getId(), this.fadeAudioList[i].getEndVolume());
						continue;
					}
				}
				else if (this.fadeAudioList[i].getFadeRate() < 0)
				{
					if (cc.audioEngine.getVolume(this.fadeAudioList[i].getId()) < this.fadeAudioList[i].getEndVolume())
					{
						cc.audioEngine.setVolume(this.fadeAudioList[i].getId(), this.fadeAudioList[i].getEndVolume());
						continue;
					}
				}
				cc.audioEngine.setVolume(this.fadeAudioList[i].getId(), cc.audioEngine.getVolume(this.fadeAudioList[i].getId()) + this.fadeAudioList[i].getFadeRate());
			}
		}
	},
	
	getFPS: function ()
	{
		if (this.fps > 0)
			return;
		if ((new Date()).getTime() - this.startTime >= 1000)
		{
			this.fps = this.frameCount;
			return;
		}
		this.frameCount += 1;
	},
	
	markerToTimeInSec: function (marker)
	{
		let timeArray = marker.split(":");
		let hour = 0;
		let min = 0;
		let sec = 0;
		let milSec = 0;
		if (timeArray.length == 4)
		{
			hour = parseInt(timeArray[0]);
			min = parseInt(timeArray[1]);
			sec = parseInt(timeArray[2]);
			milSec = parseInt(timeArray[3]);
		}
		else if (timeArray.length == 3)
		{
			min = parseInt(timeArray[0]);
			sec = parseInt(timeArray[1]);
			milSec = parseInt(timeArray[2]);
		}
		else if (timeArray.length == 2)
		{
			sec = parseInt(timeArray[0]);
			milSec = parseInt(timeArray[1]);
		}
		else if (timeArray.length == 1)
		{
			milSec = parseInt(timeArray[0]);
		}
		let totalSec = hour * 3600 + min * 60 + sec + (milSec / 1000);
		return totalSec;
	},
	
	playAtMarker: function (id, marker)
	{
		cc.audioEngine.setCurrentTime(id, this.markerToTimeInSec(marker));
	},

    start () {

    },

    update: function (dt)
	{
		this.getFPS();
		this.seamlessProcess();
		this.fadeProcess();
	},
});
