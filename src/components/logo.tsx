import { cn } from "@/lib/utils";
import Image from "next/image";

const BRAND = {
  inline: {
    src: "/branding/inline.png",
    width: 640,
    height: 160,
  },
  full: {
    src: "/branding/full-logo.png",
    width: 720,
    height: 200,
  },
  mark: {
    src: "/branding/logo.png",
    width: 256,
    height: 256,
  },
} as const;

const SIZE_CLASS = {
  header: "h-11 w-auto sm:h-12",
  footer: "h-8 w-auto sm:h-9",
  default: "h-10 w-auto",
  mark: "h-9 w-9 sm:h-10 sm:w-10",
} as const;

type LogoVariant = keyof typeof BRAND;
type LogoSize = keyof typeof SIZE_CLASS;

type LogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  showTagline?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "inline",
  size = "default",
  showTagline = false,
  className,
  priority = false,
}: LogoProps) {
  const asset = BRAND[variant];
  const imageSize = variant === "mark" ? "mark" : size;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Image
        src={asset.src}
        alt="LicenSquare"
        width={asset.width}
        height={asset.height}
        priority={priority}
        className={cn("object-contain object-left", SIZE_CLASS[imageSize])}
      />
      {showTagline && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Your License. Our Expertise.
        </p>
      )}
    </div>
  );
}
