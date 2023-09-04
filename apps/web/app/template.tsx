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
    <Button className="">
      <Link className="align-middle float-left" href={"/"}>Home</Link>
      </Button>
    
    <Button className="float-right" ><Link className="align-middle" href={"/login"}>Login</Link></Button>
    <Button 
    className="float-right" 
    onClick={handleLogout}>Log out</Button>
    <div className="clear-both"></div>
</Header>
    <div className="p-2">
     
      {children}
    </div>
  </>
    
  );
}