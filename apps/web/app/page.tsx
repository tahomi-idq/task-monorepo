"use client"
import { useEffect, useState } from "react";

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
    return <><div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div></>
  }

  return (
    <>
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        Hi, <span className="text-blue-600 dark:text-blue-500">{name}</span>
      </h2>
      <p>Your mail: <span className="italic">{email}</span></p>
    </>
  );
}
