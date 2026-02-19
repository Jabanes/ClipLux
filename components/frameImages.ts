// Auto-generated imports for frames using require.context
const frameContext = require.context('@/assets/frames', false, /\.(png|jpe?g|svg)$/);

export const frames = frameContext.keys()
    .sort((a: string, b: string) => {
        // Natural sort order for filenames like frame-1, frame-2, frame-10
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map((key: string) => frameContext(key).default);
