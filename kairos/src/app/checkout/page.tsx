'use client'


import { redirect } from "next/navigation";
import CheckoutView from "./CheckoutView";
// import Cookies from 'js-cookie';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
// import { emptyCart } from "@/lib/cart";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default function CheckoutPage() {
    const session = useSession()
    // const cartToEmpty = Cookies.get("localCartId")

    const [checkedout, setCheckedout] = useState(false)

    useEffect(() => {
        if (checkedout) {
            setCheckedout(false)
            redirect("/")
        }
    }, [checkedout])

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-8">Payment info of : {session.data?.user.name}</h1>

            <CheckoutView checkedout={checkedout} setCheckedout={setCheckedout}/>
        </div>
    )
}