"use client"
import Link from "next/link";
import { Button, Header } from "ui";

export default function Template({children}): JSX.Element {

    const handleLogout = function() {
        fetch("/api/auth", {
            method: "DELETE"
        }).then(res=>{
            location.reload();
        })
    }

  return (<>
  <Header>
    
    <Link className="align-middle float-left" href={"/"}>
      <Button className="">Home</Button>
    </Link>
    
    
    <Link className="align-middle float-right" href={"/login"}>
      <Button>Login</Button>
    </Link>

    <Button 
    className="float-right" 
    onClick={handleLogout}>Log out</Button>
    <div className="clear-both"></div>
</Header>
    <div className="block max-w-sm p-7 m-auto mt-4 bg-white border border-gray-200 rounded-lg shadow">
      {children}
    </div>
  </>
    
  );
}