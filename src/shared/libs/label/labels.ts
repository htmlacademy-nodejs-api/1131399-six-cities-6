export type labelType = Record<string, unknown>;

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
    startOnPort: 'The application is about to start on port:',
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
    databaseIsInitiated: 'Database connection is established',
    databaseInitiatedError: 'Database connection error',
    tryNumber: 'database connection try #',
    createOfferError: 'Offer creating error',
  },
  server: {
    serverIsInitiated: 'Server is started on port %PORT%',
    serverInitiatedError: 'Error starting server',
  },
  router: {
    routeRegistered: 'Route registered',
    offerControllerRegisterRoutes: 'Register routes for Offer Controller...',
    commentsControllerRegisterRoutes: 'Register routes for Comments Controller...',
    usersControllerRegisterRoutes: 'Register routes for Users Controller...',
    initializedControllers: 'Controllers initialized'
  },
  validation: {
    emailIncorrect: 'Email is incorrect',
    passwordMinLengthError: 'incorrect password minimum length',
    passwordMaxLengthError: 'incorrect password maximum length',
  },
  user: {
    created: 'New user created:',
    errorCreatingUser: 'Error creating user',
  },
  offer: {
    created: 'New offer created:',
  },
  comment: {
    created: 'New comment created:',
  },
  error: {
    offer: {
      createOffer: 'Error creating offer',
      deleteOffer: 'Error deleting offer',
      updateOffer: 'Error updating offer',
      patchOffer: 'Error patching offer',
      getOffer: 'No offer with such id',
      getAllOffers: 'Error getting all offers',
      getCommentsOnOffer: 'Error getting comments on offer',
      createCommentOnOffer: 'Error creating comments on offer',
    },
    user: {
      createUser: 'Error creating user',
      updateUser: 'Error updating user',
      getUser: 'No user',
    }
  }
};
