import { ipcMain } from 'electron'

export function registerTestIpcHandlers(): void {
    ipcMain.handle('test', async (event, arg) => {
        console.log('ipcMain: test')
        return "ipcMain: test"
    })
}

