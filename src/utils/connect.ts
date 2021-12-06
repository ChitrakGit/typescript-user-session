import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';

const dbUri = config.get<string>('dbUrl');

const DbConnection = async()=> {
  return mongoose.connect(dbUri , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions).then(() => {
      console.log('Connected to MongoDB');
  }).catch(err => { 
        console.log("Failed to connect mongodb, ERROR: ")
        console.log(err);
        return "connection done "+ err
  });
}
   
const getGreeting = () => {
    return 'Hello';
}
module.exports.DbConnection = DbConnection;
// export default DbConnection;