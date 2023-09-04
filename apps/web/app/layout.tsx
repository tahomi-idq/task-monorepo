import './globals.css'
import "ui/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <title>Task</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}