import '../styles/Layout.css';

interface LayoutProps {
	header: React.ReactNode;
	main: React.ReactNode;
	footer: React.ReactNode;
}
const Layout = ({ header, main, footer }: LayoutProps) => {
	return (
		<main className="layout-main">
			<header className="layout-header">{header}</header>
			<section className="layout-section">
				{main}
			</section>
			{footer}
		</main>
	);
};

export default Layout;