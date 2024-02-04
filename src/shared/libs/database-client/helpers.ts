type getDbconnectionPathArgsType = {
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string
};
export const getDbconnectionPath = ({
  username,
  password,
  host,
  port,
  databaseName
}: getDbconnectionPathArgsType): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
