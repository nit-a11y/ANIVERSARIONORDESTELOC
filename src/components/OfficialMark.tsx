import { useId } from 'react';
import artwork from '../assets/images/nordeste-loc-fest-convite-final.png';

// Preserve os desenhos oficiais. O SVG isola apenas a marca clara da arte,
// sem usar a imagem do convite como interface ou reproduzir os textos dos cartões.
export function OfficialMark({ company = false }: { company?: boolean }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className={company ? 'company-mark' : 'anniversary-mark'}
      viewBox={company ? '390 1383 165 88' : '66 218 824 151'}
      role="img"
      aria-label={company ? 'Nordeste Locações' : 'Nordeste Loc Fest. 15 anos. É tempo de celebrar!'}
    >
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" x={company ? 390 : 66} y={company ? 1383 : 218} width={company ? 165 : 824} height={company ? 88 : 151}>
          <feColorMatrix type="matrix" values={`0 0 0 0 .956  0 0 0 0 .953  0 0 0 0 .894  .3333 .3333 .3333 0 ${company ? -.72 : -.46}`} />
          <feComponentTransfer><feFuncA type="linear" slope={company ? 4.5 : 2.1} /></feComponentTransfer>
        </filter>
      </defs>
      <image href={artwork} width="941" height="1672" filter={`url(#${id})`} />
    </svg>
  );
}
