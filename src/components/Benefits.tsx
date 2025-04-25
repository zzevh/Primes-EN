import {
  faRocket,
  faAward,
  faChartLine,
  faShield,
  faEye,
  faChartBar,
  faBolt,
  faUsers,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Instant results, zero effort",
      description: "Your social media success in record time.",
      icon: <FontAwesomeIcon icon={faRocket} className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Quality You Can Count On",
      description: "Premium services that meet your expectations.",
      icon: <FontAwesomeIcon icon={faAward} className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Your Growth, Our Solutions",
      description: "We help your account grow quickly and effectively.",
      icon: <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Growth Without Compromise",
      description: "Speed, security, and reliability all in one.",
      icon: <FontAwesomeIcon icon={faShield} className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Next-Level Visibility",
      description: "Stand out online and build your community.",
      icon: <FontAwesomeIcon icon={faEye} className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Results That Speak for Themselves",
      description: "Real growth that translates into your success.",
      icon: <FontAwesomeIcon icon={faChartBar} className="w-6 h-6" />
    },
    {
      id: 7,
      title: "Your Brand, Our Strategy",
      description: "Build a strong social media presence effortlessly.",
      icon: <FontAwesomeIcon icon={faBolt} className="w-6 h-6" />
    },
    {
      id: 8,
      title: "Online Success Starts Here",
      description: "Professional support for your account growth.",
      icon: <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
    },
    {
      id: 9,
      title: "Algorithms Will Love You",
      description: "Increase reach and engagement the easy way.",
      icon: <FontAwesomeIcon icon={faStar} className="w-6 h-6" />
    }
  ];
  return (
    <section id="benefits" className="py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-x-20 mb-16">
          <div>
            <span className="text-[#a3fc3b] text-sm uppercase tracking-wider mb-4 block">
            BENEFITS
            </span>
            <h2 className="text-4xl md:text-[42px] font-bold text-white leading-[1.1] max-w-[600px]">
            The best platform for seamless social media development.
            </h2>
          </div>
          <div className="lg:max-w-[500px] mt-6 lg:mt-12">
            <p className="text-gray-300 text-lg leading-relaxed">
            Save time, effort and money while making sure you stand out on social media. Our platform delivers high-quality results, helping your brand reach new heights effortlessly.
            </p>
            <a href="/offers">
              <button className="mt-8 bg-[#a3fc3b] hover:bg-[#8fe032] text-black px-8 py-3 rounded-lg font-medium transition-all duration-300">
              Check All Boosting Services
              </button>
            </a>
          </div>
        </div>

        {/* Benefits Grid with Dividers */}
        <div className="relative grid md:grid-cols-3 gap-x-0 gap-y-16">
          {/* Vertical Dividers */}
          <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-[#B9FD50]/20 hidden md:block" />
          <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-[#B9FD50]/20 hidden md:block" />

          {/* Horizontal Dividers */}
          <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-[#B9FD50]/20 hidden md:block" />
          <div className="absolute left-0 right-0 bottom-1/3 h-[1px] bg-[#B9FD50]/20 hidden md:block" />

          {benefits.map((benefit) => (
            <div key={benefit.id} className="p-8 relative">
              <div className="w-12 h-12 bg-[#a3fc3b] rounded-full flex items-center justify-center text-black mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-white text-xl font-semibold mb-4">
                <span className="text-[#a3fc3b] mr-2">{benefit.id}.</span>
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;