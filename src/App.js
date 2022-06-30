import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import DetailMovie from './components/DetailMovie';
import DetailPop from './components/DetailPop';
import DetailSeries from './components/DetailSeries';
import DetailTrend from './components/DetailTrend';
import Home from './components/Home';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Series from './components/Series';
import Trending from './components/Trending';

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detailpop/:id" component={DetailPop} />
        <Route exact path="/trending" component={Trending} />
        <Route exact path="/detailtrend/:id" component={DetailTrend} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/detailMovie/:id" component={DetailMovie} />
        <Route exact path="/series" component={Series} />
        <Route exact path="/detailseries/:id" component={DetailSeries}/>
        <Route exact path="/search" component={Search} />
      </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
