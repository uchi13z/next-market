import mongoose from "mongoose";
import dotenv from "dotenv"; // dotenvをインポート

// dotenvを初期化して環境変数を読み込む
dotenv.config({ path: ".env.mongo" });

// MongoDB接続関数
const connectDB = async () => {
    try {
        // 環境変数からMongoDBのURIを取得
        const mongoURI = process.env.MONGODB_URI;

        // MongoDBに接続
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true, // 新しいURLパーサを使用
            useUnifiedTopology: true, // 新しいトポロジーエンジンを使用
        });

        console.log("Success: Connected to MongoDB"); // 成功ログ
    } catch (error) {
        console.error("Failure: Unconnected to MongoDB"); // エラーログ
        console.error(error.message);
        throw new Error(error.message); // エラーをスロー
    }
};

// この関数を他のファイルで使用可能にする
export default connectDB;
