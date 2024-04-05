'use client'

import { Session } from "next-auth";
import Image from "next/image";
import { MdArrowDropDownCircle } from "react-icons/md";
import logo from "@/assets/pepewatch.png"
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuButtonProps {
    session: Session | null,
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
    
    const user = session?.user;

    const dropdownButtonStyle = {
        "width": "40px",
        "height": "40px",
    }
    
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                {user ? (
                <Image 
                src={user?.image || logo} // add a profile pic placeholder
                alt="User profile picture"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
                />
                ) : (
                <MdArrowDropDownCircle style={dropdownButtonStyle} />
                )}
            </label>
                <ul tabIndex={0} className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow">
                    <li>
                        {user ? (
                            <button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button>
                        ) : (<>
                            <Link href={"/login"}>Log In</Link>
                            <Link href={"/signup"}>Sign Up</Link>
                            </>
                        )}
                    </li>
                </ul>
        </div>
    )

}