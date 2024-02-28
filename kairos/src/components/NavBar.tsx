import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/KAIROS.png"
import { searchProducts } from "@/lib/product";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NavBar() {

    const session = await getServerSession(authOptions)
    const cart = await getCart()

    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost">
                        <Image src={logo} alt="Kairos" height={40} width={40}/>
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input 
                                name="searchQuery"
                                type="text"
                                placeholder="Search"
                                className="input input-bordered rounded-3xl w-full min-w-[100px]"
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />
                </div>
            </div>
        </div>
    )
}