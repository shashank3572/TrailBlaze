import React from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function RoadmapFlow({ sections }) {
  return (
    <div className="relative flex flex-col items-start">
      {sections.map((step, index) => (
        <div key={index} className="flex items-start relative pl-10 mb-10">

          {/* ✔ Circle Icon */}
          <div className="absolute left-0 top-1">
            <FiCheckCircle className="text-blue-400 text-2xl" />
          </div>

          {/* | Vertical Line */}
          {index !== sections.length - 1 && (
            <div className="absolute left-3 top-8 w-0.5 bg-gray-700 h-full"></div>
          )}

          {/* STEP BOX */}
          <div className="bg-neutral-800 p-5 rounded-xl w-[90%] shadow hover:shadow-xl transition-all border border-neutral-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 mb-3">{step.description}</p>

            {/* Resources */}
            <ul className="space-y-2">
              {step.resources.map((r, i) => (
                <li key={i}>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    ● {r.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
