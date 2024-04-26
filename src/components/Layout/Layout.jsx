import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";

export default function Layout({ children }) {
    return (
        <div>
            <header>
                <Navigation />
            </header>    
<Suspense>
{children}
</Suspense>
</div>
)
}