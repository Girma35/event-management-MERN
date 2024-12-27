const mongoose =require("mongoose");

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.log("Error happened while connecting to MongoDB:", error);
    }
};

module.exports= {connectMongoDb };
