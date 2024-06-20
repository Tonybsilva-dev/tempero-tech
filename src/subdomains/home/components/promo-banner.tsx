import Image from "next/image";

interface BannerItem {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface PromoBannerProps {
  banners: BannerItem[];
}

const PromoBanner = ({ banners }: PromoBannerProps) => {
  return (
    <section className="body-font text-gray-600">
      <div className="container mx-auto flex flex-wrap px-5 py-24">
        <div className="mx-auto w-full lg:w-2/3">
          {banners.length > 0 && (
            <div className="relative mb-4 flex w-full flex-col bg-gray-100 px-6 py-16 sm:flex-row sm:px-10 sm:py-32">
              <Image
                alt={banners[0].alt}
                src={banners[0].src}
                fill
                objectFit="cover"
                className="absolute inset-0 block h-full w-full object-cover object-center"
              />
              <div className="relative z-10 w-full text-center">
                <h2 className="title-font mb-2 text-xl font-medium text-gray-900 sm:text-2xl">
                  {banners[0].title}
                </h2>
                <p className="leading-relaxed">{banners[0].description}</p>
              </div>
            </div>
          )}
          <div className="-mx-2 flex flex-wrap">
            {banners.slice(1).map((banner, index) => (
              <div key={index} className="mb-4 w-full px-2 sm:w-1/2">
                <div className="relative flex w-full flex-col bg-gray-100 px-6 py-16 sm:flex-row sm:px-10 sm:py-24">
                  <Image
                    alt={banner.alt}
                    src={banner.src}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 block h-full w-full object-cover object-center"
                  />
                  <div className="relative z-10 w-full text-center">
                    <h2 className="title-font mb-2 text-lg font-medium text-gray-900 sm:text-xl">
                      {banner.title}
                    </h2>
                    <p className="leading-relaxed">{banner.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
