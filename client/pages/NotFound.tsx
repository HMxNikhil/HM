import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="container py-24 text-center">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">404</h1>
      <p className="mt-4 text-muted-foreground">Oops! Page not found</p>
      <a href="/" className="mt-6 inline-block text-sm text-foreground underline underline-offset-4">
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;
