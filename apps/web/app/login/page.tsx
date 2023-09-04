"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Button } from "ui";

export default function Page(): JSX.Element {

    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [processing, setProcessing] = useState(false);

    const router = useRouter()

    const emailChange = (event)=>{
        setEmailValue(event.target.value)
    }

    const passChange = (event)=>{
        setPassValue(event.target.value)
    }

    const handleSubmit = async function(event) {
        event.preventDefault();
        setProcessing(true)
        let response = await fetch("/api/auth", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email: emailValue,
                password: passValue
            })
        });

        setProcessing(false)
        if(response.status === 200) {
            
            router.push("/")
        } else {
            console.log("error status: " + response.status);
            
        }
    }

    if (processing) {
        return <>Processing...</>;
    }

    return <>
    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <Input 
                    labelText="Email"
                    type="email"
                    id="password-input"
                    required={true}
                    value={emailValue}
                    onChange={emailChange} 
                />
                <Input 
                    labelText="Password"
                    type="text"
                    id="password-input"
                    required={true}
                    value={passValue}
                    onChange={passChange}
                />
                <Button onClick={handleSubmit}type={"submit"}>Login</Button>
        </form>
        <Button><Link href="../register">Register</Link></Button>
    </>
}