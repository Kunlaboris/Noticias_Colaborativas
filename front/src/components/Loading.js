import spinner from './bars.svg';

export default function Loading() {
  return (
    <div className="loading-wrapper">
      <img src={spinner} alt="Cargando…" />
    </div>
  );
}
