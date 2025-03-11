interface CaseStudyTestimonialProps {
  quote: string
  avatarInitials: string
  avatarBgColor: string
  avatarTextColor?: string
  name: string
  role: string
}

export function CaseStudyTestimonial({
  quote,
  avatarInitials,
  avatarBgColor,
  avatarTextColor = "text-white",
  name,
  role,
}: CaseStudyTestimonialProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
      <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4">"{quote}"</blockquote>
      <div className="flex items-center gap-4">
        <div
          className={`h-12 w-12 rounded-full ${avatarBgColor} flex items-center justify-center ${avatarTextColor} font-bold`}
        >
          {avatarInitials}
        </div>
        <div>
          <p className="font-medium text-[#25282A] dark:text-white">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  )
}

