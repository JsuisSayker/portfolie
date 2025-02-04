import { StarIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { PinnedRepositoryData } from "@/components/github/githubQuery";

interface ProjectCardProps {
  repo: PinnedRepositoryData;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[url('/sakura-petal.png')] bg-repeat" />

      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {repo.name}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {repo.description || "A personal development project"}
        </p>

        {repo.primaryLanguage && (
          <div className="flex items-center mb-4">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: repo.primaryLanguage.color }}
            />
            <span className="text-sm text-gray-500">
              {repo.primaryLanguage.name}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {repo.repositoryTopics.edges.map(({ node }) => (
            <span
              key={node.topic.name}
              className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full"
            >
              {node.topic.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <StarIcon className="w-4 h-4" />
            <span>{repo.stargazerCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CodeBracketIcon className="w-4 h-4" />
            <span>{repo.forkCount}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-300 to-pink-200 opacity-80" />
      </div>
    </a>
  );
}