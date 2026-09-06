import Providers from "@/providers/Providers";
import "./globals.css";

const themeScript = `
(() => {
  try {
    const saved = localStorage.getItem("resellhub-theme");
    const theme = saved === "dark" || saved === "light"
      ? saved
      : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();
`;

export const metadata = {
  title: "ReSell Hub",
  description: "A modern second-hand marketplace platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
