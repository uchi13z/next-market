import { lazy, Suspense } from "react"

const Page = () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const Login = lazy(() => sleep(2000).then(() => import('./login')))

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Login />
        </Suspense>
    )
}

export default Page
