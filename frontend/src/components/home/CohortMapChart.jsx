import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const FIPS = {
  TX:'48',GA:'13',FL:'12',OH:'39',NC:'37',TN:'47',AL:'01',MS:'28',LA:'22',AR:'05',MO:'29',IL:'17',IN:'18',KY:'21'
};

export default function CohortMapChart({ memberStates = [] }) {
  const activeSet = new Set(memberStates.map(s => FIPS[s]).filter(Boolean));
  return (
    <ComposableMap projection="geoAlbersUsa" style={{ width: '100%', height: 360 }}>
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map(geo => {
            const id = geo.id;
            const isActive = activeSet.has(id);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isActive ? '#8B7355' : '#E8E4DC'}
                stroke="#1C2B3A"
                strokeWidth={0.5}
                style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
