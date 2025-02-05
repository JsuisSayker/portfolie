import { PinnedRepositoryData } from "./github/githubQuery";
import ProjectCard from "./projectCard";
import SectionTitle from "./sectionTitle";


interface ProjectSectionProps {
    repositories: PinnedRepositoryData[];
    loading: boolean;
    error: string | null;
}

export default function ProjectSection(projectSectionProps: ProjectSectionProps) {
    return (
        <section className="py-20 px-4 md:px-8 bg-white bg-opacity-50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
            <SectionTitle title="Pinned Projects" />

            {projectSectionProps.loading && (
                <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading projects...</p>
                </div>
            )}

            {projectSectionProps.error && (
                <div className="text-center py-8 text-red-600">
                Error: {projectSectionProps.error}
                </div>
            )}

            {!projectSectionProps.loading && !projectSectionProps.error && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {projectSectionProps.repositories.map((repo) => (
                    <ProjectCard key={repo.id} repo={repo} />
                ))}
                </div>
            )}
            </div>
        </section>
    )
}