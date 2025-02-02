import { StarIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
}

interface ProjectCardProps {
  repo: Repo;
}

const ProjectCard = ({ repo }: ProjectCardProps) => {
  return (
    <a
      href={repo.html_url}
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

        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics?.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <StarIcon className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CodeBracketIcon className="w-4 h-4" />
            <span>{repo.forks_count}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-300 to-pink-200 opacity-80" />
      </div>
    </a>
  );
};

export default ProjectCard;
