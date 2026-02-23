import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import testimonials from "../../testimonials";
import { Card, CardContent } from "./ui/card";

export default function RegisterApresentation() {
  return (
    <div className="w-full h-full bg-[url('/images/black-bg.png')] bg-cover p-12 flex justify-center max-xl:flex-col">
      <div className="max-xl:flex max-xl:justify-center">
        <Image src="/images/logo.png" width={80} height={80} alt="logo" />
      </div>
      <div className="w-2/3 max-xl:w-full max-xl:mt-8 h-max m-auto flex items-center flex-col justify-center">
        <h1 className="text-4xl text-center font-bold text-white">
          Take care of your health with Health Food.
        </h1>
        <p className="text-white/70 mt-4">Find everything your health needs.</p>
        <div className="mt-20 w-full mx-auto max-xl:px-4">
          <Carousel>
            <CarouselContent>
              {testimonials?.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div>
                    <Card className="bg-zinc-800 text-white border-none p-8 max-xl:p-4 cursor-pointer">
                      <CardContent>
                        <div>
                          <p>{testimonial.text}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="rounded-full overflow-hidden">
                            <Image
                              src={testimonial.image}
                              width={60}
                              height={60}
                              alt={`${testimonial.person}-image`}
                            />
                          </div>
                          <div>
                            <p>{testimonial.person}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
