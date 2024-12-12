import Link from "next/link"
import Image from "next/image"

const getAllItems = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {cache: "no-store"})
    console.log(response)
    const jsonData = await response.json()
    const allItems = jsonData.allItems
    return allItems
}

const ReadAllItems = async(context) => {
    const params = await context.params
    const allItems = await getAllItems()
    return (
        <div className="grid-container-in">
            {allItems.map(item => 
                <Link href={`/next-market/item/readsingle/${item._id}`} key={item._id}>
                    <Image src={item.image} width={550} height={350} alt="item-image" priority/>
                    <div> 
                        <h2>¥{item.price}</h2>
                        <h3>{item.title}</h3>
                        <p>{item.description.substring(0, 80)}...</p>  
                    </div>
                </Link>
            )}
        </div>
    )
} 

export default ReadAllItems
