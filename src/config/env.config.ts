export const envConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'development',
  mongodb: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
});
