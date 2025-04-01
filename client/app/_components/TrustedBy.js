// components/TrustedBy.js
export default function TrustedBy() {
  const logos = [
    {
      name: "Nike",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
    },
    {
      name: "Dior",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dior_Logo.svg/1200px-Dior_Logo.svg.png",
    },

    {
      name: "Ralph Lauren",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Ralph_Lauren_logo.svg/2560px-Ralph_Lauren_logo.svg.png",
    },
    {
      name: "D&G",
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Dolce_%26_Gabbana.svg",
    },
    {
      name: "Parada",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Prada-Logo.svg/1200px-Prada-Logo.svg.png",
    },
    {
      name: "Hermes",
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Herm%C3%A8s.svg/1200px-Herm%C3%A8s.svg.png",
    },
    {
      name: "Louis Vuitton",
      src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Louis_Vuitton_logo.png",
    },
  ];

  return (
    <div className="my-10">
      <div className="mb-8 text-center">
        <h2 className="text-base font-medium md:text-xl xl:text-3xl text-primary-900 ">
          Trusted by 100+ startups
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-center mt-5 gap-x-12 gap-y-6 lg:gap-x-16 lg:gap-y-8">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.name}
            className="object-contain w-auto h-4 lg:h-5"
          />
        ))}
      </div>
    </div>
  );
}
