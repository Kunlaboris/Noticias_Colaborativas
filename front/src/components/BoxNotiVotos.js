import './BoxNotiVotos.css';
import { MiniBoxVoto } from './MiniBoxVoto';

export const BoxNotiVotos = (props) => {
  const { face, news } = props;

  const indexNews = news.length;

  if (!news) {
    return null;
  } else {
    const threeNews = face === 'happy' ? news.slice(0, 3) : news.slice(indexNews - 3, indexNews);

    return (
      <div id="box-voto">
        <h2>Noticias más votadas {face === 'happy' ? 'positivamente' : 'negativamente'}</h2>

        {threeNews.reverse().map((post) => (
          <MiniBoxVoto face={face} key={post.id} news={post} />
        ))}
      </div>
    );
  }
};
