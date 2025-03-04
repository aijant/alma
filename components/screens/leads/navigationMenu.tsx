"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlmaIcon from "@/components/ui/icons/alma";

const NavigationMenu = () => {
  const router = useRouter();
  const [active, setActive] = useState<"Leads" | "Settings">("Leads");

  const handleNavigation = (section: "Leads" | "Settings") => {
    setActive(section);
    router.push(`/${section.toLowerCase()}`);
  };

  return (
    <div className="w-64 h-screen bg-gray-100 flex flex-col justify-between relative">
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-yellow-200 to-transparent clip-corner"></div>
      <div className="p-6 relative z-10">
        <AlmaIcon className="w-12 sm:w-16 mb-5" />
        <nav>
          <ul className="space-y-0 mt-10">
            {(["Leads", "Settings"] as const).map((section) => (
              <li key={section}>
                <Button
                  variant="light"
                  className={`w-full justify-start ${active === section ? "font-bold" : ""}`}
                  onClick={() => handleNavigation(section)}
                >
                  {section}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Админ-раздел */}
      <div className="p-6 relative z-10">
        <Button variant="light" className="w-full justify-start font-bold">
          <span className="rounded-full bg-[#e2e4e9] p-[6px]">A</span> Admin
        </Button>
      </div>
    </div>
  );
};

export default NavigationMenu;
