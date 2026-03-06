/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package pl.zb3.freej2me.audio;

import java.io.IOException;
import java.io.InputStream;

import javax.microedition.media.Player;
import javax.microedition.media.control.VideoControl;

import com.siemens.mp.media.PlayerListener;

import pl.zb3.freej2me.bridge.media.MediaBridge;
import pl.zb3.freej2me.bridge.media.PlayerEventHandler;
import pl.zb3.freej2me.bridge.media.PlayerHandleHolder;
import pl.zb3.freej2me.bridge.media.PlayerResourceManager;
import pl.zb3.freej2me.bridge.media.StopListener;

import javax.microedition.lcdui.Canvas;
import javax.microedition.media.BasePlayer;
import javax.microedition.media.MediaException;


public class LibmediaPlayer extends BasePlayer implements VideoControl, StopListener, PlayerHandleHolder
{
	private String contentType = "";
	private InputStream stream;
	private Object playerHandle = null;
	private boolean loaded = false;

	int videoSourceWidth = 0;
	int videoSourceHeight = 0;

	int videoDisplayX;
	int videoDisplayY;
	boolean videoDisplayFullscreen = false;
	int videoDisplayWidth = 0;
	int videoDisplayHeight = 0;
	Canvas videoCanvas = null;
	boolean videoVisible = true;
	// source width/height retrieved via natives
	// we don't know how fullscreen even works


	public LibmediaPlayer(InputStream stream, String type)
	{
		contentType = type;
		this.stream = stream;

		this.controls.put(VideoControl.class.getName(), this);

		// create it now as some methods depend on this
		playerHandle = MediaBridge.createMediaPlayer();
	}

	// doRealize does nothing, the work is done on prefetch


	@Override
	public void doPrefetch() throws IOException {
		// we can't repeat this, so simple ignore deallocate requests
		if (loaded) return;

		boolean ok = false;
		try {
			ok = MediaBridge.playerLoad(playerHandle, readBytesAndClose(stream), contentType);
		} catch (Exception e) {
		}



		if (!ok) {
			// not sure this makes sense..
			System.out.println("failed to load file");
			MediaBridge.playerClose(playerHandle);
			playerHandle = null;
			return;
		}

		loaded = true;
		PlayerEventHandler.registerStopListener(playerHandle, this);

		checkForVideo();
	}

	@Override
	public void doStart() {
		if (playerHandle == null) return;

		MediaBridge.playerPlay(playerHandle);
		PlayerResourceManager.markPlayerPlaying(this);
	}

	@Override
	public void doStop() {
		if (playerHandle == null) return;

		MediaBridge.playerStop(playerHandle);
		PlayerResourceManager.markPlayerNotPlaying(this);
	}

	// doReset intentionally does nothing

	@Override
	public void doClose() {
		System.out.println("libmedia: closing player");
		// note the outer class has called stop before we get here
		if (playerHandle == null) return;
		MediaBridge.playerClose(playerHandle);
		playerHandle = null;
	}

	@Override
	public void doSetMediaTime(long now) {
		if (playerHandle == null) return;

		MediaBridge.playerSeek(playerHandle, (float)(now/1000));
	}

	@Override
	public long doGetMediaTime() {
		if (playerHandle == null) return 0L;

		return (long)(MediaBridge.playerGetPosition(playerHandle) * 1000);
	}

	@Override
	public long doGetDuration() {
		if (playerHandle == null) return Player.TIME_UNKNOWN;

		float durationSeconds = MediaBridge.playerGetDuration(playerHandle);
		if (durationSeconds < 0) {
			return Player.TIME_UNKNOWN;
		}

		return (long)(durationSeconds * 1000);
	}

	@Override
	public void doSetLooping(boolean looping) {
		/*
		 * this is only for infinite looping
		 * for finite loops, the BasePlayer needs the completion callback..
		 */
		if (playerHandle == null) return;

		MediaBridge.playerSetLooping(playerHandle, looping);
	}

	@Override
	public String doGetContentType() {
		return contentType;
	}

	@Override
	public void doSetVolume(float vol) {
        if (playerHandle != null) MediaBridge.playerSetVolume(playerHandle, vol);
	}

	@Override
	public void onStop() {
		if (state == STARTED) {
			complete();
			PlayerResourceManager.markPlayerNotPlaying(this);
		}
	}

	@Override
	public Object getPlayerHandle() {
		return playerHandle;
	}


	// VideoControl

	@Override
	public int getDisplayHeight() {
		return videoDisplayWidth;
	}

	@Override
	public int getDisplayWidth() {
		return videoDisplayHeight;
	}

	@Override
	public int getDisplayX() {
		return videoDisplayX;
	}

	@Override
	public int getDisplayY() {
		return videoDisplayY;
	}

	@Override
	public byte[] getSnapshot(String imageType) throws MediaException {
		if (imageType == null) {
			imageType = "image/jpeg";
		}

		byte[] ret = MediaBridge.playerGetSnapshot(playerHandle, imageType);
		if (ret == null) {
			throw new MediaException();
		}

		return ret;
	}

	@Override
	public int getSourceWidth() {
		return videoSourceWidth;
	}

	@Override
	public int getSourceHeight() {
		return videoSourceHeight;
	}

	@Override
	public Object initDisplayMode(int mode, Object arg) {
		if (arg != null && arg instanceof Canvas) {
			this.videoCanvas = (Canvas)arg;
		} else {
			this.videoCanvas = null;
		}
		setupVideo();
		return null;
	}

	@Override
	public void setDisplayFullScreen(boolean fullScreenMode) {
		videoDisplayFullscreen = fullScreenMode;
		// fullscreen mode could overwrite the bar? center absolutely on height?
		setupVideo();
	}

	@Override
	public void setDisplayLocation(int x, int y) {
		this.videoDisplayX = x;
		this.videoDisplayY = y;
		setupVideo();
	}

	@Override
	public void setDisplaySize(int width, int height) {
		videoDisplayWidth = width;
		videoDisplayHeight = height;
		setupVideo();
		postEvent(PlayerListener.SIZE_CHANGED, this);
	}

	@Override
	public void setVisible(boolean visible) {
		videoVisible = visible;
		setupVideo();
	}

	private void checkForVideo() {
		videoSourceWidth = videoDisplayWidth = MediaBridge.playerGetWidth(playerHandle);
		videoSourceHeight = videoDisplayHeight = MediaBridge.playerGetHeight(playerHandle);

		if (videoSourceWidth != 0 && videoSourceHeight != 0) {
			postEvent(PlayerListener.SIZE_CHANGED, this);
		}
	}

	private void setupVideo() {
		if (playerHandle == null) return;
		MediaBridge.playerSetupVideo(playerHandle, videoVisible && videoCanvas != null ? videoCanvas.gc.getContextRef() : null, this, videoDisplayX, videoDisplayY, videoDisplayWidth, videoDisplayHeight, videoDisplayFullscreen);
	}

	public void handleVideoFramePainted() {
		videoCanvas._flushBuffer();
	}
}
