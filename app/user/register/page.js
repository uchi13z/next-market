import { lazy, Suspense } from "react"

const Page = () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const Register = lazy(() => sleep(2000).then(() => import('./register')))

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Register />
        </Suspense>
    )
}

export default Page
