import { Message, MessageToSend } from "../types/tic-tac-toe.socket-model";

class WebSocketService {
  static instance: WebSocketService | null = null;

  private socket: WebSocket | null;
  public isConnected: boolean = false;

  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(url: string) {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        this.isConnected = true;
        resolve(this.socket);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.isConnected = false;
        reject(error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket closed");
        this.isConnected = false;
        this.socket = null;
      };
    });
  }

  public onCloseConnection(callback: () => void) {
    if (!this.socket) {
      console.log("No socket instance found");
      return;
    }
    this.socket.onclose = () => callback;
  }

  public sendMessage(message: MessageToSend) {
    if (!this.socket) {
      console.log("No socket instance found");
      return;
    }
    this.socket.send(JSON.stringify(message));
  }

  public onReceiveMessage(callback: (msg: Message) => void) {
    if (!this.socket) {
      console.log("No socket instance found");
      return;
    }
    this.socket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      callback(data);
    };
  }

  public closeConnection() {
    if (!this.socket) {
      console.log("No socket instance found");
      return;
    }
    this.socket.close();
  }
}

export default WebSocketService;
