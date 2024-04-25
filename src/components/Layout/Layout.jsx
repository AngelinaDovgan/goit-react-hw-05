import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";

export default function Layout({ children }) {
    return (
        <div>
            <header>
 <Navigation />
<Suspense>
{children}
</Suspense>
</header>
</div>
)
}