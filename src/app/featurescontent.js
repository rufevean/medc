
import '../styles/featurescontent.css';
import Image from 'next/image';

export default function FeaturesContent() {
    return (
        <div>
            <div className="c1">
                <div className="c1a">Medication Setup</div>
                <div className="c1b">The MediControl Hub is installed at the patient&apos;s home, with caregivers placing medication containers into designated slots for accurate dispensing according to the patient&apos;s schedule.</div>
            </div>
            <div className="c2">
                <div className="c2a">Prescription Input</div>
                <div className="c2b">Doctors or healthcare providers log into the system portal to input the patient&apos;s medication details, including names, dosages, and schedules, ensuring accurate and personalized medication management.</div>
            </div>
            <div className="c3">
                <div className="c3a">Real-Time Monitoring</div>
                <div className="c3b">Caregivers monitor medication levels in real-time through the system portal, ensuring patients receive timely medication. Automated alerts notify caregivers of low medication levels for prompt action.</div>
            </div>
            <div className="bg">
                <Image src="/static/f11.png" alt="Background Image" width={500} height={500} />
            </div>
            <div className="left">
                <Image src="/static/left.png" alt="Left Image" width={500} height={500} />
            </div>
            <div className="right">
                <Image src="/static/right.png" alt="Right Image" width={500} height={500} />
            </div>
        </div>
    )
}
