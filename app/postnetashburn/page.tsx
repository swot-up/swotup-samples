'use client';

import Link from 'next/link';

export default function PostnetAshburnReport() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-100 selection:text-red-900">
            {/* Background Gradient Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-rose-500/10 blur-[120px]"></div>
            </div>

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-24">
                {/* Header / Hero */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 text-sm font-semibold tracking-wide uppercase">
                        Digital Presence Analysis
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-500 to-rose-400 mb-6 tracking-tight">
                        PostNet Ashburn
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        A transformation of your digital experience. We've moved beyond the static corporate template to build a functional, consumer-grade business tool designed to capture and convert local Ashburn traffic.
                    </p>
                </div>

                {/* Big Prototype Link */}
                <div className="flex flex-col items-center mb-24">
                    <Link href="/postnetashburn/sample" className="group relative inline-flex items-center justify-center gap-3 px-10 py-6 text-xl font-bold text-white transition-all bg-red-600 rounded-2xl hover:bg-red-700 hover:scale-[1.02] shadow-xl hover:shadow-2xl shadow-red-600/20 overflow-hidden mb-6">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Launch Interactive Prototype
                        <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                    <p className="text-sm font-medium text-slate-400 animate-pulse">Experience the transformation live</p>
                </div>

                {/* What We've Built Section */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                        <span className="w-8 h-1 bg-red-600 rounded-full"></span>
                        What We’ve Solved: The Interactive Prototype
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {[
                            { title: 'Smart Order System', icon: '🎨', desc: '7-step guide for print jobs with UUID tracking.' },
                            { title: 'Drop-off Scheduler', icon: '📦', desc: 'Direct carrier selection for Ashburn locals.' },
                            { title: 'Dynamic Quoting', icon: '📋', desc: 'Pre-selected workflows for rapid inquiries.' },
                            { title: 'Mobile-First NAV', icon: '📱', desc: 'One-thumb access to Track & Quote.' }
                        ].map((feat, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-red-200 transition-colors">
                                <div className="text-3xl mb-3">{feat.icon}</div>
                                <h4 className="font-bold text-slate-900 mb-1">{feat.title}</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Guided Tour / Interaction Tips */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-sm">✨</span>
                                Prototype Guided Tour
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <span className="text-red-500 font-bold">01</span>
                                        <div>
                                            <p className="font-bold mb-1">Test the "Hero" Converters</p>
                                            <p className="text-slate-400 text-sm">Try "Start Print Order" or "Schedule Drop-off" in the hero section to see the full multi-step data collection in action.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-red-500 font-bold">02</span>
                                        <div>
                                            <p className="font-bold mb-1">Try "Get a Quote" (Grid)</p>
                                            <p className="text-slate-400 text-sm">Scroll to the services grid and click "Graphic Design". Notice how it pre-selects the type and jumps straight to details.</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <span className="text-red-500 font-bold">03</span>
                                        <div>
                                            <p className="font-bold mb-1">Universal Navigation</p>
                                            <p className="text-slate-400 text-sm">Use the red header button for general quotes, or "Track Package" to see our professional redirection feedback.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-red-500 font-bold">04</span>
                                        <div>
                                            <p className="font-bold mb-1">UUID Verification</p>
                                            <p className="text-slate-400 text-sm">Complete any form to receive a unique reference ID, demonstrating the professional peace of mind provided to clients.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Current State Analysis */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                        <span className="w-8 h-1 bg-slate-400 rounded-full"></span>
                        Baseline Website Analysis
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Functional Limitations</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                The current site serves as a digital brochure but lacks conversion utility. Users are forced away from the Ashburn brand into external trackers and generic corporate contact forms.
                            </p>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-sm text-red-500 font-medium">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    Friction-heavy external redirects
                                </div>
                                <div className="flex items-center gap-3 text-sm text-red-500 font-medium font-bold">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    No local job-tracking or scheduling
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">SEO & Local Authority</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                While visible, the site lacks the aggressive Local Business Schema and semantic structures needed to dominate high-intent keywords like "architectural blueprints Ashburn".
                            </p>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-sm text-orange-500 font-medium font-bold">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    Under-optimized Local Listings
                                </div>
                                <div className="flex items-center gap-3 text-sm text-red-500 font-medium">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    Static content without AI-indexability
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm md:col-span-2">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 w-full bg-slate-100 rounded-2xl p-6 border border-slate-200">
                                    <p className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest text-center md:text-left">Bridging The Gap</p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Accomplishes</span>
                                            <span className="text-emerald-600 font-medium tracking-wide">Contact info, Corporate tie-in</span>
                                        </div>
                                        <div className="h-px bg-slate-200 w-full"></div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Analyzed Need</span>
                                            <span className="text-red-600 font-medium tracking-wide">Interactive quotes, Hyper-local SEO</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="font-bold text-slate-900 mb-2">Our Objective</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        To transition PostNet Ashburn from a "Corporate Outpost" to the preferred "Local Business Partner" through elite technology and high-conversion UX.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Proposed Improvements */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                        <span className="w-8 h-1 bg-red-600 rounded-full"></span>
                        Our Strategic Plan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Stunning Modern UI',
                                desc: 'A complete visual overhaul utilizing glassmorphism, dynamic dark/light modes, and slick micro-animations that make browsing your services a delightful experience.',
                                icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                            },
                            {
                                title: 'Conversion-Driven UX',
                                desc: 'Implementing inline smart forms, localized quoting capabilities, and clear direct pathways for printing, shipping, and mailbox inquiries without bouncing the user out.',
                                icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                            },
                            {
                                title: 'Advanced Local SEO',
                                desc: 'Deep integration of IndexNow, comprehensive local business schema, dynamic sitemaps, and optimized metadata tailored exclusively to capture the Ashburn market.',
                                icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-red-300 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-100 transition-all">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Solving Business Challenges */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                        <span className="w-8 h-1 bg-red-600 rounded-full"></span>
                        Solving Your Core Challenges
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0">🎨</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Redesign Existing Website</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        We've evolved your presence from a static corporate template into a custom-branded local masterpiece. By implementing glassmorphism, fluid micro-animations, and a curated color palette, your site now feels as premium as the services you provide.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0">⚙️</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Automate My Business</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Manual coordination via endless emails is a thing of the past. Our multi-step interactive modals for Print Orders and Drop-offs collect all necessary data upfront, reducing administrative overhead and speeding up fulfillment.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0">🛒</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">E-commerce / Online Store</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        We've transformed your service brochure into an active storefront. The smart product catalog allows users to price, tailor, and initiate orders directly, bringing the "Amazon convenience" to your local Ashburn business center.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0">📈</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Get More Customers</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Visibility isn't enough—conversion is key. By combining advanced Local SEO (IndexNow, Schema) with friction-free "Get a Quote" funnels, we've optimized your site to capture high-intent traffic and convert them into loyal clients.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Roadmap / Vision */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                        <span className="w-8 h-1 bg-red-600 rounded-full"></span>
                        The Vision: Future Roadmap
                    </h2>
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
                        <p className="text-slate-600 mb-12 max-w-3xl leading-relaxed">
                            While this prototype demonstrates the power of a single-page interactive experience, it is only the foundation. Our goal is to move your business completely into the digital age with a robust, scalable ecosystem.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[
                                {
                                    title: "Full Digital Ecosystem",
                                    desc: "Transitioning from a prototype to a full multi-page application with dedicated, SEO-optimized landing pages for every specialized service you offer.",
                                    icon: "🌐"
                                },
                                {
                                    title: "Customer Portal & CRM",
                                    desc: "A secure member area where clients can save their info, manage order history, and re-order their favorite prints with a single click.",
                                    icon: "🔐"
                                },
                                {
                                    title: "Retention Marketing",
                                    desc: "Automated email campaigns and loyalty programs integrated directly into the platform to keep Ashburn locals coming back.",
                                    icon: "✉️"
                                },
                                {
                                    title: "Operational Command Center",
                                    desc: "A custom Content Management System for your team to handle orders, update pricing, and manage site content without any technical hurdles.",
                                    icon: "📊"
                                },
                                {
                                    title: "Pro-Design Tooling",
                                    desc: "Integrated utilities for image cropping and DPI validation, ensuring every client file is ready for perfect printing the moment it hits your queue.",
                                    icon: "📐"
                                },
                                {
                                    title: "AI-Powered Efficiency",
                                    desc: "We'll identify your team's most exhausting daily tasks and build custom AI agents to automate them, removing the burden of repetitive work.",
                                    icon: "🤖"
                                }
                            ].map((item, i) => (
                                <div key={i} className="relative group">
                                    <div className="text-3xl mb-4">{item.icon}</div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-red-600 rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-rose-600 to-red-800"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Presence?</h2>
                        <p className="text-red-100 max-w-2xl mx-auto mb-10 text-lg">
                            Whether you want to drive more local foot traffic, increase your corporate printing contracts, or just modernize your brand, we're here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="https://swot-up.com/consultation" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <button className="w-full px-8 py-4 rounded-xl bg-white text-red-700 font-bold hover:bg-slate-50 transition-colors shadow-lg shadow-black/10">
                                    Book a Consultation
                                </button>
                            </a>
                            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-800 text-white font-bold border border-red-500 hover:bg-red-900 transition-colors">
                                Request an Estimate
                            </button>
                            <a href="https://swot-up.com/contact" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <button className="w-full px-8 py-4 rounded-xl text-red-100 font-bold hover:text-white transition-colors">
                                    Contact Us
                                </button>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
