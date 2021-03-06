import './FaceKunla.css';

export const FaceKunla = (params) => {
  const { format, state, vote } = params;
  let className = '';
  if (format === 'round') {
    className = 'face-round ' + state;
    console.log(className);
  } else {
    className = 'face-square ' + state;
  }
  return (
    <>
      <div className={className}>
        <p className={format}>{vote} Votos</p>
      </div>
    </>
  );
};
