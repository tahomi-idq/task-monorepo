"use client";

export function Button({onClick, type, children, className="", clearStyles=false}:{onClick?:React.MouseEventHandler, type?:"button" | "submit" | "reset" | undefined, children?:any, className?:string, clearStyles?:boolean}): JSX.Element {
  return (
    <button
      className={
        (clearStyles?"":'py-2.5 m-1 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ') 
      + className}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
