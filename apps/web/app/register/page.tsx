"use client"

import {  useState } from "react";
import { Input, Button } from "ui";
import Link from "next/link";

export default function Page(): JSX.Element {

    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [processing, setProcessing] = useState(false);
    const [registered, setRegistered] = useState(false);    
    const [error, setError] = useState("");

    const emailChange = (event)=>{
        setEmailValue(event.target.value)
        setError("")
    }

    const passChange = (event)=>{
        setPassValue(event.target.value)
        setError("")
    }

    const nameChange = (event)=>{
        setNameValue(event.target.value)
        setError("")
    }

    const handleSubmit = function(event) {
        event.preventDefault();

        if(nameValue.length < 2
            || emailValue.length < 2
            || passValue.length < 2) {
                setError("Incorrect input")
        } else {
            setProcessing(true)

        fetch("/api/register", {
            method:"POST",
            body:JSON.stringify({
                name: nameValue,
                password: passValue, 
                email: emailValue
            }),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>{

            setProcessing(false)

            if(res.status === 200) {
                
                setRegistered(true)
            } else {
                res.json().then(res=>{
                    setError(JSON.stringify(res))
                })
            }
            
        })   
        }

        
    }

    if (processing) {
        return <>Processing...</>;
    }

    if (registered) {
        return <>
        <div>Registered succesfull</div>
        <Button><Link href="/login">To login page</Link></Button>
        
        </>
    }

    return <>
    <form className="flex flex-col justify-center">
                <Input 
                    labelText="Name"
                    type="text"
                    id="password-input"
                    required={true}
                    value={nameValue}
                    onChange={nameChange}
                />
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
                <Button clearStyles={true} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-0" onClick={handleSubmit}>Register</Button>
        </form>
        {error!==""?<div className="p-4 text-red-500 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
            {error}
        </div> :null}
    </>
}