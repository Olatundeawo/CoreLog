import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  activateLicense: (code) => ipcRenderer.invoke("activate-license", code),
  isActivated: () => ipcRenderer.invoke("check-activation")
});
