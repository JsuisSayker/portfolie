"use client";

import Footer from '@/app/footer'
import AboutSection from '@/components/aboutSection';
import ProjectSection from '@/components/projectSection';

import TokenGeter from './tokenGeter';
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
      const token = await TokenGeter()
      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
    {/* Left Text Content */}
    <div className="text-center space-y-4 md:w-1/2">
      <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4 animate-fade-in">
      <span className="text-4xl md:text-6xl">Killian Trouvé</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mt-2">
        Developer & Anime Enthusiast
      </p>
    </div>

    {/* Right Visual Elements */}
    <div className="relative md:w-1/2 flex justify-right items-right h-[500px]">
      {/* Sakura Tree Icon */}
      <div className="absolute top-0 right-0 -translate-y-20 translate-x-8 md:translate-x-1 z-10">
        <img
          src="/sakura-tree.png"
          alt="Sakura Tree"
          className="w-[600px] md:w-[800px] opacity-80"
        />
      </div>
      {/* Profile Image */}
      <div className="absolute bottom-0 transform translate-y-16 z-10">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-pink-200 hover:border-red-300 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl">
          <a href='https://github.com/JsuisSayker'>
          <img
            src="/github-profile.jpeg"
            alt="Killian Trouvé"
            className="w-full h-full object-cover"
            />
            </a>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
      <AboutSection aboutRef={aboutRef} aboutInView={aboutInView} />

      {/* Projects Section */}
      <ProjectSection repositories={repositories} loading={loading} error={error} />

      {/* Footer */}
      <Footer />
    </div>
  );
  }

