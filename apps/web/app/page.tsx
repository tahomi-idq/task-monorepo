"use client"
import { useEffect, useState } from "react";
import { Button, Header } from "ui";

export default function Page(): JSX.Element {

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);

  useEffect(()=>{
    fetch("/api/email", {
      method:"GET"
    }).then((res)=>[
      res.json().then(data=>{        
        setEmail(data.email)
        setName(data.name)
      })
    ])
  }, [])

  if(email === null) {
    return <>Fetching...</>
  }

  return (
    <>
      <p>Hi, {name}</p>
      <div>{email}</div>
    </>
  );
}
