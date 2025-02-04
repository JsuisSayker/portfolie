"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


import SectionTitle from '@/components/sectionTitle';
import ProjectCard from '../components/projectCard';
import { GetPinnedRepositories, PinnedRepositoryData } from "@/components/github/githubQuery";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const [repositories, setRepositories] = useState<PinnedRepositoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({ query: GetPinnedRepositories }),
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const { data } = await response.json();
        const repos = data.viewer.pinnedItems.nodes.map((node: any) => ({
          ...node,
          id: node.url,
          repositoryTopics: {
            edges: node.repositoryTopics.edges.map((edge: any) => ({
              node: {
                topic: {
                  name: edge.node.topic.name
                }
              }
            }))
          }
        }));

        setRepositories(repos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100">
        <title>Killian Trouvé - Japan-Themed Portfolio</title>
        <section className="h-screen flex items-center justify-center relative">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4 animate-fade-in">
            雫 <span className="text-4xl md:text-6xl">(Shizuku)</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Killian Trouvé
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mt-2">
            Developer & Anime Enthusiast
          </p>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4 md:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="About Me" />
          <div className={`mt-8 transition-opacity duration-500 ${aboutInView ? 'opacity-100' : 'opacity-0'}`}>
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

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8 bg-white bg-opacity-50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <SectionTitle title="Pinned Projects" />

            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading projects...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-8 text-red-600">
                Error: {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {repositories.map((repo) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </div>
        </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p>✨ ありがとうございます！ - Thank you for visiting! ✨</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://github.com/JsuisSayker"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="https://linkedin.com/in/killian-trouvé"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="mailto:killian.trouve@orange.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-600 transition-colors"
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  );
  }

