import { SignJWT } from "jose";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

// OPTIONSメソッドでプリフライトリクエストを処理
export async function OPTIONS() {
    const response = new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに限定
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });

    return response;
}

export async function POST(request) {
    try {
        const reqBody = await request.json();

        // MongoDBに接続
        await connectDB();

        // ユーザーデータを検索
        const savedUserData = await UserModel.findOne({ email: reqBody.email });
        if (savedUserData) {
            // ユーザーデータが存在する場合の処理
            if (reqBody.password === savedUserData.password) {
                // パスワードが正しい場合の処理

                const secretKey = new TextEncoder().encode("next-market-app-book");

                const payload = {
                    email: reqBody.email,
                };

                // JWTトークンを生成
                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: "HS256" })
                    .setExpirationTime("1d")
                    .sign(secretKey);

                // 成功レスポンス
                return new Response(
                    JSON.stringify({ message: "ログイン成功", token: token }),
                    {
                        status: 200,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに限定
                            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                            "Access-Control-Allow-Headers": "Content-Type, Authorization",
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                // パスワードが間違っている場合の処理
                return new Response(
                    JSON.stringify({ message: "ログイン失敗：パスワードが間違っています" }),
                    {
                        status: 401,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                            "Access-Control-Allow-Headers": "Content-Type, Authorization",
                            "Content-Type": "application/json",
                        },
                    }
                );
            }
        } else {
            // ユーザーデータが存在しない場合の処理
            return new Response(
                JSON.stringify({ message: "ログイン失敗：ユーザー登録をしてください" }),
                {
                    status: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    } catch (error) {
        console.error("ログインエラー:", error);

        // エラー発生時のレスポンス
        return new Response(
            JSON.stringify({ message: "ログイン失敗" }),
            {
                status: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
