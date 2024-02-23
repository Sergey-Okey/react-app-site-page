import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => {
	const [date, setDate] = useState(new Date());
	const [userAgent, setUserAgent] = useState('');
	const [viewPort, setViewPort] = useState({ width: 0, height: 0, devicePixelRatio: 0 });
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		setUserAgent(navigator.userAgent);
		const handleResize = () => {
			setViewPort({ width: window.innerWidth, height: window.innerHeight, devicePixelRatio: window.devicePixelRatio });
		};
		const handleMouseMove = (e) => {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	const Home = () => (
		<div>
			<h1>Привет, пользователь!</h1>
			<p>Сегодня: {date.toLocaleDateString()}</p>
			<p>Текущее время: {date.toLocaleTimeString()}</p>
			<p>User Agent: {userAgent}</p>
			<p>View Port: {viewPort.width}x{viewPort.height} (Device Pixel Ratio: {viewPort.devicePixelRatio})</p>
			<p>Координаты курсора мыши: ({cursorPosition.x}, {cursorPosition.y})</p>
		</div>
	);

	const RedirectPage = () => {
		useEffect(() => {
			window.location.href = '/';
		}, []);
		return <div>Перенаправление...</div>;
	};

	const ClosePage = () => {
		useEffect(() => {
			window.close();
		}, []);
		return <div>Закрытие страницы...</div>;
	};

	const OpenPage = () => {
		const [url, setUrl] = useState('');
		const [isOpened, setIsOpened] = useState(false);

		const handleOpenPage = () => {
			window.open(url, '_blank');
			setIsOpened(true);
		};

		return (
			<div>
				<input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
				<button onClick={handleOpenPage}>Открыть новую страницу</button>
				{isOpened && <p>Страница открыта!</p>}
			</div>
		);
	};

	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to="/">Главная</Link>
					</li>
					<li>
						<Link to="/redirect">Redirect</Link>
					</li>
					<li>
						<Link to="/close">Закрыть</Link>
					</li>
					<li>
						<Link to="/open">Открыть</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/redirect" component={RedirectPage} />
				<Route path="/close" component={ClosePage} />
				<Route path="/open" component={OpenPage} />
			</Switch>
		</Router>
	);
};

export default App;