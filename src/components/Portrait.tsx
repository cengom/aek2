import Image from "next/image";
import { site } from "@/site.config";

export function Portrait({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="absolute -left-10 top-10 aspect-square w-[85%] rounded-full bg-gold md:-left-14" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink">
        {site.portrait ? (
          <Image
            src={site.portrait}
            alt={`Av. ${site.lawyerName}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-end justify-start p-8">
            <span className="text-[7rem] font-extrabold leading-none text-gold md:text-[9rem]">AEK</span>
          </div>
        )}
      </div>
    </div>
  );
}
