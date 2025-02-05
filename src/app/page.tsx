"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


import SectionTitle from '@/components/sectionTitle';
import ProjectCard from '../components/projectCard';
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
      <AboutSection aboutRef={aboutRef} aboutInView={aboutInView} />

      {/* Projects Section */}
      <ProjectSection repositories={repositories} loading={loading} error={error} />

      {/* Footer */}
      <Footer />
    </div>
  );
  }

