import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"

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

export async function POST(request){
    const reqBody = await request.json();

    try{
        await connectDB();
        console.log("MongoDB接続成功")
        await ItemModel.create(reqBody);
//        return NextResponse.json({message: "アイテム作成成功"})
        return new Response(
            JSON.stringify({ message: "アイテム作成成功"}),
                {
                    status: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに限定
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        "Content-Type": "application/json",
                    },
                }
            )
    }catch{
//        return NextResponse.json({message: "アイテム作成失敗"})
        return new Response(
            JSON.stringify({ message: "アイテム作成失敗" }),
            {
                status: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Content-Type": "application/json",
                },
            }
        )
    }
}
