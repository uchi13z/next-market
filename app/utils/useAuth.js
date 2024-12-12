import { useState, useEffect } from "react" 
import { useRouter, usePathname } from "next/navigation"
import { jwtVerify } from "jose"

const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("")

    const router = useRouter() 
    const pathname = usePathname() 

    useEffect(() => {   
        const checkToken = async() => { 
            const token = localStorage.getItem("token")

            if(!token){
                if (pathname.includes("/create")) {
                    router.push("../../user/login")
                } else {
                    router.push("../../user/login")
                }
            }

            try{
                const secretKey = new TextEncoder().encode("next-market-app-book") 
                const decodedJwt = await jwtVerify(token, secretKey) 
                setLoginUserEmail(decodedJwt.payload.email)  
            }catch{
                if (pathname.includes("/create")) {
                    router.push("../user/login")
                } else {
                    router.push("../../user/login")
                }
            }
        }
        checkToken() 
    }, [router]) 

    return loginUserEmail 
}

export default useAuth