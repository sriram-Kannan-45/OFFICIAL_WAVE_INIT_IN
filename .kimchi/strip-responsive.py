import re

def strip_responsive(content):
    # Remove multiple breakpoint chains (keep largest)
    replacements = [
        (r'px-4\s+sm:px-6\s+lg:px-8', 'px-8'),

        (r'text-4xl\s+md:text-5xl\s+lg:text-6xl', 'text-6xl'),
        (r'text-4xl\s+sm:text-5xl\s+md:text-6xl\s+lg:text-7xl\s+xl:text-8xl', 'text-8xl'),
        (r'text-7xl\s+md:text-9xl', 'text-9xl'),
        (r'text-3xl\s+md:text-4xl', 'text-4xl'),
        (r'text-2xl\s+md:text-3xl', 'text-3xl'),
        (r'text-xl\s+md:text-2xl', 'text-2xl'),
        (r'text-lg\s+md:text-xl', 'text-xl'),
        (r'text-base\s+md:text-lg', 'text-lg'),
        (r'text-base\s+sm:text-lg\s+md:text-xl', 'text-xl'),
        (r'text-sm\s+md:text-base', 'text-base'),
        (r'text-base\s+sm:text-lg', 'text-lg'),
        (r'text-sm\s+md:text-lg', 'text-lg'),

        (r'py-16\s+md:py-24', 'py-24'),
        (r'py-8\s+md:py-12', 'py-12'),
        (r'py-20\s+md:py-32', 'py-32'),
        (r'py-16\s+md:py-20', 'py-20'),
        (r'p-5\s+md:p-6', 'p-6'),
        (r'px-5\s+md:px-6', 'px-6'),
        (r'pb-5\s+md:pb-6', 'pb-6'),
        (r'p-4\s+md:p-6', 'p-6'),
        (r'p-6\s+md:p-8', 'p-8'),

        (r'grid-cols-1\s+lg:grid-cols-2', 'grid-cols-2'),
        (r'grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-4', 'grid-cols-4'),
        (r'grid-cols-1\s+md:grid-cols-3', 'grid-cols-3'),
        (r'grid-cols-2\s+md:grid-cols-4', 'grid-cols-4'),
        (r'grid-cols-1\s+md:grid-cols-2', 'grid-cols-2'),
        (r'grid-cols-1\s+sm:grid-cols-2', 'grid-cols-2'),

        (r'gap-6\s+md:gap-8', 'gap-8'),
        (r'gap-4\s+md:gap-6', 'gap-6'),
        (r'gap-12\s+lg:gap-20', 'gap-20'),
        (r'gap-12\s+lg:gap-16', 'gap-16'),
        (r'gap-10\s+lg:gap-8', 'gap-8'),
        (r'gap-6\s+md:gap-10', 'gap-10'),

        (r'flex-col\s+sm:flex-row', 'flex-row'),
        (r'flex-col\s+md:flex-row', 'flex-row'),

        (r'hidden\s+lg:flex', 'flex'),
        (r'hidden\s+lg:block', 'block'),

        (r'\s+lg:hidden', ''),
        (r'\s+md:hidden', ''),
        (r'\s+sm:hidden', ''),

        (r'md:w-1/2', 'w-1/2'),
        (r'md:ml-0', 'ml-0'),
        (r'md:pr-10', 'pr-10'),
        (r'md:pl-10', 'pl-10'),
        (r'md:text-left', 'text-left'),
        (r'md:text-right', 'text-right'),
        (r'md:flex-row-reverse', 'flex-row-reverse'),
        (r'md:flex-row', 'flex-row'),
        (r'md:flex', 'flex'),
        (r'md:items-center', 'items-center'),
        (r'md:left-1/2', 'left-1/2'),
        (r'md:-translate-x-px', '-translate-x-px'),
        (r'md:-translate-x-1/2', '-translate-x-1/2'),
        (r'md:mb-0', 'mb-0'),
        (r'md:min-h-\[260px\]', 'min-h-[260px]'),
        (r'md:mb-3', 'mb-3'),
        (r'md:overflow-visible', 'overflow-visible'),
        (r'md:snap-none', 'snap-none'),
        (r'md:w-\[360px\]', 'w-[360px]'),

        (r'md:p-8', 'p-8'),
        (r'md:p-6', 'p-6'),
        (r'md:p-4', 'p-4'),
        (r'md:p-3', 'p-3'),
        (r'md:py-24', 'py-24'),
        (r'md:py-20', 'py-20'),
        (r'md:py-12', 'py-12'),
        (r'md:px-8', 'px-8'),
        (r'md:px-6', 'px-6'),
        (r'md:pb-6', 'pb-6'),
        (r'md:gap-5', 'gap-5'),
        (r'md:gap-8', 'gap-8'),
        (r'md:text-9xl', 'text-9xl'),
        (r'md:text-6xl', 'text-6xl'),
        (r'md:text-5xl', 'text-5xl'),
        (r'md:text-4xl', 'text-4xl'),
        (r'md:text-3xl', 'text-3xl'),
        (r'md:text-2xl', 'text-2xl'),
        (r'md:text-xl', 'text-xl'),
        (r'md:text-lg', 'text-lg'),
        (r'md:text-base', 'text-base'),

        (r'sm:flex-row', 'flex-row'),
        (r'sm:grid-cols-2', 'grid-cols-2'),
        (r'sm:text-lg', 'text-lg'),
        (r'sm:px-6', 'px-6'),
        (r'sm:text-5xl', 'text-5xl'),

        (r'lg:grid-cols-2', 'grid-cols-2'),
        (r'lg:grid-cols-4', 'grid-cols-4'),
        (r'lg:grid-cols-5', 'grid-cols-5'),
        (r'lg:text-6xl', 'text-6xl'),
        (r'lg:text-7xl', 'text-7xl'),
        (r'lg:text-5xl', 'text-5xl'),
        (r'lg:col-span-2', 'col-span-2'),
        (r'lg:col-span-3', 'col-span-3'),
        (r'lg:px-8', 'px-8'),
        (r'lg:gap-20', 'gap-20'),
        (r'lg:gap-16', 'gap-16'),
        (r'lg:text-left', 'text-left'),
        (r'lg:flex-col', 'flex-col'),
        (r'lg:flex', 'flex'),
        (r'lg:items-start', 'items-start'),

        (r'xl:text-8xl', 'text-8xl'),
    ]

    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)

    # Clean up double spaces (but preserve indentation)
    # Only collapse multiple spaces to single within lines
    lines = content.split('\n')
    cleaned = []
    for line in lines:
        stripped = line.lstrip()
        indent = line[:len(line) - len(stripped)]
        cleaned_line = re.sub(r' {2,}', ' ', stripped)
        cleaned.append(indent + cleaned_line)
    content = '\n'.join(cleaned)

    return content

files = [
    'wave-init/client/src/pages/LMSPortal.jsx',
    'wave-init/client/src/components/sections/LMSShowcase.jsx',
]

for f in files:
    with open(f, 'r') as fh:
        content = fh.read()
    new_content = strip_responsive(content)
    with open(f, 'w') as fh:
        fh.write(new_content)
    print(f'Stripped responsive classes from {f}')
