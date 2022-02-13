import "./login-page.css"
import logo from './logo.svg';

const LoginPage = () => {
    return (
        <div class="login-wrapper">
            <div class="login-background-wrapper">
                <div class="background-overlay"></div>
            </div>
            <img class="logo" src={logo} alt="logo"></img>
            <div class="sign-in-wrapper">
                <h1 class="sign-in-text">Sign in</h1>
                <form>
                    <ul class="no-bullets">
                        <li>
                            <input class="username-input" placeholder="Username or Email"></input>
                        </li>
                        <li>
                            <input class="password-input" placeholder="Password" type="password"></input>
                        </li>
                        <li>
                            <button class="sign-in-button">Sign in</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;