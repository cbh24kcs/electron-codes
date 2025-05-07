import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      test: {
        test1: () => Promise<string>
      },
      window: {
        minimize: () => void, // 窗口最小化
        maximize: () => void, // 窗口最大化
        close: () => void, // 窗口关闭
        isMaximized: () => boolean, // 窗口是否最大化
        isMinimized: () => boolean, // 窗口是否最小化
        isFullScreen: () => boolean, // 窗口是否全屏
        isVisible: () => boolean, // 窗口是否可见
        isVisible: () => boolean, // 窗口是否可见
      }
    }
  }
}
