import '../styles/navbar.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="style">
            <div> Sign In </div>
            <Link href='/signup'><button className="button"> Sign Up </button> </Link>
        </div>
    )
}
