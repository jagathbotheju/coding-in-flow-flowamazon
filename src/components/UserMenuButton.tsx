"use client";
import { Session } from "next-auth";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { AiOutlineCaretDown } from "react-icons/ai";

interface Props {
  session: Session | null;
}

const UserMenuButton = ({ session }: Props) => {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <Image
            src={user?.image || "/images/profile-no-image.png"}
            alt="profile"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <AiOutlineCaretDown size={20} />
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-55 bg-base-100 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenuButton;
