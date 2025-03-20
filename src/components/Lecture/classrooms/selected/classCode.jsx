import { BiClipboard } from "react-icons/bi";
import { BsClipboardCheck } from "react-icons/bs";
import { useState } from "react";

export default function ClassCode({ code }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="shadow-sm w-[100%] p-2 bg-white rounded-sm flex justify-between items-center">
            <div>
                <h1 className="text-sm text-sky-900">Class Code</h1>
                <span className="font-semibold">{code}</span>
            </div>
            <button onClick={copyToClipboard} className="text-gray-500 hover:text-sky-900">
                {copied ? <BsClipboardCheck size={18} /> : <BiClipboard size={18} />}
            </button>
        </div>
    );
}