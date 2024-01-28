import path from 'node:path';

export const getLogPath = (fileName: string): string => path.resolve(process.cwd(), fileName);
