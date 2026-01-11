import Image from "next/image";
import Link from "next/link";

type Props = {
  size: number;
  logo: 1 | 2 | 3;
};

const logoImages = {
  1: "/highpixel_one.png",
  2: "/highpixel_two.png",
  3: "/highpixel_three.png",
} as const;

export const Logo = ({ size, logo = 1 }: Props) => {
  return (
    <Link href="/">
      <Image
        src={logoImages[logo]}
        alt="highpixel"
        width={size}
        height={size}
        quality={100}
        className="rounded-full"
      />
    </Link>
  );
};
