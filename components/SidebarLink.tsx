import React from "react";

interface SidebarLinkProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  active?: boolean;
}

function SidebarLink({ Icon, text, active }: SidebarLinkProps) {
  return (
    <li
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl 
    space-x-3 hoverAnimation mt-auto mb-[18px] mx-auto
    `}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}

export default SidebarLink;
