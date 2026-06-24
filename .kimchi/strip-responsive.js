const fs = require('fs');

function stripResponsive(str) {
  // Remove multiple breakpoint chains (keep largest)
  str = str.replace(/px-4\s+sm:px-6\s+lg:px-8/g, 'px-8');

  str = str.replace(/text-4xl\s+md:text-5xl\s+lg:text-6xl/g, 'text-6xl');
  str = str.replace(/text-4xl\s+sm:text-5xl\s+md:text-6xl\s+lg:text-7xl\s+xl:text-8xl/g, 'text-8xl');
  str = str.replace(/text-7xl\s+md:text-9xl/g, 'text-9xl');
  str = str.replace(/text-3xl\s+md:text-4xl/g, 'text-4xl');
  str = str.replace(/text-2xl\s+md:text-3xl/g, 'text-3xl');
  str = str.replace(/text-xl\s+md:text-2xl/g, 'text-2xl');
  str = str.replace(/text-lg\s+md:text-xl/g, 'text-xl');
  str = str.replace(/text-base\s+md:text-lg/g, 'text-lg');
  str = str.replace(/text-base\s+sm:text-lg\s+md:text-xl/g, 'text-xl');
  str = str.replace(/text-sm\s+md:text-base/g, 'text-base');
  str = str.replace(/text-base\s+sm:text-lg/g, 'text-lg');
  str = str.replace(/text-sm\s+md:text-lg/g, 'text-lg');

  // py/p paddings
  str = str.replace(/py-16\s+md:py-24/g, 'py-24');
  str = str.replace(/py-8\s+md:py-12/g, 'py-12');
  str = str.replace(/py-20\s+md:py-32/g, 'py-32');
  str = str.replace(/py-16\s+md:py-20/g, 'py-20');
  str = str.replace(/p-5\s+md:p-6/g, 'p-6');
  str = str.replace(/px-5\s+md:px-6/g, 'px-6');
  str = str.replace(/pb-5\s+md:pb-6/g, 'pb-6');
  str = str.replace(/p-4\s+md:p-6/g, 'p-6');
  str = str.replace(/p-6\s+md:p-8/g, 'p-8');

  // grids
  str = str.replace(/grid-cols-1\s+lg:grid-cols-2/g, 'grid-cols-2');
  str = str.replace(/grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-4/g, 'grid-cols-4');
  str = str.replace(/grid-cols-1\s+md:grid-cols-3/g, 'grid-cols-3');
  str = str.replace(/grid-cols-2\s+md:grid-cols-4/g, 'grid-cols-4');
  str = str.replace(/grid-cols-1\s+md:grid-cols-2/g, 'grid-cols-2');
  str = str.replace(/grid-cols-1\s+sm:grid-cols-2/g, 'grid-cols-2');
  str = str.replace(/grid-cols-1\s+gap-6\s+md:gap-8/g, 'grid-cols-1 gap-8');

  str = str.replace(/gap-6\s+md:gap-8/g, 'gap-8');
  str = str.replace(/gap-4\s+md:gap-6/g, 'gap-6');
  str = str.replace(/gap-12\s+lg:gap-20/g, 'gap-20');
  str = str.replace(/gap-12\s+lg:gap-16/g, 'gap-16');
  str = str.replace(/gap-10\s+lg:gap-8/g, 'gap-8');
  str = str.replace(/gap-6\s+md:gap-10/g, 'gap-10');

  // flex directions
  str = str.replace(/flex-col\s+sm:flex-row/g, 'flex-row');
  str = str.replace(/flex-col\s+md:flex-row/g, 'flex-row');

  // hidden/show patterns
  str = str.replace(/hidden\s+lg:flex/g, 'flex');
  str = str.replace(/hidden\s+lg:block/g, 'block');

  // remove mobile-only hidden classes
  str = str.replace(/\s+lg:hidden/g, '');
  str = str.replace(/\s+md:hidden/g, '');
  str = str.replace(/\s+sm:hidden/g, '');

  // md: prefixed utilities (convert to base)
  str = str.replace(/md:w-1\/2/g, 'w-1/2');
  str = str.replace(/md:ml-0/g, 'ml-0');
  str = str.replace(/md:pr-10/g, 'pr-10');
  str = str.replace(/md:pl-10/g, 'pl-10');
  str = str.replace(/md:text-left/g, 'text-left');
  str = str.replace(/md:text-right/g, 'text-right');
  str = str.replace(/md:flex/g, 'flex');
  str = str.replace(/md:items-center/g, 'items-center');
  str = str.replace(/md:left-1\/2/g, 'left-1/2');
  str = str.replace(/md:-translate-x-px/g, '-translate-x-px');
  str = str.replace(/md:-translate-x-1\/2/g, '-translate-x-1/2');
  str = str.replace(/md:flex-row-reverse/g, 'flex-row-reverse');
  str = str.replace(/md:flex-row/g, 'flex-row');
  str = str.replace(/md:mb-0/g, 'mb-0');
  str = str.replace(/md:min-h-\[260px\]/g, 'min-h-[260px]');
  str = str.replace(/md:mb-3/g, 'mb-3');
  str = str.replace(/md:p-3/g, 'p-3');
  str = str.replace(/md:p-4/g, 'p-4');
  str = str.replace(/md:p-8/g, 'p-8');
  str = str.replace(/md:py-24/g, 'py-24');
  str = str.replace(/md:py-20/g, 'py-20');
  str = str.replace(/md:py-12/g, 'py-12');
  str = str.replace(/md:px-6/g, 'px-6');
  str = str.replace(/md:px-8/g, 'px-8');
  str = str.replace(/md:pb-6/g, 'pb-6');
  str = str.replace(/md:text-9xl/g, 'text-9xl');
  str = str.replace(/md:text-6xl/g, 'text-6xl');
  str = str.replace(/md:text-5xl/g, 'text-5xl');
  str = str.replace(/md:text-4xl/g, 'text-4xl');
  str = str.replace(/md:text-3xl/g, 'text-3xl');
  str = str.replace(/md:text-2xl/g, 'text-2xl');
  str = str.replace(/md:text-xl/g, 'text-xl');
  str = str.replace(/md:text-lg/g, 'text-lg');
  str = str.replace(/md:text-base/g, 'text-base');
  str = str.replace(/md:gap-5/g, 'gap-5');
  str = str.replace(/md:gap-8/g, 'gap-8');
  str = str.replace(/md:w-\[360px\]/g, 'w-[360px]');
  str = str.replace(/md:overflow-visible/g, 'overflow-visible');
  str = str.replace(/md:snap-none/g, 'snap-none');

  // sm: prefixed utilities
  str = str.replace(/sm:flex-row/g, 'flex-row');
  str = str.replace(/sm:grid-cols-2/g, 'grid-cols-2');
  str = str.replace(/sm:text-lg/g, 'text-lg');
  str = str.replace(/sm:px-6/g, 'px-6');
  str = str.replace(/sm:text-5xl/g, 'text-5xl');

  // lg: prefixed utilities
  str = str.replace(/lg:grid-cols-2/g, 'grid-cols-2');
  str = str.replace(/lg:grid-cols-4/g, 'grid-cols-4');
  str = str.replace(/lg:grid-cols-5/g, 'grid-cols-5');
  str = str.replace(/lg:text-6xl/g, 'text-6xl');
  str = str.replace(/lg:text-7xl/g, 'text-7xl');
  str = str.replace(/lg:text-5xl/g, 'text-5xl');
  str = str.replace(/lg:col-span-2/g, 'col-span-2');
  str = str.replace(/lg:col-span-3/g, 'col-span-3');
  str = str.replace(/lg:px-8/g, 'px-8');
  str = str.replace(/lg:gap-20/g, 'gap-20');
  str = str.replace(/lg:gap-16/g, 'gap-16');
  str = str.replace(/lg:text-left/g, 'text-left');
  str = str.replace(/lg:flex-col/g, 'flex-col');
  str = str.replace(/lg:flex/g, 'flex');
  str = str.replace(/lg:items-start/g, 'items-start');

  // xl:
  str = str.replace(/xl:text-8xl/g, 'text-8xl');

  // Cleanup double spaces
  str = str.replace(/\s{2,}/g, ' ');

  return str;
}

const files = [
  'wave-init/client/src/pages/LMSPortal.jsx',
  'wave-init/client/src/components/sections/LMSShowcase.jsx',
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = stripResponsive(content);
  fs.writeFileSync(file, content);
  console.log(`Stripped responsive classes from ${file}`);
}
