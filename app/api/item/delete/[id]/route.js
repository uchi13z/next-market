import { NextResponse } from "next/server"
import connectDB from "../../../../utils/database"
import { ItemModel } from "../../../../utils/schemaModels"

// OPTIONSメソッドでプリフライトリクエストを処理
export async function OPTIONS() {
    const response = new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに限定
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });

    return response;
}

export async function DELETE(request, context){
    const reqBody = await request.json()
    const params = await context.params
    try{
        await connectDB()
        console.log("MongoDB接続成功")
        const singleItem = await ItemModel.findById(params.id)
        if(singleItem.email === reqBody.email){
            await ItemModel.deleteOne({_id: params.id})
//            return NextResponse.json({message: "アイテム削除成功"})
                return new Response(
                    JSON.stringify({ message: "アイテム削除成功"}),
                        {
                            status: 200,
                            headers: {
                                "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに限定
                                "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
                                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                                "Content-Type": "application/json",
                        },
                    }
                )
        }else{
//            return NextResponse.json({message: "他の人が作成したアイテムです"})
            return new Response(
                JSON.stringify({ message: "他の人が作成したアイテムです"}),
                    {
                        status: 200,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに限定
                            "Access-Control-Allow-Methods": "GET, POST ,DELETE, OPTIONS",
                            "Access-Control-Allow-Headers": "Content-Type, Authorization",
                            "Content-Type": "application/json",
                    },
                }
            )
        }
    }catch{
//        return NextResponse.json({message: "アイテム削除失敗"})
        return new Response(
            JSON.stringify({ message: "アイテム削除失敗"}),
                {
                    status: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに限定
                        "Access-Control-Allow-Methods": "GET, POST ,DELETE ,OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        "Content-Type": "application/json",
                },
            }
        )
    }
}
