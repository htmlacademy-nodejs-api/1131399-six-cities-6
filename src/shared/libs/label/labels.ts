export type labelType = Record<string, Record<string, string>>;

export const labels: labelType = {
  common: {
    noTranslation: 'Нет перевода',
  },
  config: {
    errorReadingEnvFile: 'Error reading .env file',
    envFileSuccessfullyParsed: '.env file successfully parsed',
  },
  application: {
    init: 'Application initialization',
    startOnPort: 'The application starts on port:',
  }
};
