export type labelType = Record<string, Record<string, string>>;

export const labels: labelType = {
  common: {
    noTranslation: 'No translation',
  },
  config: {
    errorReadingEnvFile: 'Error reading .env file',
    envFileSuccessfullyParsed: '.env file successfully parsed',
  },
  application: {
    init: 'Application initialization',
    startOnPort: 'The application starts on port:',
  },
  db: {
    connectionIsStarting: 'Trying to connect to the Database...',
    alreadyConnected: 'Database is already connected',
    connectionEstablished: 'Connection to the database is established',
    isAlreadyDisconnected: 'Database is already disconnected',
    isDisconnected: 'Database is disconnected',
    errorConnectingToDb: 'Error connecting to the DB',
    errorDisconnectingFromDb: 'Error disconnecting from the DB',
    initDatabase: 'Init Database...',
    databaseIsInitiated: 'Database connection is started',
    databaseInitiatedError: 'Database connection error',
    tryNumber: 'database connection try #',
    createOfferError: 'Offer creating error',
  },
  validation: {
    emailIncorrect: 'Email is incorrect',
    passwordMinLengthError: 'incorrect password minimum length',
    passwordMaxLengthError: 'incorrect password maximum length',
  },
  user: {
    created: 'New user created:',
  },
  offer: {
    created: 'New offer created:',
  },
  comment: {
    created: 'New comment created:',
  }
};
