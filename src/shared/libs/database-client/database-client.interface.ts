export interface IDatabaseClient {
  connect(connectString: string): Promise<void>;
  disconnect(): Promise<void>;
  isConnectedToDB(): boolean;
}
