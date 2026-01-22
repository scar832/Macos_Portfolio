import { useState, useEffect, useRef } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import emailjs from '@emailjs/browser';
import {
    Mail, MapPin, Phone, Send, CheckCircle2, Copy,
    Github, Linkedin, Twitter, MessageSquare, ExternalLink, Sparkles, AlertCircle
} from "lucide-react";

const Contact = () => {
    const formRef = useRef();
    const [copied, setCopied] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [messageSent, setMessageSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);


    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // EmailJS configuration
            // Replace these with your actual EmailJS credentials
            const serviceID = 'YOUR_SERVICE_ID';  // Get from EmailJS dashboard
            const templateID = 'YOUR_TEMPLATE_ID'; // Get from EmailJS dashboard
            const publicKey = 'YOUR_PUBLIC_KEY';   // Get from EmailJS dashboard

            const result = await emailjs.sendForm(
                serviceID,
                templateID,
                formRef.current,
                publicKey
            );

            if (result.text === 'OK') {
                setMessageSent(true);
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (err) {
            console.error('EmailJS Error:', err);
            setError('Failed to send message. Please try again or email me directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            label: "Email",
            value: "sedemboafo@gmail.com",
            action: "mailto:sedemboafo@gmail.com",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Accra, Ghana",
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            icon: Phone,
            label: "Work Phone",
            value: "+233 591832973",
            color: "text-purple-600",
            bg: "bg-purple-50"

        }
    ];

    const socialLinks = [
        { name: "GitHub", icon: Github, url: "https://github.com/scar832", color: "hover:bg-slate-800/40 border-slate-500/30" },
        { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/boafo-joel", color: "hover:bg-blue-600/40 border-blue-500/30" },
        { name: "Twitter", icon: Twitter, url: "https://twitter.com/boafojoel", color: "hover:bg-sky-500/40 border-sky-400/30" },
        { name: "WhatsApp", icon: MessageSquare, url: "https://wa.me/233123456789", color: "hover:bg-green-500/40 border-green-400/30" }
    ];

    return (
        <div className="flex flex-col h-full font-georama overflow-hidden">
            <div id="window-header">
                <WindowControls target="contact" />
                <h2 className="font-bold text-[11px] uppercase tracking-widest text-slate-500 flex-1 text-center">
                    Connect — Contact Me
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-black/40 backdrop-blur-3xl backdrop-saturate-150">

                {/* 1. HERO SECTION */}
                <div className="text-center mb-13">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-green-500/20">
                        <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                        Available for Opportunities
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-5 drop-shadow-sm">Let's build something.</h1>
                    <p className="text-white text-sm max-w-sm mx-auto leading-relaxed">
                        I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </div>

                {/* 2. CONTACT METHOD CARDS */}
                <div className="grid grid-cols-3 gap-4 mb-10">

                    {contactMethods.map((method, idx) => (
                        <div
                            key={idx}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`${method.bg} ${method.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                                <method.icon size={20} />
                            </div>
                            <p className="text-xs text-slate-500 mb-1">{method.label}</p>
                            <p className="text-sm font-semibold text-slate-900">{method.value}</p>
                            {method.action && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyToClipboard(method.value, method.label);
                                    }}
                                    className="mt-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    {copied === method.label ? (
                                        <>
                                            <CheckCircle2 size={12} /> Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={12} /> Copy
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* 3. SOCIAL LINKS (Moved Above Form) */}
                <div className="mb-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Professional Network</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {socialLinks.map((social, idx) => (
                            <a
                                key={idx} href={social.url} target="_blank" rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-3 bg-white/20 backdrop-blur-md border rounded-2xl transition-all duration-300 hover:scale-[1.03] group ${social.color}
                                ${social.name === "WhatsApp" ? "bg-green-500/20 border-green-500/20" : ""}`}
                                style={{ pointerEvents: 'auto' }}
                            >
                                <social.icon size={20} className="text-white" />
                                <span className="text-xs font-bold text-white">{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* 4. MESSAGE FORM */}
                <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/40 shadow-2xl relative overflow-hidden mb-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><Send size={18} /></div>
                        <h3 className="text-lg font-bold text-slate-800">Quick Message</h3>
                    </div>

                    {messageSent ? (
                        <div className="text-center py-10 animate-in zoom-in duration-500">
                            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                            <h4 className="text-xl font-bold text-slate-900">Message Sent!</h4>
                            <p className="text-slate-500 text-sm mb-4">I'll respond within 24 hours.</p>
                            <button
                                onClick={() => setMessageSent(false)}
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form ref={formRef} className="space-y-4" style={{ pointerEvents: 'auto' }} onSubmit={handleSubmit}>
                            {error && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Full Name"
                                    className="contact-input"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Email Address"
                                    className="contact-input"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <textarea
                                name="message"
                                placeholder="Tell me about your project..."
                                rows={4}
                                className="contact-input resize-none"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} /> Send via Secure Line
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const ContactCard = ({ icon: Icon, label, value, onCopy, isCopied }) => (
    <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-4 border border-white/40 hover:bg-white/50 transition-all group">
        <Icon size={18} className="text-slate-400 mb-2" />
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter mb-1">{label}</p>
        <p className="text-xs font-bold text-slate-800 truncate">{value}</p>
        {onCopy && (
            <button onClick={onCopy} className="mt-2 text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                {isCopied ? <><CheckCircle2 size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
            </button>
        )}
    </div>
);

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;