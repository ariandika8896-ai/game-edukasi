/**
 * Web Audio API Sound Synthesizer for Petualangan Bangun Datar
 * Produces crisp, friendly game audio effects with zero external file dependencies.
 */

class SoundEngine {
  private audioCtx: AudioContext | null = null
  private muted: boolean = false

  private init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.audioCtx = new AudioContextClass()
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume()
    }
  }

  public toggleMute(): boolean {
    this.muted = !this.muted
    return !this.muted
  }

  public isMuted(): boolean {
    return this.muted
  }

  public playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.15) {
    if (this.muted) return
    try {
      this.init()
      if (!this.audioCtx) return

      const osc = this.audioCtx.createOscillator()
      const gain = this.audioCtx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime)
      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration)
      osc.connect(gain)
      gain.connect(this.audioCtx.destination)
      osc.start()
      osc.stop(this.audioCtx.currentTime + duration)
    } catch (e) {
      console.warn('Audio play error:', e)
    }
  }

  public playClick() {
    this.playTone(600, 0.08, 'triangle', 0.12)
  }

  public playCoin() {
    if (this.muted) return
    this.init()
    ;[987.77, 1318.51].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.15, 'sine', 0.16), idx * 80)
    })
  }

  public playDiamond() {
    if (this.muted) return
    this.init()
    ;[1046.5, 1318.51, 1567.98].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.18, 'triangle', 0.15), idx * 60)
    })
  }

  public playSuccess() {
    if (this.muted) return
    this.init()
    ;[523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.2, 'triangle', 0.18), idx * 70)
    })
  }

  public playFanfare() {
    if (this.muted) return
    this.init()
    const notes = [
      { f: 523.25, d: 0.12, delay: 0 },
      { f: 659.25, d: 0.12, delay: 100 },
      { f: 783.99, d: 0.16, delay: 200 },
      { f: 1046.5, d: 0.45, delay: 350 },
    ]
    notes.forEach((n) => {
      setTimeout(() => this.playTone(n.f, n.d, 'square', 0.16), n.delay)
    })
  }

  public playChirp() {
    if (this.muted) return
    this.init()
    const notes = [800, 1150, 980]
    notes.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 0.06, 'sine', 0.15), idx * 50)
    })
  }

  public playBoing() {
    if (this.muted) return
    this.init()
    try {
      if (!this.audioCtx) return
      const osc = this.audioCtx.createOscillator()
      const gain = this.audioCtx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(360, this.audioCtx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(140, this.audioCtx.currentTime + 0.25)
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime)
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.25)
      osc.connect(gain)
      gain.connect(this.audioCtx.destination)
      osc.start()
      osc.stop(this.audioCtx.currentTime + 0.25)
    } catch (e) {
      console.warn('Boing audio error:', e)
    }
  }
}

export const sounds = new SoundEngine()
