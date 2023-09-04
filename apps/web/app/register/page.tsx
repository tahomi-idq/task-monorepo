"use client"

import {  useState } from "react";
import { Input, Button } from "ui";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../lib/api/graphService";
import Link from "next/link";

export default function Page(): JSX.Element {

    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [processing, setProcessing] = useState(false);
    const [registered, setRegistered] = useState(false);    

    const emailChange = (event)=>{
        setEmailValue(event.target.value)
    }

    const passChange = (event)=>{
        setPassValue(event.target.value)
    }

    const nameChange = (event)=>{
        setNameValue(event.target.value)
    }

    const handleSubmit = function(event) {
        event.preventDefault();
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
            }
            
        })   
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
    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
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
                <Button onClick={handleSubmit} type={"submit"}>Register</Button>

            {emailValue}
        </form>
    </>
}