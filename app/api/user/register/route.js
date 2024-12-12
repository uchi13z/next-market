import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

export async function OPTIONS() {
    // 204ステータスの空のレスポンスを作成
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
        await connectDB();
        await UserModel.create(reqBody);

        // POSTリクエスト成功時のレスポンスにCORSヘッダーを追加
        return new Response(
            JSON.stringify({ message: "ユーザー登録成功" }),
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
    } catch (error) {
        console.error("エラー:", error);

        // POSTリクエスト失敗時のレスポンスにCORSヘッダーを追加
        return new Response(
            JSON.stringify({ message: "ユーザー登録失敗" }),
            {
                status: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに限定
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
