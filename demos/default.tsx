import { ParallaxComponent } from '@/components/ui/parallax-scrolling';

export default function ParallaxDemo() {
  return (
    <>
      <ParallaxComponent />
      <div className="bg-zinc-950 px-6 py-8 text-center text-sm text-zinc-400">
        <p>
          Resource by{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.osmo.supply/"
            className="font-medium text-white underline-offset-4 hover:underline"
          >
            Osmo
          </a>
        </p>
      </div>
    </>
  );
}
