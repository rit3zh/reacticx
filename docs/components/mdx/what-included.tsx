import TemplateGrid from "@/lib/template-grid";

export default function WhatIncluded({
  templateName,
}: {
  templateName: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3 mb-4 pt-12">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mt-2">
          <span>What&apos;s included</span>
        </h3>
        <div className="h-px grow bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      {templateName && <TemplateGrid template={templateName} />}
    </>
  );
}
