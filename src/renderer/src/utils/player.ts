// 定义音频缓冲源节点或空值的类型
type AudioBufferSourceNodeOrNull = AudioBufferSourceNode | null;
// 定义音频缓冲或空值的类型
type AudioBufferOrNull = AudioBuffer | null;

// 定义播放列表项的接口
interface PlaylistItem {
  file: File | null;
  offset: number;
  start: number | null;
  source: AudioBufferSourceNodeOrNull;
  buffer: AudioBufferOrNull;
}

// 定义处理函数的类型
type HandlerFunction = (...args: any[]) => void;

// 事件分发器类
class Dispatcher {
  private handlers: HandlerFunction[];

  constructor() {
    this.handlers = [];
  }

  // 监听事件的方法
  listen(handler: HandlerFunction): void {
    this.handlers.push(handler);
  }

  // 触发事件的方法
  emit(...args: any[]): void {
    this.handlers.forEach((handler) => {
      handler(...args);
    });
  }
}

// 播放器类
class Player {
  private audioContext: AudioContext;
  private playList: PlaylistItem[];
  private playIndex: number;
  private emptyNode: PlaylistItem;

  public onPlay: Dispatcher;
  public onPause: Dispatcher;
  public onChange: Dispatcher;
  public onReady: Dispatcher;

  constructor() {
    this.audioContext = new AudioContext();
    this.playList = [];
    this.playIndex = 0;

    // 初始化一个空的播放节点
    this.emptyNode = {
      file: null,
      offset: 0,
      start: null,
      source: null,
      buffer: null,
    };

    // 初始化各种事件分发器
    this.onPlay = new Dispatcher();
    this.onPause = new Dispatcher();
    this.onChange = new Dispatcher();
    this.onReady = new Dispatcher();
  }

  // 读取音频缓冲的异步方法
  async readAudioBuffer(file: File): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (evt: ProgressEvent<FileReader>) => {
        if (evt.target?.result) {
          this.audioContext.decodeAudioData(evt.target.result as ArrayBuffer).then(resolve, reject);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  // 添加音频文件到播放列表的异步方法
  async append(file: File): Promise<void> {
    const isEmpty = this.isEmpty;
    this.playList.push({
      file,
      offset: 0,
      start: null,
      source: null,
      buffer: await this.readAudioBuffer(file),
    });
    if (isEmpty) {
      this.onReady.emit(this);
    }
  }

  // 播放音频的方法
  play(): void {
    if (!this.playList.length || this.current.source) {
      return;
    }
    const source = this.audioContext.createBufferSource();
    source.buffer = this.current.buffer as AudioBuffer;
    source.onended = this.next.bind(this);
    source.connect(this.audioContext.destination);
    source.start(0, this.current.offset);
    this.current.source = source;
    this.current.start = this.audioContext.currentTime;

    this.onPlay.emit(this);
  }

  // 暂停播放的方法
  pause(): void {
    if (!this.playList.length || !this.current.source) {
      return;
    }
    this.current.source.stop(0);
    this.current.source.disconnect(0);
    this.current.source.onended = null;
    this.current.source = null;
    this.current.offset = this.position;
    this.current.start = null;

    this.onPause.emit(this);
  }

  // 停止播放的方法
  stop(): void {
    this.pause();
    this.current.offset = 0;
    this.current.start = null;
  }

  // 播放下一首的方法
  next(): void {
    this.stop();
    this.playIndex++;
    if (this.playIndex >= this.playList.length) {
      this.playIndex = 0;
    }
    this.play();
    this.onChange.emit(this);
  }

  // 播放上一首的方法
  prev(): void {
    this.stop();
    this.playIndex--;
    if (this.playIndex < 0) {
      this.playIndex = Math.max(this.playList.length - 1, 0);
    }
    this.play();
    this.onChange.emit(this);
  }

  // 判断播放列表是否为空的计算属性
  get isEmpty(): boolean {
    return this.current === this.emptyNode;
  }

  // 获取当前播放项的计算属性
  get current(): PlaylistItem {
    return this.playList[this.playIndex] || this.emptyNode;
  }

  // 获取和设置当前播放位置的计算属性
  get position(): number {
    if (!this.playList.length) {
      return 0;
    }
    return (
      this.current.offset +
      (this.current.start !== null ? this.audioContext.currentTime - this.current.start : 0)
    );
  }

  set position(val: number) {
    if (!this.playList.length) {
      return;
    }
    this.stop();
    this.current.offset = val;
    this.current.start = null;
    this.play();
  }

  // 获取当前音频的持续时间的计算属性
  get duration(): number {
    return this.current.buffer ? this.current.buffer.duration : 0.001;
  }
}

// 导出一个播放器实例
export const player = new Player();
