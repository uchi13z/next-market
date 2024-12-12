import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <div>
                <Link href="/next-market">
                    <Image src="/next-market/header.svg" width={1330} height={148} alt="header-image" priority/>
                </Link>
            </div>
            <p>Next.js/Reactで作成されています。ソースをGitHubに公開しているので、登録の際は架空のメールアドレス、パスワードにして下さい。</p>
            <nav>
                <ul>
                    <li><Link href="/next-market/user/register">登録</Link></li>
                    <li><Link href="/next-market/user/login">ログイン</Link></li>
                    <li><Link href="/next-market/item/create">アイテム作成</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
