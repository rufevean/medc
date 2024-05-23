import '../../styles/signednav.css';
export default function SignedNav() {
    return (
        <div>
            <div className="signednav">
                <div className="empty"> </div>
                <div className="sn-heading"> MediControl </div>
                <button className="sn-button"> Sign Out </button>
            </div>
            <hr className="sn-hr" />
        </div>
    )
}
