import { NextResponse } from "next/server"
import connectDB from "../../../../utils/database"
import { ItemModel } from "../../../../utils/schemaModels"

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

export async function GET(request, context){
    const params = await context.params
    try{
        await connectDB()
        const singleItem = await ItemModel.findById(params.id)
        //return NextResponse.json({message: "アイテム読み取り成功（シングル）", singleItem: singleItem})
        return new Response(
            JSON.stringify({ message: "アイテム読み取り成功（シングル）", singleItem: singleItem}),
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
        //return NextResponse.json({message: "アイテム読み取り失敗（シングル）"})
        return new Response(
            JSON.stringify({ message: "アイテム読み取り失敗（シングル）" }),
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