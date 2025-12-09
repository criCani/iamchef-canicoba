import '../styles/Layout.css';

interface LayoutProps {
	header: React.ReactNode;
	main: React.ReactNode;
	footer: React.ReactNode;
}

const Layout = ({ header, main, footer }: LayoutProps) => {
	return (
		<div className="layout">
			{header}
			<main className="layout__main">
				{main}
			</main>
			{footer}
		</div>
	);
};

export default Layout;