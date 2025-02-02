"use client";

import Head from 'next/head';
import SakuraPetal from '../components/sakuraPetal';
import SectionTitle from '@/components/sectionTitle';
import ProjectCard from '../components/projectCard';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Octokit } from "@octokit/core";

import dynamic from 'next/dynamic';


interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      const octokit = new Octokit();
      const { data } = await octokit.request('GET /users/{username}/repos', {
        username: 'JsuisSayker',
      });
      console.log(data)
      const pinned = data.filter(repo => repo.topics);
      setRepos(pinned.slice(0, 6) as Repo[]);
    };

    fetchPinnedRepos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100">
        <title>Killian Trouvé - Japan-Themed Portfolio</title>
        <SakuraPetal />
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
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/Killian_Trouvé_CV.pdf"
                download
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="text-lg">Download CV</span>
                <span className="text-xl">📄</span>
              </a>
              <a
                href="https://linkedin.com/in/killian-trouvé"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="text-lg">LinkedIn Profile</span>
                <span className="text-xl">👔</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Pinned Projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
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
        </div>
      </footer>
    </div>
  );
}
