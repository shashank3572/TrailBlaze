import React, { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";


export default function RoadmapFlow({ sections, highlight = false }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-6">

      {sections.map((step, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`relative border border-gray-700 rounded-xl p-5 shadow-md bg-neutral-900 transition-all ${
              highlight && index === 0 ? "border-blue-500 shadow-blue-500/50" : ""
            }`}
          >
            {/* Arrow connector */}
            {index !== sections.length - 1 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-1 h-6 bg-gray-700 rounded-b"></div>
            )}

            {/* Header Row */}
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h3 className="text-xl font-semibold text-blue-400">
                {step.title}
              </h3>

              {isOpen ? (
                <FiChevronDown className="text-gray-300 text-2xl" />
              ) : (
                <FiChevronRight className="text-gray-300 text-2xl" />
              )}
            </div>

            {/* Collapsible Content */}
            {isOpen && (
              <div className="mt-4 pl-2 border-l border-gray-700 space-y-3">
                {step.items.map((item, i) => (
                  <div key={i} className="text-gray-300">
                    {typeof item === "string" ? (
                      <li>{item}</li>
                    ) : (
                      <li>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {item.text}
                        </a>
                      </li>
                    )}
                  </div>
                ))}

                {step.resource && (
                  <div className="mt-3">
                    <a
                      href={step.resource}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 underline hover:text-green-300"
                    >
                      Recommended Resource →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
