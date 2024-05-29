
"use client"

// Import CSS and React
import '../styles/faqcontent.css';
import React, { useState } from 'react';
import Image from 'next/image';

// Define the component as a Client Component
function FAQContent() {
    // Use useState within the component
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    // Return JSX for the component
    return (
        <div className='faq-content'>
            <div className='question'>
                1. Do I need Wi-Fi for the MediControl Hub to work?
                <button onClick={() => setShow1(!show1)}>
                    <Image src='/static/down.png' alt='Toggle' width={20} height={20} />
                </button>
            </div>
            {show1 && (
                <div className='answer'>
                    Yes, Wi-Fi connectivity is required for the MediControl Hub to enable features such as real-time monitoring, remote alerts, and medication schedule adjustments by doctors. Additionally, LAN connectivity will be available in future updates.
                </div>
            )}
            <div className='question'>
                2. Can I adjust the medication schedule if needed?
                <button onClick={() => setShow2(!show2)}>
                    <Image src='/static/down.png' alt='Toggle' width={20} height={20} />
                </button>
            </div>
            {show2 && (
                <div className='answer'>
                    Yes, doctors can remotely adjust the medication schedule and dosages through the system portal based on individual patient needs or changes in treatment plans.
                </div>
            )}
            <div className='question'>
                3. Is the system easy to use for elderly patients?
                <button onClick={() => setShow3(!show3)}>
                    <Image src='/static/down.png' alt='Toggle' width={20} height={20} />
                </button>
            </div>
            {show3 && (
                <div className='answer'>
                    Yes, the system is designed with user-friendly features tailored for elderly patients. It includes sound alerts and a clear display to provide easy-to-follow instructions for medication reminders and dispensing.
                </div>
            )}
            <div className='question'>
                4. Is the MediControl Hub compatible with all types of medications?
                <button onClick={() => setShow4(!show4)}>
                    <Image src='/static/down.png' alt='Toggle' width={20} height={20} />
                </button>
            </div>
            {show4 && (
                <div className='answer'>
                    No, the MediControl Hub is currently optimized for dispensing pills and capsules. However, we will consider expanding compatibility to other medication forms in the future.
                </div>
            )}
        </div>
    );
}

// Export the component
export default FAQContent;
