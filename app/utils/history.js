import { createBrowserHistory } from 'history';
import config from '../config.json';

const { basePath } = config;

const history = createBrowserHistory({
  basename: basePath
});

history.listen((_) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

export default history;
