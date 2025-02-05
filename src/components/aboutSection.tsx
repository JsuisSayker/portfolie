import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

import SectionTitle from '@/components/sectionTitle';


interface AboutSectionProps {
    aboutRef: (node?: Element | null) => void;
    aboutInView: boolean;
}

export default function AboutSection(aboutSectionProps: AboutSectionProps) {
    return (
    <section ref={aboutSectionProps.aboutRef} className="py-20 px-4 md:px-8 relative">
            <div className="max-w-4xl mx-auto">
                <SectionTitle title="About Me" />
                <div className={`mt-8 transition-opacity duration-500 ${aboutSectionProps.aboutInView ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-lg text-gray-700 leading-relaxed">
                    こんにちは！ I'm Killian, a developer with a passion for Japanese culture and
                    anime. With 3+ years of experience in web development, I combine technical expertise
                    with creative design to build immersive digital experiences. When I'm not coding,
                    you'll find me watching the latest seasonal anime or practicing Japanese.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-24 justify-center">
                    <a
                    href="/Killian_Trouvé_CV.pdf"
                    download
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                    >
                    <span className="text-lg">Download CV</span>
                    <FontAwesomeIcon icon={faFileArrowDown} />
                    </a>
                    <a
                    href="https://linkedin.com/in/killian-trouvé"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                    >
                    <span className="text-lg">LinkedIn Profile</span>
                    <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                    href="mailto:killian.trouve@orange.fr"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                    >
                    <span className="text-lg">Email</span>
                    <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
                </div>
            </div>
            </section>
    )
}