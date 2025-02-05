import Image from 'next/image';

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      <div className="relative">
        <div className="absolute -left-8 -top-4 w-12 h-12">
          <Image
            src="/sakura-petal.png"
            alt="Sakura"
            width={48}
            height={48}
            className="opacity-70"
          />
        </div>
        <h2 className="text-4xl font-bold text-red-600 relative z-10">
          {title}
        </h2>
      </div>
      <div className="mt-4 h-1 w-24 bg-gradient-to-r from-red-400 to-pink-300 rounded-full" />
      <p className="mt-2 text-gray-600 text-sm">• プロジェクト •</p>
    </div>
  );
};
