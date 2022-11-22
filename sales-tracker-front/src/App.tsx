import { LoginPage } from "./presentation/login/login-page";
import {token} from "./api/auth/login";

import styles from "./app.module.css";

export default function App() {
  console.log(token);
  return (
    <div className={styles.page}>
      <LoginPage />
    </div>
  )
}