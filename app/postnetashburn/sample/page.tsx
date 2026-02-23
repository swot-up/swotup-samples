'use client';

import { useState, useEffect } from 'react';

function FAQItem({ faq }: { faq: { q: string, a: string } }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className={`border p-6 rounded-2xl transition-all cursor-pointer shadow-sm ${isOpen ? 'border-red-200 bg-white' : 'bg-slate-50 border-slate-200 hover:border-red-200 hover:bg-white group'}`}
        >
            <h4 className="text-lg font-bold text-slate-900 flex justify-between items-center">
                {faq.q}
                <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : 'text-slate-400 group-hover:text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </h4>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
        </div>
    );
}

function TrackingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [trackingId, setTrackingId] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingId) return;

        setIsRedirecting(true);
        setTimeout(() => {
            setIsRedirecting(false);
            setTrackingId('');
            onClose();
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-6" onClick={onClose}>
            <div
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                >
                    ✕
                </button>

                {!isRedirecting ? (
                    <>
                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            📦
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Track a Package</h3>
                        <p className="text-slate-600 text-sm mb-6">Enter your tracking number below. We'll automatically route you to the correct carrier.</p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                placeholder="Enter Tracking ID (e.g. 1ZX9...)"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 mb-4 text-slate-900"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                            >
                                Track Now
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-red-600 animate-spin mx-auto mb-6"></div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Locating Package...</h3>
                        <p className="text-slate-600 text-sm">Redirecting you to the UPS tracking portal for your shipment: <span className="font-mono font-medium">{trackingId}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
}

function OrderModal({ isOpen, onClose, initialDocType }: { isOpen: boolean, onClose: () => void, initialDocType?: string }) {
    const [step, setStep] = useState(1);
    const [docType, setDocType] = useState(initialDocType || '');

    useEffect(() => {
        if (initialDocType) setDocType(initialDocType);
    }, [initialDocType]);
    const [copies, setCopies] = useState(1);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderId, setOrderId] = useState('');

    if (!isOpen) return null;

    const steps = ['Document', 'Upload', 'Copies', 'Pickup', 'Details', 'Payment'];

    const handleNext = () => setStep(s => Math.min(s + 1, 7));
    const handleBack = () => setStep(s => Math.max(s - 1, 1));
    const handleClose = () => {
        setStep(1);
        setDocType('');
        setCopies(1);
        setPickupDate('');
        setPickupTime('');
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setPaymentMethod('');
        setIsSubmitting(false);
        setOrderId('');
        onClose();
    };

    const handleSubmitOrder = () => {
        setIsSubmitting(true);
        // Generate pseudo-UUID
        const uuid = crypto.randomUUID ? crypto.randomUUID() : 'req-' + Math.random().toString(36).substring(2, 15);

        setTimeout(() => {
            setIsSubmitting(false);
            setOrderId(uuid);
            setStep(7);
        }, 2000);
    };

    // Generate next 7 working days
    const nextDates = [];
    let currentDate = new Date();
    while (nextDates.length < 7) {
        currentDate.setDate(currentDate.getDate() + 1);
        const day = currentDate.getDay();
        if (day !== 0 && day !== 6) { // Skip Sunday(0) and Saturday(6)
            nextDates.push(new Date(currentDate));
        }
    }

    const formatApptDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const timeOptions = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM'
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-6 overflow-y-auto" onClick={handleClose}>
            <div
                className="bg-white rounded-3xl p-8 pt-14 max-w-2xl w-full shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {step < 7 && (
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                    >
                        ✕
                    </button>
                )}

                {step < 7 ? (
                    <>
                        <div className="flex items-center justify-between mb-8 relative">
                            <div className="absolute top-5 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0 hidden sm:block"></div>
                            <div
                                className="absolute top-5 left-0 h-1 bg-red-600 -translate-y-1/2 z-0 transition-all duration-300 hidden sm:block"
                                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                            ></div>

                            {steps.map((label, i) => {
                                const stepNum = i + 1;
                                const isActive = step === stepNum;
                                const isPast = step > stepNum;
                                return (
                                    <div key={label} className="relative z-10 flex flex-col items-center gap-2">
                                        <button
                                            onClick={() => isPast || step > stepNum ? setStep(stepNum) : null}
                                            disabled={!isPast && step !== stepNum}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${isActive ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30' :
                                                isPast ? 'bg-red-50 border-red-600 text-red-600 cursor-pointer hover:bg-red-100' :
                                                    'bg-white border-slate-200 text-slate-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {isPast ? '✓' : stepNum}
                                        </button>
                                        <span className={`text-xs font-semibold hidden sm:block ${isActive || isPast ? 'text-slate-800' : 'text-slate-400'}`}>{label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">What would you like to print?</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Business Cards', 'Flyers & Brochures', 'Large Blueprints', 'Banners & Signs', 'Documents/PDFs', 'Other'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setDocType(type)}
                                            className={`p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between ${docType === type ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 hover:border-red-300 text-slate-700'}`}
                                        >
                                            {type}
                                            {docType === type && <span className="text-red-600 text-xl leading-none">✓</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload your file(s)</h3>
                                <p className="text-slate-600 text-sm mb-6">PDF, AI, PSD, JPEG, PNG supported. Max 500MB.</p>

                                <label className="block border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:border-red-400 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center group">
                                    <input type="file" className="hidden" onChange={() => handleNext()} />
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mb-4 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                    </div>
                                    <p className="font-semibold text-slate-800">Click to browse or drag your files here</p>
                                    <p className="text-sm text-slate-500 mt-2">Uploading will instantly advance to the next step for this demo</p>
                                </label>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">How many copies?</h3>

                                <div className="flex flex-col items-center justify-center py-8">
                                    <div className="flex items-center gap-6 mb-8">
                                        <button
                                            onClick={() => setCopies(Math.max(1, copies - 1))}
                                            className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-3xl font-light flex items-center justify-center transition-colors shadow-sm active:scale-95"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={copies}
                                            onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-32 py-4 text-center text-4xl font-bold text-slate-900 border-b-2 border-slate-200 focus:outline-none focus:border-red-600 bg-transparent"
                                        />
                                        <button
                                            onClick={() => setCopies(copies + 1)}
                                            className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-3xl font-light flex items-center justify-center transition-colors shadow-sm active:scale-95"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex justify-center gap-2 flex-wrap">
                                        {[10, 50, 100, 500].map(preset => (
                                            <button
                                                key={preset}
                                                onClick={() => setCopies(preset)}
                                                className="px-6 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:border-red-300 transition-colors"
                                            >
                                                {preset}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Schedule Pickup</h3>
                                <p className="text-slate-600 text-sm mb-6">Operating hours are Mon-Fri, 9:00 AM - 6:00 PM. Earliest pickup is next day.</p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Pickup Date</label>
                                        <select
                                            value={pickupDate}
                                            onChange={(e) => setPickupDate(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900 appearance-none bg-white"
                                        >
                                            <option value="" disabled>Select Date</option>
                                            {nextDates.map((date, i) => (
                                                <option key={i} value={formatApptDate(date)}>
                                                    {formatApptDate(date)} {i === 0 ? '(Tomorrow)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Pickup Time</label>
                                        <select
                                            value={pickupTime}
                                            onChange={(e) => setPickupTime(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900 appearance-none bg-white"
                                        >
                                            <option value="" disabled>Select Time</option>
                                            {timeOptions.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Details</h3>
                                <p className="text-slate-600 text-sm mb-6">We need this information to notify you when your order is ready.</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="Jane Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="jane@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder="(555) 555-5555"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 6 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h3>
                                <div className="space-y-4 mb-6">
                                    {[
                                        { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                                        { id: 'apple', name: 'Apple Pay', icon: '' },
                                        { id: 'google', name: 'Google Pay', icon: 'G' }
                                    ].map(method => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === method.id ? 'border-red-600 bg-red-50' : 'border-slate-200 hover:border-red-300'}`}
                                            onClick={() => setPaymentMethod(method.id)}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={paymentMethod === method.id}
                                                onChange={() => { }}
                                                className="w-5 h-5 text-red-600 focus:ring-red-500 border-red-300"
                                            />
                                            <span className="ml-4 text-xl w-8 text-center" style={method.id === 'apple' ? { fontSize: '22px', position: 'relative', top: '-2px' } : {}}>{method.icon}</span>
                                            <span className={`ml-2 font-bold ${paymentMethod === method.id ? 'text-red-800' : 'text-slate-800'}`}>{method.name}</span>
                                        </label>
                                    ))}
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input type="text" placeholder="Card Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500" />
                                        <div className="flex gap-4">
                                            <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500" />
                                            <input type="text" placeholder="CVC" className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-10 flex justify-between gap-4 border-t border-slate-100 pt-6">
                            <button
                                onClick={handleBack}
                                disabled={step === 1}
                                className={`px-6 py-3 rounded-xl font-bold transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
                            >
                                Back
                            </button>

                            {step < 6 ? (
                                <button
                                    onClick={handleNext}
                                    disabled={
                                        (step === 1 && !docType) ||
                                        (step === 4 && (!pickupDate || !pickupTime)) ||
                                        (step === 5 && (!customerName || !customerEmail || !customerPhone))
                                    }
                                    className={`px-8 py-3 rounded-xl font-bold transition-colors ${(step === 1 && !docType) ||
                                        (step === 4 && (!pickupDate || !pickupTime)) ||
                                        (step === 5 && (!customerName || !customerEmail || !customerPhone))
                                        ? 'bg-red-300 text-white cursor-not-allowed'
                                        : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30'
                                        }`}
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmitOrder}
                                    disabled={!paymentMethod || isSubmitting}
                                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${!paymentMethod ? 'bg-red-300 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30'}`}
                                >
                                    {isSubmitting ? (
                                        <><div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Processing...</>
                                    ) : (
                                        'Submit Order'
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6 text-5xl">
                            ✓
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Order Received!</h3>
                        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                            Thank you for your order! Your confirmed pickup is scheduled for <strong>{pickupDate}</strong> at <strong>{pickupTime}</strong> at the Ashburn store.
                        </p>
                        <p className="text-sm font-mono text-slate-400 mb-2 p-3 bg-slate-50 border border-slate-100 rounded-lg inline-block">Ref: {orderId}</p>
                        <p className="text-xs text-slate-500 mb-10">We've sent a confirmation email to <strong>{customerEmail}</strong></p>
                        <button
                            onClick={handleClose}
                            className="px-8 py-4 w-full rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/10"
                        >
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function DropoffModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [itemType, setItemType] = useState('');
    const [carrier, setCarrier] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dropoffId, setDropoffId] = useState('');

    if (!isOpen) return null;

    const steps = ['Package', 'Carrier', 'Time', 'Details', 'Confirm'];

    const handleNext = () => setStep(s => Math.min(s + 1, 6));
    const handleBack = () => setStep(s => Math.max(s - 1, 1));
    const handleClose = () => {
        setStep(1);
        setItemType('');
        setCarrier('');
        setDropoffDate('');
        setDropoffTime('');
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setIsSubmitting(false);
        setDropoffId('');
        onClose();
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Generate pseudo-UUID
        const uuid = crypto.randomUUID ? crypto.randomUUID() : 'drop-' + Math.random().toString(36).substring(2, 15);

        setTimeout(() => {
            setIsSubmitting(false);
            setDropoffId(uuid);
            setStep(6);
        }, 1500);
    };

    // Generate next 7 working days
    const nextDates = [];
    let currentDate = new Date();
    while (nextDates.length < 7) {
        currentDate.setDate(currentDate.getDate() + 1);
        const day = currentDate.getDay();
        if (day !== 0 && day !== 6) {
            nextDates.push(new Date(currentDate));
        }
    }

    const formatApptDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const timeOptions = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM'
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-6 overflow-y-auto" onClick={handleClose}>
            <div
                className="bg-white rounded-3xl p-8 pt-14 max-w-2xl w-full shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {step < 6 && (
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                    >
                        ✕
                    </button>
                )}

                {step < 6 ? (
                    <>
                        <div className="flex items-center justify-between mb-8 relative px-4">
                            <div className="absolute top-5 left-4 right-4 h-1 bg-slate-100 -translate-y-1/2 z-0 hidden sm:block"></div>
                            <div
                                className="absolute top-5 left-4 h-1 bg-red-600 -translate-y-1/2 z-0 transition-all duration-300 hidden sm:block"
                                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                            ></div>

                            {steps.map((label, i) => {
                                const stepNum = i + 1;
                                const isActive = step === stepNum;
                                const isPast = step > stepNum;
                                return (
                                    <div key={label} className="relative z-10 flex flex-col items-center gap-2">
                                        <button
                                            onClick={() => isPast || step > stepNum ? setStep(stepNum) : null}
                                            disabled={!isPast && step !== stepNum}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${isActive ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30' :
                                                isPast ? 'bg-red-50 border-red-600 text-red-600 cursor-pointer hover:bg-red-100' :
                                                    'bg-white border-slate-200 text-slate-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {isPast ? '✓' : stepNum}
                                        </button>
                                        <span className={`text-xs font-semibold hidden sm:block ${isActive || isPast ? 'text-slate-800' : 'text-slate-400'}`}>{label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">What are you dropping off?</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { id: 'box', name: 'Packaged Box', icon: '📦' },
                                        { id: 'envelope', name: 'Document/Envelope', icon: '✉️' },
                                        { id: 'return', name: 'QR Return (No Label)', icon: '📱' }
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setItemType(type.id)}
                                            className={`p-6 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${itemType === type.id ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 hover:border-red-300 text-slate-700'}`}
                                        >
                                            <span className="text-4xl mb-3">{type.icon}</span>
                                            <span className="font-bold text-sm">{type.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Select Carrier</h3>
                                <div className="space-y-3">
                                    {[
                                        { id: 'ups', name: 'UPS', color: 'bg-amber-100 text-amber-900 border-amber-200 hover:border-amber-400' },
                                        { id: 'fedex', name: 'FedEx', color: 'bg-indigo-100 text-indigo-900 border-indigo-200 hover:border-indigo-400' },
                                        { id: 'usps', name: 'USPS', color: 'bg-blue-100 text-blue-900 border-blue-200 hover:border-blue-400' },
                                        { id: 'dhl', name: 'DHL', color: 'bg-yellow-100 text-yellow-900 border-yellow-200 hover:border-yellow-400' }
                                    ].map(c => (
                                        <label
                                            key={c.id}
                                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${carrier === c.id ? `border-red-600 ring-4 ring-red-50 ${c.color}` : 'border-slate-200 hover:bg-slate-50'}`}
                                            onClick={() => setCarrier(c.id)}
                                        >
                                            <input
                                                type="radio"
                                                checked={carrier === c.id}
                                                onChange={() => { }}
                                                className="w-5 h-5 text-red-600 focus:ring-red-500 border-gray-300"
                                            />
                                            <span className="ml-4 font-bold text-lg">{c.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">When are you coming?</h3>
                                <p className="text-slate-600 text-sm mb-6">Scheduling helps us prioritize counter space, but walk-ins are always welcome.</p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Drop-off Date</label>
                                        <select
                                            value={dropoffDate}
                                            onChange={(e) => setDropoffDate(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900 appearance-none bg-white"
                                        >
                                            <option value="" disabled>Select Date...</option>
                                            {nextDates.map((date, i) => (
                                                <option key={i} value={formatApptDate(date)}>
                                                    {formatApptDate(date)} {i === 0 ? '(Tomorrow)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Approximate Time</label>
                                        <select
                                            value={dropoffTime}
                                            onChange={(e) => setDropoffTime(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900 appearance-none bg-white"
                                        >
                                            <option value="" disabled>Select Time...</option>
                                            {timeOptions.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Details</h3>
                                <p className="text-slate-600 text-sm mb-6">Who's dropping this off? We'll email you a receipt.</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder="(555) 555-5555"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Confirm Drop-off</h3>

                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 mb-6">
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                        <span className="text-slate-500">Service</span>
                                        <span className="font-bold text-slate-900 capitalize">{carrier} Drop-off</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                        <span className="text-slate-500">Package Type</span>
                                        <span className="font-bold text-slate-900 capitalize">{itemType === 'box' ? 'Box/Package' : itemType === 'envelope' ? 'Document' : 'QR Return'}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                        <span className="text-slate-500">Customer Name</span>
                                        <span className="font-bold text-slate-900">{customerName}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500">Scheduled Time</span>
                                        <div className="text-right">
                                            <div className="font-bold text-slate-900">{dropoffDate}</div>
                                            <div className="text-sm text-slate-600">{dropoffTime}</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-center text-slate-500">Please ensure all items are securely taped and labels are attached prior to arrival, unless you need us to print/pack them for you!</p>
                            </div>
                        )}

                        <div className="mt-10 flex justify-between gap-4 border-t border-slate-100 pt-6">
                            <button
                                onClick={handleBack}
                                disabled={step === 1}
                                className={`px-6 py-3 rounded-xl font-bold transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
                            >
                                Back
                            </button>

                            {step < 5 ? (
                                <button
                                    onClick={handleNext}
                                    disabled={
                                        (step === 1 && !itemType) ||
                                        (step === 2 && !carrier) ||
                                        (step === 3 && (!dropoffDate || !dropoffTime)) ||
                                        (step === 4 && (!customerName || !customerEmail || !customerPhone))
                                    }
                                    className={`px-8 py-3 rounded-xl font-bold transition-colors ${(step === 1 && !itemType) ||
                                        (step === 2 && !carrier) ||
                                        (step === 3 && (!dropoffDate || !dropoffTime)) ||
                                        (step === 4 && (!customerName || !customerEmail || !customerPhone))
                                        ? 'bg-red-300 text-white cursor-not-allowed'
                                        : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30'
                                        }`}
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isSubmitting ? 'bg-red-400 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30'}`}
                                >
                                    {isSubmitting ? (
                                        <><div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Confirming...</>
                                    ) : (
                                        'Confirm Schedule'
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6 text-5xl">
                            ✓
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">See you soon!</h3>
                        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                            Your drop-off window is booked for <strong>{dropoffDate}</strong> at <strong>{dropoffTime}</strong>.
                        </p>
                        <div className="flex flex-col items-center gap-3 mb-10">
                            <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                                <span>📍</span> 42841 Creek View Plaza, Ashburn
                            </div>
                            <p className="text-sm font-mono text-slate-400 p-3 bg-slate-50 border border-slate-100 rounded-lg w-full max-w-xs">Ref: {dropoffId}</p>
                            <p className="text-xs text-slate-500 w-full mt-1">We'll email a receipt to <strong>{customerEmail}</strong></p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="px-8 py-4 w-full rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/10"
                        >
                            Return to Website
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function QuoteModal({ isOpen, onClose, initialService }: { isOpen: boolean, onClose: () => void, initialService?: string }) {
    const [step, setStep] = useState(1);
    const [serviceType, setServiceType] = useState(initialService || '');

    useEffect(() => {
        if (initialService) {
            setServiceType(initialService);
            setStep(2); // Jump to details if service is already selected
        }
    }, [initialService]);
    const [projectDetails, setProjectDetails] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quoteId, setQuoteId] = useState('');

    if (!isOpen) return null;

    const steps = ['Service', 'Details', 'Contact', 'Send'];

    const handleNext = () => setStep(s => Math.min(s + 1, 5));
    const handleBack = () => setStep(s => Math.max(s - 1, 1));
    const handleClose = () => {
        setStep(1);
        setServiceType('');
        setProjectDetails('');
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setIsSubmitting(false);
        setQuoteId('');
        onClose();
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        const uuid = crypto.randomUUID ? crypto.randomUUID() : 'quote-' + Math.random().toString(36).substring(2, 15);

        setTimeout(() => {
            setIsSubmitting(false);
            setQuoteId(uuid);
            setStep(5);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-6 overflow-y-auto" onClick={handleClose}>
            <div
                className="bg-white rounded-3xl p-8 pt-14 max-w-2xl w-full shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {step < 5 && (
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                    >
                        ✕
                    </button>
                )}

                {step < 5 ? (
                    <>
                        <div className="flex items-center justify-between mb-8 relative px-4">
                            <div className="absolute top-5 left-4 right-4 h-1 bg-slate-100 -translate-y-1/2 z-0 hidden sm:block"></div>
                            <div
                                className="absolute top-5 left-4 h-1 bg-red-600 -translate-y-1/2 z-0 transition-all duration-300 hidden sm:block"
                                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                            ></div>

                            {steps.map((label, i) => {
                                const stepNum = i + 1;
                                const isActive = step === stepNum;
                                const isPast = step > stepNum;
                                return (
                                    <div key={label} className="relative z-10 flex flex-col items-center gap-2">
                                        <button
                                            onClick={() => isPast || step > stepNum ? setStep(stepNum) : null}
                                            disabled={!isPast && step !== stepNum}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${isActive ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30' :
                                                isPast ? 'bg-red-50 border-red-600 text-red-600 cursor-pointer hover:bg-red-100' :
                                                    'bg-white border-slate-200 text-slate-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {isPast ? '✓' : stepNum}
                                        </button>
                                        <span className={`text-xs font-semibold hidden sm:block ${isActive || isPast ? 'text-slate-800' : 'text-slate-400'}`}>{label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">What do you need a quote for?</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { id: 'print', name: 'Printing & Copying', icon: '🖨️' },
                                        { id: 'design', name: 'Graphic Design', icon: '🎨' },
                                        { id: 'shipping', name: 'Custom Shipping', icon: '🌍' },
                                        { id: 'mailbox', name: 'Virtual Mailbox', icon: '📬' }
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setServiceType(type.id)}
                                            className={`p-6 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${serviceType === type.id ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 hover:border-red-300 text-slate-700'}`}
                                        >
                                            <span className="text-4xl mb-3">{type.icon}</span>
                                            <span className="font-bold text-lg">{type.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Project Details</h3>
                                <p className="text-slate-600 text-sm mb-6">Give us a brief description of what you are looking to do.</p>

                                <textarea
                                    className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900 resize-none mb-4"
                                    placeholder="I need 500 business cards designed and printed on heavy cardstock..."
                                    value={projectDetails}
                                    onChange={(e) => setProjectDetails(e.target.value)}
                                ></textarea>

                                <label className="block border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-red-400 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center group">
                                    <input type="file" className="hidden" />
                                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-red-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                        <span className="font-semibold text-sm">Attach optional reference files</span>
                                    </div>
                                </label>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Contact Info</h3>
                                <p className="text-slate-600 text-sm mb-6">Where should we send the quote to?</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="Jane Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="jane@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder="(555) 555-5555"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Review Request</h3>

                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 mb-6">
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                        <span className="text-slate-500">Service</span>
                                        <span className="font-bold text-slate-900 capitalize">{serviceType.replace('-', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                        <span className="text-slate-500">Requested By</span>
                                        <span className="font-bold text-slate-900">{customerName}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 pt-2">
                                        <span className="text-slate-500 text-sm">Brief Description</span>
                                        <p className="text-sm font-medium text-slate-800 line-clamp-2 bg-white p-3 rounded-lg border border-slate-200">{projectDetails || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-10 flex justify-between gap-4 border-t border-slate-100 pt-6">
                            <button
                                onClick={handleBack}
                                disabled={step === 1}
                                className={`px-6 py-3 rounded-xl font-bold transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
                            >
                                Back
                            </button>

                            {step < 4 ? (
                                <button
                                    onClick={handleNext}
                                    disabled={
                                        (step === 1 && !serviceType) ||
                                        (step === 2 && !projectDetails) ||
                                        (step === 3 && (!customerName || !customerEmail || !customerPhone))
                                    }
                                    className={`px-8 py-3 rounded-xl font-bold transition-colors ${(step === 1 && !serviceType) ||
                                        (step === 2 && !projectDetails) ||
                                        (step === 3 && (!customerName || !customerEmail || !customerPhone))
                                        ? 'bg-red-300 text-white cursor-not-allowed'
                                        : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30'
                                        }`}
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isSubmitting ? 'bg-red-400 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30'}`}
                                >
                                    {isSubmitting ? (
                                        <><div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Sending...</>
                                    ) : (
                                        'Request Quote'
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6 text-5xl">
                            ✓
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Sent!</h3>
                        <div className="flex flex-col items-center gap-3 mb-10">
                            <p className="text-lg text-slate-600 max-w-md mx-auto">
                                Our team is reviewing the details for your <strong>{serviceType}</strong> project.
                            </p>
                            <p className="text-sm font-mono text-slate-400 p-3 bg-slate-50 border border-slate-100 rounded-lg w-full max-w-xs mt-4">Ref: {quoteId}</p>
                            <p className="text-xs text-slate-500 w-full mt-1">We will respond to <strong>{customerEmail}</strong> within 24 hours.</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="px-8 py-4 w-full rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/10"
                        >
                            Back to Website
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PostnetSamplePage() {
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isDropoffModalOpen, setIsDropoffModalOpen] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedDocType, setSelectedDocType] = useState<string | undefined>(undefined);
    const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

    const openOrderModal = (docType?: string) => {
        setSelectedDocType(docType);
        setIsOrderModalOpen(true);
    };

    const openQuoteModal = (service?: string) => {
        setSelectedService(service);
        setIsQuoteModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-100 selection:text-red-900">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 transition-all shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                            P
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">PostNet <span className="font-light text-slate-500">Ashburn</span></span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
                        <a href="#services" className="text-slate-600 hover:text-red-600 transition-colors">Services</a>
                        <a href="#catalog" className="text-slate-600 hover:text-red-600 transition-colors">Order Online</a>
                        <a href="#about" className="text-slate-600 hover:text-red-600 transition-colors">About Us</a>
                        <a href="#faq" className="text-slate-600 hover:text-red-600 transition-colors">FAQ</a>
                        <div className="h-6 w-px bg-slate-200 mx-2"></div>
                        <a href="tel:7035748454" className="text-slate-800 font-semibold hover:text-red-600 transition-colors">
                            (703) 574 - 8454
                        </a>
                        <div className="flex gap-3">
                            <button
                                onClick={(e) => { e.preventDefault(); setIsTrackingModalOpen(true); }}
                                className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                            >
                                Track Package
                            </button>
                            <button
                                onClick={(e) => { e.preventDefault(); setIsQuoteModalOpen(true); }}
                                className="px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                            >
                                Get a Quote
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Slide-out Menu */}
                <div className={`lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="p-6 space-y-6 flex flex-col items-center text-center">
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <button
                                onClick={(e) => { e.preventDefault(); setIsTrackingModalOpen(true); setIsMobileMenuOpen(false); }}
                                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700"
                            >
                                <span className="text-2xl">📦</span>
                                <span className="text-xs font-bold uppercase tracking-wider">Track</span>
                            </button>
                            <button
                                onClick={(e) => { e.preventDefault(); setIsQuoteModalOpen(true); setIsMobileMenuOpen(false); }}
                                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600"
                            >
                                <span className="text-2xl">📋</span>
                                <span className="text-xs font-bold uppercase tracking-wider">Quote</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 w-full text-lg font-bold text-slate-900 border-t border-slate-100 pt-6">
                            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                            <a href="#catalog" onClick={() => setIsMobileMenuOpen(false)}>Order Online</a>
                            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
                            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
                        </div>
                        <a href="tel:7035748454" className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center gap-3">
                            <span>📞</span> (703) 574 - 8454
                        </a>
                    </div>
                </div>
            </nav>

            <main>
                {/* Dynamic Hero Section */}
                <section className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[85vh] md:min-h-[90vh] bg-white">
                    {/* Gradients */}
                    <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-slate-50/50 md:bg-slate-50 rounded-bl-none md:rounded-bl-[100px] pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)] md:hidden pointer-events-none"></div>
                    <div className="absolute top-1/4 left-1/4 w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-red-600/5 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-rose-500/5 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-xs font-semibold text-red-600 uppercase tracking-widest mb-6 backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    Your One-Stop Business Center
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
                                    Ship Fast.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                                        Print Perfect.
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                                    Ashburn's locally owned hub for professional printing, secure global shipping, and virtual mailboxes. Dedicated to helping local businesses thrive.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <button
                                        onClick={() => openOrderModal()}
                                        className="px-8 py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                                    >
                                        Start Print Order
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </button>
                                    <button
                                        onClick={() => setIsDropoffModalOpen(true)}
                                        className="px-8 py-4 rounded-xl bg-white text-slate-800 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                                    >
                                        Schedule Drop-off
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs text-slate-600">
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex text-yellow-400">
                                            {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                                        </div>
                                        <span>Trusted by 500+ Ashburn locals</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Mockup Graphic */}
                            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] border border-slate-200 bg-white/50 backdrop-blur-3xl overflow-hidden flex items-center justify-center group shadow-2xl p-6">
                                <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Floating Widgets */}
                                <div className="absolute top-10 right-10 w-48 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 p-4 shadow-xl transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500 z-20">
                                    <div className="text-xs text-slate-500 mb-1">New Order</div>
                                    <div className="font-bold text-slate-900 mb-2">500 Business Cards</div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-3/4 animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                    <div className="text-right mt-1 text-[10px] text-green-600 font-semibold">Printing...</div>
                                </div>

                                <div className="absolute bottom-10 left-10 w-56 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 p-4 shadow-xl transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-500 z-20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">📦</div>
                                        <div>
                                            <div className="text-xs text-slate-500">Tracking</div>
                                            <div className="font-bold text-slate-900 text-sm">#1ZX98...</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-800 font-medium">
                                        <span>Ashburn</span>
                                        <span className="text-slate-400">→</span>
                                        <span>New York</span>
                                    </div>
                                </div>

                                {/* Central Image Placeholder */}
                                <div className="w-3/4 h-3/4 rounded-2xl bg-slate-100 border border-slate-200 shadow-lg overflow-hidden relative z-10">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-500 flex-col gap-2">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                        <span className="text-sm font-medium tracking-wide">Local Storefront Image</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Action-Oriented Services Grid */}
                <section id="services" className="py-24 bg-slate-50 border-y border-slate-200">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                                    Everything in one <span className="text-red-600">place.</span>
                                </h2>
                                <p className="text-slate-600 text-lg max-w-2xl">From professional blueprints to global shipping, we streamline your business logistics.</p>
                            </div>
                            <button className="hidden md:block px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold hover:bg-slate-100 transition-colors shadow-sm">
                                View All Services
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    id: 'shipping',
                                    title: 'Courier & Shipping',
                                    desc: 'Secure packing & global shipping via FedEx, UPS, & USPS. Compare rates instantly.',
                                    icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
                                    cta: 'Book a Shipment'
                                },
                                {
                                    id: 'print',
                                    title: 'Premium Printing',
                                    desc: 'Brochures, large format blueprints, business cards, and custom promotional items.',
                                    icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z',
                                    cta: 'Order Prints Now'
                                },
                                {
                                    id: 'mailbox',
                                    title: 'Virtual Mailboxes',
                                    desc: 'A real street address, package receiving, and mail forwarding tailored for remote businesses.',
                                    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                                    cta: 'Reserve Mailbox'
                                }
                            ].map((service, i) => (
                                <div key={i} className="bg-white p-10 rounded-3xl border border-slate-200 hover:border-red-200 transition-all group flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-xl">
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors"></div>

                                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-100 group-hover:text-red-700 transition-all text-red-600">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm flex-grow mb-8">{service.desc}</p>

                                    <button
                                        onClick={() => {
                                            if (service.id === 'shipping') setIsDropoffModalOpen(true);
                                            else if (service.id === 'print') openOrderModal();
                                            else openQuoteModal(service.id);
                                        }}
                                        className="mt-auto w-full py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white group-hover:shadow-md"
                                    >
                                        {service.cta}
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* E-commerce / Quick Order Preview */}
                <section id="catalog" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="text-red-600 font-semibold tracking-widest text-sm uppercase">Order Online</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">Fast Custom Printing</h2>
                            <p className="text-slate-600 max-w-xl mx-auto">Upload your files directly and get instant proofs and pricing. No more back-and-forth emails.</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: 'Business Cards', price: 'from $25', img: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                                { title: 'Flyers & Brochures', price: 'from $45', img: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                                { title: 'Banners & Signs', price: 'from $60', img: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                                { title: 'Large Blueprints', price: 'from $5/page', img: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => openOrderModal(item.title)}
                                    className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 hover:shadow-lg hover:border-red-200 transition-all cursor-pointer group flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 text-slate-500 group-hover:text-red-600 group-hover:bg-red-50 transition-colors">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.img} /></svg>
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{item.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <button className="px-8 py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors inline-block shadow-lg shadow-red-600/20">
                                View Full Product Catalog
                            </button>
                        </div>
                    </div>
                </section>

                {/* About & Trust Section */}
                <section id="about" className="py-24 bg-slate-100 border-y border-slate-200 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-red-500/10 blur-3xl rounded-full"></div>
                                <div className="relative aspect-[4/5] rounded-[2.5rem] bg-white border-4 border-slate-200 shadow-2xl overflow-hidden flex items-center justify-center">
                                    <span className="text-slate-400 font-medium">Local Team & Storefront</span>
                                </div>
                                {/* floating badge */}
                                <div className="absolute -bottom-8 -right-8 bg-white border border-slate-200 p-6 rounded-3xl shadow-2xl max-w-xs">
                                    <div className="flex text-yellow-500 mb-2">
                                        {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                                    </div>
                                    <p className="text-sm text-slate-700 italic mb-3">"They handled our massive marketing print order flawlessly and shipped directly to our clients. Phenomenal service from the Ashburn team!"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-900">Sarah Jenkins</div>
                                            <div className="text-[10px] text-slate-500">Local Business Owner</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                                    More than just a store.<br />
                                    <span className="text-red-600 font-medium">Your business partner.</span>
                                </h2>
                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                    At PostNet Ashburn, we are proud to serve our local community. Whether you're a small business owner, an enterprise, or an individual, our dedicated team works directly with you to ensure your printing and shipping needs are met flawlessly.
                                </p>
                                <div className="space-y-4 mb-10">
                                    {['Locally owned and operated in Ashburn, VA', 'Personalized service, no corporate red tape', 'Premium quality guaranteed on all prints'].map((point, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-700">
                                            <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-lg">
                                    Meet Our Team
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-24 bg-white max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2>
                        <p className="text-slate-600">Everything you need to know about our local services.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "What carriers do you use for shipping?", a: "We partner with all major carriers including FedEx, UPS, and USPS so you can compare rates and choose the best option for speed and budget right at our counter." },
                            { q: "What is the turnaround time for custom printing?", a: "Standard business cards, flyers, and banners usually take 24-48 hours. Rush options are available dependent on the complexity of the project." },
                            { q: "Do you offer graphic design services?", a: "Yes! If you just have an idea or raw assets, our in-house designers can create professional layouts for your marketing collateral." },
                            { q: "How do virtual mailboxes work?", a: "You get a real Ashburn street address. We accept packages from all carriers (unlike PO boxes). We can notify you upon arrival, forward your mail, or securely hold it until you arrive." }
                        ].map((faq, i) => (
                            <FAQItem key={i} faq={faq} />
                        ))}
                    </div>
                </section>

            </main>

            {/* Modern Footer with explicit contact/NAP standardization */}
            <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-sm">P</div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">PostNet <span className="font-light text-slate-500">Ashburn</span></span>
                            </div>
                            <p className="text-slate-600 mb-6 max-w-sm">
                                Your neighborhood business center offering reliable printing, shipping, and design services built for local professionals.
                            </p>
                            <div className="flex gap-4">
                                {/* Social icons */}
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">f</a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">in</a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors">ig</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-slate-900 font-bold mb-6">Quick Links</h4>
                            <ul className="space-y-3 text-slate-600 text-sm">
                                <li><a href="#" className="hover:text-red-600 transition-colors">Track a Package</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors">Get a Quote</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors">Business Printing</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors">Virtual Mailboxes</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-slate-900 font-bold mb-6">Contact & Visit</h4>
                            <ul className="space-y-3 text-slate-600 text-sm">
                                <li className="flex gap-2">
                                    <span className="text-red-600 mt-0.5">📍</span>
                                    <span>42841 Creek View Plaza<br />Suite #120<br />Ashburn, VA 20147</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-600">📞</span>
                                    <span>(703) 574 - 8454</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-600">✉️</span>
                                    <span>va129@postnet.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 text-center text-slate-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>Demo Prototype · Not affiliated with PostNet corporate</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            <TrackingModal isOpen={isTrackingModalOpen} onClose={() => setIsTrackingModalOpen(false)} />
            <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} initialDocType={selectedDocType} />
            <DropoffModal isOpen={isDropoffModalOpen} onClose={() => setIsDropoffModalOpen(false)} />
            <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} initialService={selectedService} />
        </div>
    );
}
