
export default function Footer() {
    return (
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
    )
}