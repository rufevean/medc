
import '../styles/homefooter.css';

export default function HomeFooter() {
    return (
        <div className="homefooter">
            <div className="con">
                A Device for remote medication dispensing and management for elderly patients, customizable prescriptions, support for caregivers.
            </div>
            <div className="footer">
                <div className="f1">
                    Features
                </div>
                <div className="f2">
                    About Us
                    <img className="homefooterimg" src="/static/arrow.png"/>
                </div>
            </div>
        </div>
    );
}

