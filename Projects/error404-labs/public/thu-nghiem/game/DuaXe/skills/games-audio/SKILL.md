---
name: games-audio
description: Audio game — Web Audio API pool, spatial 3D, dynamic compression, format fallback. Không memory leak, tự động GC.
---

# games-audio — Audio System

## Audio Pool (tái sử dụng, không memory leak)

```typescript
class AudioPool {
  private pool: AudioBufferSourceNode[] = [];
  private ctx: AudioContext;
  private buffers = new Map<string, AudioBuffer>();
  private activeSources = new Set<AudioBufferSourceNode>();

  constructor() {
    this.ctx = new AudioContext();
  }

  async load(key: string, url: string): Promise<void> {
    const res = await fetch(url);
    const arrayBuf = await res.arrayBuffer();
    const audioBuf = await this.ctx.decodeAudioData(arrayBuf);
    this.buffers.set(key, audioBuf);
  }

  play(key: string, options: { loop?: boolean; volume?: number; rate?: number } = {}): AudioBufferSourceNode {
    const buffer = this.buffers.get(key);
    if (!buffer) throw new Error(`Audio not loaded: ${key}`);

    const source = this.pool.pop() || this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = options.loop ?? false;
    source.playbackRate.value = options.rate ?? 1;

    const gain = this.ctx.createGain();
    gain.gain.value = options.volume ?? 1;

    source.connect(gain).connect(this.ctx.destination);
    source.start(0);
    source.onended = () => this.release(source);

    this.activeSources.add(source);

    // Auto-release nếu onended không fire
    setTimeout(() => {
      if (this.activeSources.has(source)) {
        this.release(source);
      }
    }, (buffer.duration * 1000) + 100);

    return source;
  }

  private release(source: AudioBufferSourceNode) {
    try { source.stop(); } catch {}
    source.disconnect();
    source.buffer = null;
    source.onended = null;
    this.activeSources.delete(source);
    this.pool.push(source);
  }

  stopAll() {
    for (const source of this.activeSources) {
      this.release(source);
    }
  }

  resume() {
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  get masterVolume(): number {
    return this.ctx.destination.channelInterpretation === "speakers" ? 1 : 0.5;
  }
}
```

## Spatial Audio 3D

```typescript
class SpatialAudio {
  private ctx: AudioContext;
  private panners = new Map<string, PannerNode>();
  private listener: AudioListener;

  constructor() {
    this.ctx = new AudioContext();
    this.listener = this.ctx.listener;
  }

  updateListener(x: number, y: number, z: number, forwardX: number, forwardY: number, forwardZ: number) {
    this.listener.positionX.value = x;
    this.listener.positionY.value = y;
    this.listener.positionZ.value = z;
    this.listener.forwardX.value = forwardX;
    this.listener.forwardY.value = forwardY;
    this.listener.forwardZ.value = forwardZ;
  }

  createSource(key: string, buffer: AudioBuffer, pos: { x: number; y: number; z: number }) {
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const panner = this.ctx.createPanner();
    panner.panningModel = "HRTF";
    panner.distanceModel = "inverse";
    panner.refDistance = 10;
    panner.maxDistance = 100;
    panner.rolloffFactor = 1;
    panner.positionX.value = pos.x;
    panner.positionY.value = pos.y;
    panner.positionZ.value = pos.z;

    source.connect(panner).connect(this.ctx.destination);
    source.start(0);

    this.panners.set(key, panner);
    return source;
  }

  updateSourcePosition(key: string, x: number, y: number, z: number) {
    const panner = this.panners.get(key);
    if (panner) {
      panner.positionX.value = x;
      panner.positionY.value = y;
      panner.positionZ.value = z;
    }
  }
}
```

## Dynamic Compression (tránh distortion)

```typescript
class AudioCompressor {
  private compressor: DynamicsCompressorNode;

  constructor(ctx: AudioContext) {
    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 30;
    this.compressor.ratio.value = 12;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;
    this.compressor.connect(ctx.destination);
  }

  get node(): DynamicsCompressorNode {
    return this.compressor;
  }
}
```

## Format Fallback

```typescript
const AUDIO_FORMATS = [
  { ext: "mp3", mime: "audio/mpeg" },
  { ext: "ogg", mime: "audio/ogg" },
  { ext: "wav", mime: "audio/wav" },
  { ext: "aac", mime: "audio/aac" },
];

function getSupportedFormat(): { ext: string; mime: string } | null {
  const audio = document.createElement("audio");
  for (const fmt of AUDIO_FORMATS) {
    if (audio.canPlayType(fmt.mime) !== "") return fmt;
  }
  return null;
}

function audioUrl(basePath: string): string {
  const fmt = getSupportedFormat();
  return fmt ? `${basePath}.${fmt.ext}` : `${basePath}.mp3`;
}
```
