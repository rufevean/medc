
import '../styles/homefooter.css';
import Image from 'next/image';

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
                    <Image className="homefooterimg" src="/static/arrow.png" alt="Arrow" width={20} height={20} />
                </div>
            </div>
        </div>
    );
}
