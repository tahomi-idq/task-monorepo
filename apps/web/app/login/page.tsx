"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Button } from "ui";

export default function Page(): JSX.Element {

    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter()

    const emailChange = (event)=>{
        setEmailValue(event.target.value)
        setError("")
    }

    const passChange = (event)=>{
        setPassValue(event.target.value)
        setError("")
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
            response.json().then(res=>{
                setError(JSON.stringify(res))
            })
        }
    }

    if (processing) {
        return <>Processing...</>;
    }

    return <>
    <form className="flex flex-col justify-center">
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
                <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                onClick={handleSubmit}
                clearStyles={true}
                >Login</Button>
        </form>
        {error!==""?<div className="p-4 text-red-500 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
            {error}
        </div> :null}
        <Button className="mx-0 block"><Link href="../register">Register</Link></Button>
    </>
}