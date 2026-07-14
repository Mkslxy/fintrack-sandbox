import { AuthPanel } from "./components/AuthPanel";
import { LandingInfo } from "./components/LandingInfo";
import styles from "./LandingPage.module.css";

export function LandingPage() {
    return (
        <main className={styles.landing}>
            <LandingInfo />
            <AuthPanel />
        </main>
    );
}