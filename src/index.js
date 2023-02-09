import ReactDOM from 'react-dom/client';

import {Switch, Route, Link} from "wouter";

import HomePage from "./home/HomePage" 
import GamePage from "./game/GamePage"


//WOUTER WITH HASHED BASED ROUTING
//https://codesandbox.io/s/wouter-hash-based-hook-5fp9g


//GITHUB PAGES NO HASH EXAMPLE!!!
//https://spa-github-pages.rafgraph.dev/example/two-deep?field1=foo&field2=bar#boom!
//https://github.com/rafgraph/spa-github-pages

//https://github.com/molefrog/wouter/


function Header() {
	return (
		<header className="center-space-between">
			<div className="icon">
			</div>
			<div className="logo">
				<img className="preserve-aspect-ratio" src="/img/logo.png"></img>
			</div>
			<div className="icon">
				<a target="_blank" href="https://github.com/jimmyprior/Friendrdle">
					<img className="preserve-aspect-ratio" src="/img/github.png"></img>
				</a>
			</div>
		</header>
	)
}


function Footer() {
	return (
		<div className="center-row even-spacing">
			<div>
				<h3>Links</h3>
				<Link href="/">Home</Link>
			</div>
			<div>
				<h3>Creators</h3>
				<p>
					Idea: <a target="_blank" href="https://www.instagram.com/c_fain2004">Colin Fain</a> <br></br>
					Code: <a target="_blank" href="https://github.com/jimmyprior">Jimmy Prior</a> <br></br>
					Logo: <a target="_blank" href="https://www.instagram.com/annaadecesare">Anna Decesare</a>
				</p>
			</div>
			<div>
				<h3>Code</h3>
				<a target="_blank" href="https://github.com/jimmyprior/Friendrdle">Github</a>
			</div>
		</div>
	)
}


//maybe just have it redirect home in the future.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<div className="center-col space-between full-height">
		<Header/>
		<Switch> 
			<Route path="/" component={HomePage}/>
			<Route path="/play" component={GamePage}/>
			<Route>404 not found!</Route>
		</Switch>
		<Footer/>
	</div>
);

