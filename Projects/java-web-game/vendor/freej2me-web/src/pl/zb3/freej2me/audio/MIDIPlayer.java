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

import javax.microedition.media.control.MIDIControl;
import javax.microedition.media.control.TempoControl;

import pl.zb3.freej2me.bridge.media.MidiBridge;
import pl.zb3.freej2me.bridge.media.PlayerEventHandler;
import pl.zb3.freej2me.bridge.media.StopListener;

import java.io.IOException;
import java.io.InputStream;

import javax.microedition.media.BasePlayer;

public class MIDIPlayer extends BasePlayer implements StopListener, MIDIControl// ,TempoControl
{
	protected boolean loaded = false;
	private int duration = 0;
	private Object playerHandle = null;

	public MIDIPlayer()
	{
		playerHandle = MidiBridge.getMidiPlayer();
		MidiBridge.midiSetVolume(playerHandle, 1.0);
		PlayerEventHandler.registerStopListener(playerHandle, this);

		addControl(MIDIControl.class.getName(), this);
		//addControl(TempoControl.class.getName(), this);
		//System.out.println("media type: "+type);
	}

	public void setSequence(InputStream stream) {
		try {
			duration = MidiBridge.midiSetSequence(playerHandle, readBytesAndClose(stream));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// doRealize does nothing, the work is done on prefetch

	@Override
	public void doStart() {
		if (!loaded) return;
		MidiBridge.midiPlay(playerHandle);
	}

	@Override
	public void doStop() {
		if (!loaded) return;
		MidiBridge.midiStop(playerHandle);
	}

	// doReset intentionally does nothing

	@Override
	public void doClose() {
		// does nothing, the sequencer is shared, registry holds no strong refs
		loaded = false;
	}

	@Override
	public void doSetMediaTime(long now) {
		MidiBridge.midiSeek(playerHandle, (int)now);
	}

	@Override
	public long doGetMediaTime() {
		return MidiBridge.midiGetPosition(playerHandle);

	}

	@Override
	public long doGetDuration() {
		return duration;
	}

	@Override
	public void doSetLooping(boolean looping) {
		/*
		 * this is only for infinite looping
		 * for finite loops, the BasePlayer needs the completion callback..
		 */
		MidiBridge.midiLoop(playerHandle, looping ? -1 : 0);
	}

	@Override
	public void doSetVolume(float vol) {
		MidiBridge.midiSetVolume(playerHandle, vol);
	}

	@Override
	public void onStop() {
		if (state == STARTED) {
			complete();
		}
	}

	// MIDIControl
	@Override
	public int[] getBankList(boolean custom) {
		return new int[0];
	}

	@Override
	public int getChannelVolume(int channel) {
		return -1;
	}

	@Override
	public String getKeyName(int bank, int prog, int key) {
		return null;
	}

	@Override
	public int[] getProgram(int channel) {
		return new int[0];
	}

	@Override
	public int[] getProgramList(int bank) {
		return new int[0];
	}

	@Override
	public String getProgramName(int bank, int prog) {
		return "";
	}

	@Override
	public boolean isBankQuerySupported() {
		return false;
	}

	@Override
	public int longMidiEvent(byte[] data, int offset, int length) {
		// not supported
		return data.length;
	}

	@Override
	public void setChannelVolume(int channel, int volume) {
	}

	@Override
	public void setProgram(int channel, int bank, int program) {
		shortMidiEvent(192 | channel, bank, program); // program, bank ??
	}

	@Override
	public void shortMidiEvent(int type, int data1, int data2) {
		MidiBridge.midiShortEvent(playerHandle, type, data1, data2);
	}

	/*
	// TempoControl
	@Override
	public int getTempo() {
		if (midi == null) return 0;
		return (int)midi.getTempoInBPM() * 1000;
	}

	public int setTempo(int millitempo) {
		midi.setTempoInBPM(millitempo / 1000);
		return millitempo;
	}
	*/

	public int getMaxRate() { return 100000; }

	public int getMinRate() { return 100000; }

	public int getRate() { return 100000; }

	public int setRate(int millirate) { return 100000; }
}
