import ClipLuxScroll from "@/components/ClipLuxScroll";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Introduction / Hero (Optional, can be part of the scroll component or separate) */}
            <section className="h-screen flex items-center justify-center bg-white sticky top-0 -z-10">
                <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.2em] text-black/40 mb-4">Introducing</p>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">ClipLux</h1>
                    <div className="animate-bounce mt-10">
                        <span className="text-xs text-black/30">Scroll to Explore</span>
                    </div>
                </div>
            </section>

            <ClipLuxScroll />

            {/* Footer / CTA Area */}
            <section className="h-[50vh] bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Experience Perfection.</h2>
                    <button className="px-8 py-3 bg-black text-white rounded-full text-sm hover:scale-105 transition-transform">
                        Pre-order Now
                    </button>
                </div>
            </section>
        </main>
    );
}
