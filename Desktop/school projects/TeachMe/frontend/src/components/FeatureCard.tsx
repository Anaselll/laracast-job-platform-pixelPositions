type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
  bgColor: string;
};

const FeatureCard = ({
  title,
  description,
  image,
  bgColor,
}: FeatureCardProps) => {
  return (
    <div className={`rounded-2xl p-6 text-white ${bgColor} w-64 h-64 shadow-lg`}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <img src={image} alt={title} className="w-full" />
    </div>
  );
};

export default FeatureCard;
