// In this file you can configure migrate-mongo
import config from 'config';

const creatDBUrl = (config: Object) => {
  if (!config.username && config.password) {
    throw new Error('Please provide database username');
  } else if (config.username) {
    return config.url.replace('mongodb://', `mongodb://${config.username}:${config.password}@`);
  } else {
    return config.url;
  }
};

export default {
  mongodb: {
    url: creatDBUrl(config.db),

    databaseName: config.db.name,

    options: {
      useNewUrlParser: true // removes a deprecation warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog"
};