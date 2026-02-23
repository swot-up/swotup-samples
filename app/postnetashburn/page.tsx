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
                    <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        A comprehensive review of your current online footprint and our strategic proposal to transform your digital experience, driving more local engagement and sales.
                    </p>
                </div>

                {/* Big Prototype Link */}
                <div className="flex justify-center mb-24">
                    <Link href="/postnetashburn/sample" className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold text-white transition-all bg-red-600 rounded-2xl hover:bg-red-700 hover:scale-[1.02] shadow-xl hover:shadow-2xl shadow-red-600/20 overflow-hidden">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        View Your Custom Prototype
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                </div>

                {/* Current State Analysis */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                        <span className="w-8 h-1 bg-red-600 rounded-full"></span>
                        Current Website Analysis
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Design & UX</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                The current website utilizes a highly templated layout. While functional, it lacks a distinct, premium aesthetic that sets Ashburn apart from other locations. Background elements and section transitions can feel abrupt or static.
                            </p>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-sm text-red-500 font-medium">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    Generic corporate feel
                                </div>
                                <div className="flex items-center gap-3 text-sm text-orange-500 font-medium">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    Lack of engaging micro-animations
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Features & Tools</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Current functionality mostly consists of outbound links to the main PostNet tracker or Google Reviews. There is no inline booking system, customized pricing calculator, or dynamic service explorer kept locally on the page.
                            </p>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-sm text-red-500 font-medium">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    Heavy reliance on external redirects
                                </div>
                                <div className="flex items-center gap-3 text-sm text-orange-500 font-medium">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    No native quoting mechanisms
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm md:col-span-2 flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-slate-900 mb-4">SEO & Performance</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    While basic metadata exists, the site misses out on advanced Local Business Schema, deep-level semantic HTML, and automated localized AI indexing tools (like `llms.txt`). The current setup accomplishes basic visibility but lacks the aggressive optimization needed to dominate local search for highly competitive terms like "custom print services Ashburn VA", leaving potential traffic untapped.
                                </p>
                            </div>
                            <div className="flex-1 w-full bg-slate-100 rounded-2xl p-6 border border-slate-200">
                                <p className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">Bridging The Gap</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Accomplishes</span>
                                        <span className="text-emerald-600 font-medium tracking-wide">Contact info, Corporate tie-in</span>
                                    </div>
                                    <div className="h-px bg-slate-200 w-full"></div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Lacks</span>
                                        <span className="text-red-600 font-medium tracking-wide">Interactive quotes, Hyper-local SEO</span>
                                    </div>
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
                            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-red-700 font-bold hover:bg-slate-50 transition-colors shadow-lg shadow-black/10">
                                Book a Consultation
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-800 text-white font-bold border border-red-500 hover:bg-red-900 transition-colors">
                                Request an Estimate
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 rounded-xl text-red-100 font-bold hover:text-white transition-colors">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
