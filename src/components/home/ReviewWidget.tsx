"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";

// Sample reviews (will come from DB in production)
const publicReviews = [
  {
    id: 1,
    name: "M. Dlamini",
    rating: 5,
    text: "Dr Ngutshane was exceptional throughout my bypass surgery. His calm, clear communication made a stressful time much more manageable.",
    date: "March 2024",
  },
  {
    id: 2,
    name: "P. van der Merwe",
    rating: 5,
    text: "Thorough, professional and genuinely caring. Follow-up has been excellent.",
    date: "January 2024",
  },
  {
    id: 3,
    name: "A. Khumalo",
    rating: 5,
    text: "Referred by my cardiologist and I could not be happier. World-class care right here in Gauteng.",
    date: "November 2023",
  },
];

export default function ReviewWidget() {
  const [feedbackStep, setFeedbackStep] = useState<"idle" | "ask" | "negative" | "done">("idle");
  const [negMsg, setNegMsg] = useState("");

  const handlePositive = () => {
    const url = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_REVIEW_URL || "#";
    window.open(url, "_blank");
    setFeedbackStep("done");
  };

  const handleNegativeSubmit = async () => {
    // In production: POST to /api/feedback with negMsg
    toast.success("Your feedback has been received privately. We will follow up shortly.");
    setFeedbackStep("done");
  };

  return (
    <section className="bg-[#F4F7FC] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">Patient Feedback</p>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A1628] font-bold">
            Patient Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {publicReviews.map((r) => (
            <div key={r.id} className="bg-white p-8 border border-[#DDE3EE]">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                ))}
              </div>
              <p className="text-[#0A1628] text-sm leading-relaxed mb-5 italic">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center justify-between text-xs text-[#6B7A99]">
                <span className="font-medium">{r.name}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback widget */}
        <div className="max-w-lg mx-auto text-center">
          {feedbackStep === "idle" && (
            <div className="bg-white border border-[#DDE3EE] p-8">
              <p className="text-[#0A1628] font-display text-xl mb-2">Were you a patient of Dr Ngutshane?</p>
              <p className="text-[#6B7A99] text-sm mb-6">Your feedback matters to us.</p>
              <button
                onClick={() => setFeedbackStep("ask")}
                className="px-6 py-3 bg-[#0A1628] text-white text-sm rounded-sm hover:bg-[#122040] transition-colors"
              >
                Leave Feedback
              </button>
            </div>
          )}

          {feedbackStep === "ask" && (
            <div className="bg-white border border-[#DDE3EE] p-8">
              <p className="text-[#0A1628] font-display text-xl mb-6">How was your experience?</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handlePositive}
                  className="flex flex-col items-center gap-2 px-8 py-5 border border-[#DDE3EE] hover:border-[#C9A84C] rounded-sm transition-colors group"
                >
                  <ThumbsUp size={24} className="text-[#6B7A99] group-hover:text-[#C9A84C] transition-colors" />
                  <span className="text-sm text-[#6B7A99]">Positive</span>
                </button>
                <button
                  onClick={() => setFeedbackStep("negative")}
                  className="flex flex-col items-center gap-2 px-8 py-5 border border-[#DDE3EE] hover:border-[#0A1628] rounded-sm transition-colors group"
                >
                  <ThumbsDown size={24} className="text-[#6B7A99] group-hover:text-[#0A1628] transition-colors" />
                  <span className="text-sm text-[#6B7A99]">Needs Improvement</span>
                </button>
              </div>
            </div>
          )}

          {feedbackStep === "negative" && (
            <div className="bg-white border border-[#DDE3EE] p-8 text-left">
              <p className="text-[#0A1628] font-display text-xl mb-2">We&apos;re sorry to hear that.</p>
              <p className="text-[#6B7A99] text-sm mb-5">
                Please share your concerns privately — our practice manager will follow up personally.
              </p>
              <textarea
                rows={4}
                value={negMsg}
                onChange={(e) => setNegMsg(e.target.value)}
                placeholder="Describe your experience..."
                className="w-full border border-[#DDE3EE] rounded-sm p-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] resize-none mb-4"
              />
              <button
                onClick={handleNegativeSubmit}
                className="w-full py-3 bg-[#0A1628] text-white text-sm rounded-sm hover:bg-[#122040] transition-colors"
              >
                Submit Privately
              </button>
            </div>
          )}

          {feedbackStep === "done" && (
            <div className="bg-white border border-[#C9A84C] p-8 text-center">
              <p className="font-display text-xl text-[#0A1628] mb-2">Thank you for your feedback.</p>
              <p className="text-[#6B7A99] text-sm">We value every patient experience.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
