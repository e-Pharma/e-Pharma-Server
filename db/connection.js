const mongoose = require('mongoose');

const URI = "mongodb+srv://sankhaJ:sankha@appledore-nbptw.mongodb.net/e-Pharma?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to the cluster");
};

// const connectDB = async () => {
//     await mongoose
//         .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//         .catch(err => response(res, null, 500, err));

// }

module.exports = connectDB;
