const YOUTUBE_SHORTS = [
  { id: 'qk3sBFK7b1A', url: 'https://www.youtube.com/shorts/qk3sBFK7b1A' },
  { id: 'z7OrgqEuiS4', url: 'https://www.youtube.com/shorts/z7OrgqEuiS4' },
  { id: 'QW1x7LBPPCg', url: 'https://www.youtube.com/shorts/QW1x7LBPPCg' },
  { id: 'RyQuML1goTM', url: 'https://www.youtube.com/shorts/RyQuML1goTM' },
]

export function VideoShortsSection({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Video giới thiệu</h2>
        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Xem video thực tế quá trình thi công và sản phẩm</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {YOUTUBE_SHORTS.map((video) => (
          <div
            key={video.id}
            className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-100">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={`Video giới thiệu ${video.id}`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-center text-xs font-medium text-amber-950 transition-colors hover:text-amber-950 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Xem trên YouTube →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
