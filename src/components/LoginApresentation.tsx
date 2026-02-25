import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import testimonials from "../../testimonials";
import { Card, CardContent } from "./ui/card";

export default function LoginApresentation() {
  return (
    <div className="w-full h-full bg-[url('/images/black-bg.png')] bg-cover p-12 flex justify-center max-xl:flex-col">
      <div className="max-xl:flex max-xl:justify-center">
        <Image src="/images/logo.png" width={80} height={80} alt="logo" />
      </div>
      <div className="w-2/3 max-xl:w-full max-xl:mt-8 h-max m-auto flex items-center flex-col justify-center">
        <h1 className="text-4xl text-center font-bold text-white">
          Welcome Back!
        </h1>
        <p className="text-white/70 mt-4 text-center">
          Log in to your account to find everything your health needs.
        </p>
      </div>
    </div>
  );
}
