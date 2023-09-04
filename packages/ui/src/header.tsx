export function Header({ children }: { children?: JSX.Element }): JSX.Element {
  return <nav className="bg-gray-800 ui-text-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    {children}
    </nav>;
}
